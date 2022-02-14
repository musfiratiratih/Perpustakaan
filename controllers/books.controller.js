'use strict'

const db = require('../db')

module.exports = {
    index: (req, res) => {
        //create sql query
        let sql = "select * from perpustakaan"
    
        //run query
        db.query(sql,(err, result) => {
            if (err) throw err;
            res.json({
                message: 'Berhasil mendapatkan index data buku',
                data: result
            })
        })
    },

    detail: (req, res) => {
        const sql = "select * from perpustakaan where id = ? limit 1";

        db.query(sql, req.params.id, (err, result) => {
            if (err) throw err;

            res.send({
                message: `Berhasil mendapatkan data buku dengan id ${req.params.id}`,
                data: result[0] || null
            })
        })
    },

    create: (req, res) => {
        //deklarasi variabel inputan user
        const book = {
            title: req.body.title,
            year: req.body.year,
        }
        
        //create sql query
        const sql = "insert into perpustakaan set ?"
    
        //run query to insert the book
        db.query(sql, book, (err, result) => {
            if (err) throw err;
            res.json({
                message: 'Berhasil menambahkan data',
                data: result
            })
        })
    },

    edit: (req, res) => {
        const book = {
            title: req.body.title,
            year: req.body.year
        }

        const sql = 'update perpustakaan set ? where id = ?'
        db.query(sql, [book, req.params.id], (err, result) => {
            if (err) throw err

            res.json({
                message: 'Berhasil merubah data',
                data: result
            })
        })
    },

    delete: (req, res) => {
        const sql = 'delete from perpustakaan where id = ?'
        db.query(sql, req.params.id, (err, result) => {
            if (err) throw err
            res.json({
                message: 'Berhasil menghapus data',
                data: result
            })
        })
    }
}