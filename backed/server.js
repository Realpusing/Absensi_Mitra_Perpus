const express = require('express');
const mysql = require('mysql');
const cors = require ('cors');


const app = express()
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database: 'perpustakaan'
})



app.get('/tugas',(req, res)=>{
    const sql ="Select * from penugasan"
    db.query(sql,(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.get('/sip',(req, res)=>{
    const sql ="Select * from shif"
    db.query(sql,(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/Shift', (req, res) => {
    const nim = req.query.nim;
    const sql = "SELECT * FROM shif WHERE nim = ?";
    db.query(sql, [nim], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  
app.get('/ship',(req,res)=>{
    const sql = "select * from shif"
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get('/mitra',(req,res)=>{
    const sql = "select * from mitra"
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post('/absen', (req, res) => {
    const { nim, penugasan } = req.body;


    const time = new Date();

    const tanggal = time.toISOString().split('T')[0];
    const jam_masuk = time.toTimeString().split(' ')[0];
    const sql = "INSERT INTO shif (nim, tanggal, jam_masuk, penugasan) VALUES (?, ?, ?, ?)";
    const val = [nim, tanggal, jam_masuk, penugasan];

    db.query(sql, val, (err, result) => {
        if (err) {
            console.error("Error saat insert:", err); 
            return res.status(500).json({ error: "Gagal simpan ke database",err });
        }

        res.status(201).json({
            message: "Telah Absen",
            insertId: result.insertId // ID yang dibuat otomatis oleh database
        });
    });
});

app.post('/out', (req, res) => {
    const {id_masuk} = req.body;
    const time = new Date();
    const jam_keluar = time.toTimeString().split(' ')[0];
    const sql = "Update shif set jam_keluar = ? where id_masuk=?";
    const val = [jam_keluar,id_masuk];

    db.query(sql, val,(err, result) => {
        if (err) {
            console.error("Error saat insert:", err); 
            return res.status(500).json({ error: "Gagal simpan ke database",err });
        }

        res.status(201).json({
            message: "Telah Absen",
            insertId: result.insertId // ID yang dibuat otomatis oleh database
        });
    });
});

app.listen (8081,()=>{
    console.log("listening");
})