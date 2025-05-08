import React, { useEffect, useState } from "react";
import HomePage from './components/HomePage';
import { AiOutlineDown } from "react-icons/ai";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedNim,setSelectedNim] = useState(null);

  useEffect(() => {
    if (selectedNim) {
      fetch(`http://localhost:8081/Shift?nim=${selectedNim}`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }
  }, [selectedNim]);
  

  

  return (
    <div className="dashboard">
      <HomePage onUserSelect={(nim)=>setSelectedNim(nim)}/>

      <div className="dashboard-content">
        <h1 className="title">
          ABSEN <span className="highlight">MITRA</span>
        </h1>
        <p className="sub-header">PAINGAN DAN MRICAN</p>

        <div className="button-container">
          <button className="btn tambah-absen">:') Tambah Absen</button>
          <button className="btn keluar">:'( Keluar </button>
          <button className="btn pilih-penugasan">
            Pilih Penugasan <AiOutlineDown />
          </button>
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

export default App;
