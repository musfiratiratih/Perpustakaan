'use strict'

const mysql = require('mysql');

//membuat koneksi
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpus"
})

module.exports = db;