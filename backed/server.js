const express = require('express');
const mysql = require('mysql');
const cors = require ('cors');

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database: 'perpustakaan'
})

app.get('/Shift', (req, res) => {
    const nim = req.query.nim;
    const sql = "SELECT * FROM shif WHERE nim = ?";
    db.query(sql, [nim], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  

app.get('/mitra',(req,res)=>{
    const sql = "select * from mitra"
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.listen (8081,()=>{
    console.log("listening");
})