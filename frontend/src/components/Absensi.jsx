import React, { useEffect, useState } from "react";
import HomePage from './HomePage';
import { AiOutlineDown } from "react-icons/ai";
import '../style/Absensi.css';


function Absensi() {
    const [data, setData] = useState([]);
    const [tugas,setTugas] = useState([]);
    const [selectedNim,setSelectedNim] = useState(null);
    const [showDropdown,setShowDropdown]= useState(false);
    const [selectTugas, setSelectedTugas]= useState(null);
    const [sedangBertugas, setSedangBertugas] = useState(false);
  
    useEffect(() => {
      if (selectedNim) {
        fetch(`http://localhost:8081/Shift?nim=${selectedNim}`)
          .then(res => res.json())
          .then(data => setData(data))
          .catch(err => console.log(err));
      }
    }, [selectedNim]);
  
  
    useEffect(() => {
      if (data.length > 0) {
        const lastEntry = data[data.length - 1];
        if (!lastEntry.jam_keluar) {
          setSedangBertugas(true); // Masih bertugas
        } else {
          setSedangBertugas(false); // Sudah keluar
        }
      } else {
        setSedangBertugas(false); // Belum ada data
      }
    }, [data]);
    
    useEffect(()=>{
      fetch('http://localhost:8081/tugas')
      .then (res=>res.json())
      .then (tugas => setTugas(tugas))
      .catch(err => console.log(err))
    },[]);
  
    
    const keluar = async () => {
      // Cari entri terakhir yang belum punya jam_keluar
      const lastEntry = data.findLast(entry => entry.jam_keluar === null);
    
      if (!lastEntry) {
        alert("Tidak ada sesi masuk aktif untuk ditutup.");
        return;
      }
    
      const { id_masuk } = lastEntry;
    
      try {
        const responden = await fetch("http://localhost:8081/out", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id_masuk }) // Kirim sebagai object JSON
        });
    
        const result = await responden.json();
    
        if (responden.ok) {
          // Refresh data setelah update
          const res = await fetch(`http://localhost:8081/Shift?nim=${selectedNim}`);
          const updatedData = await res.json();
          setData(updatedData); // Update state data
          alert("Berhasil mencatat jam keluar");
        } else {
          alert("Gagal mencatat jam keluar: " + (result.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat mencatat jam keluar.");
      }
    };
  
  const absen = async () =>{
    if (!selectedNim || !selectTugas){
      alert("Pastikan NIM dan Penugasan Telah di ISI")
      return
    }
    if (sedangBertugas) {
      alert("Anda masih bertugas. Silakan tekan 'Keluar' terlebih dahulu.");
      return;
    }
    const simpan={
      nim : selectedNim,
      penugasan: selectTugas.nama_tugas
    };
    try{
      const responden = await fetch("http://localhost:8081/absen",{
        method : "POST",
        headers : {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(simpan)
      });
      const result = await responden.json();
        if(responden.ok){
          fetch(`http://localhost:8081/Shift?nim=${selectedNim}`)
          .then(res=>res.json())
          .then(updateData =>setData(updateData));
  
        }else {
          alert("Gagal melakukan absen: " + (result.error || "Unknown error"));
        }
      }
      catch(err){
      console.error(err);
      alert("error bos q")
    }
  };
  
    const toggleDropdown =()=>{
      setShowDropdown(!showDropdown);
    };
    const selecttgs=(user)=>{
      setSelectedTugas(user);
      setShowDropdown(false);
    };
  
    
  
    return (
      <div className="dashboard">
        <HomePage onUserSelect={(nim)=>setSelectedNim(nim)}/>
  
        <div className="dashboard-content">
          <h1 className="title">
            ABSEN <span className="highlight">MITRA</span>
          </h1>
          <p className="sub-header">PAINGAN DAN MRICAN</p>
  
          <div className="button-container">
            <div className="Tambah-absen">
            <button className="btn tambah-absen" onClick={absen}> :') Tambah Absen </button>
            
            </div>
            
            <button className="btn keluar" onClick={keluar}>:'( Keluar </button>
            <div className="dropdown-container" onClick={toggleDropdown}>
            <button className="btn pilih-penugasan">
              {selectTugas ? selectTugas.nama_tugas :"Pilih Penugasan"} <AiOutlineDown />
              {
                showDropdown &&(
                  <ul className="dropdown-menu">
    
                    {tugas.map((user,index)=>(
                      <li
                      key={index}
                      className="dropdown-item"
                      onClick={()=>selecttgs(user)}
                      >
                        {user.nama_tugas}
                      </li>
                    )
                    )}
                  </ul>
                )
              }
            </button>
            </div>
            
          </div>
  
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Jam Masuk</th>
                  <th>Jam Keluar</th>
                  <th>Bertugas</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{d.tanggal}</td>
                    <td>{d.jam_masuk}</td>
                    <td>{d.jam_keluar}</td>
                    <td>{d.penugasan}</td>
                    <td>{d.keterangan ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default Absensi;
  
