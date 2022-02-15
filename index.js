'use strict'

//inisialisasi aplikasi menggunakan express js
const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const { response } = require("express")

//implementasi
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//mencoba menghubungkan ke database
const db = require('./db');
db.connect(error =>{
    if(error){
        console.log(error.message)
    } else {
        console.log("Mysql Connected")
    }
})

//endpoint endpoint
app.get("/", (req,res) => {
    res.send({
        message: "Berhasil melakukan pemanggilan get",
        data: {
            description:
            "Endpoint ini untuk menampilkan data",
        }
    })
})
app.use("/buku", require('./routes/buku.routes'));

const port = 8000;
app.listen(port, () => console.log (`App running ${port}`))