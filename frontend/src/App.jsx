import React from "react";
import HomePage from './components/HomePage';
import { AiOutlineDown } from "react-icons/ai";
import './App.css';

const App = () => {
  return (
    <div className="dashboard">
      <HomePage />

      <div className="dashboard-content">
        <h1>
          ABSEN <span className="highlight">MITRA</span>
        </h1>
        <p className="sub-header">PAINGAN DAN MRICAN</p>

        <div className="button-container">
          <button className="btn tambah-absen">+ Tambah Absen</button>
          <button className="btn pilih-penugasan">
            Pilih Penugasan <AiOutlineDown />
          </button>
        </div>

        <div className="table-container">
          <table>
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
              {/* Data absen akan ditambahkan di sini */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
