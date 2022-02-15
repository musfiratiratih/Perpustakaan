const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require("../db")

const secret = '#$@^%$^%*&%$$@&'

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    registrasi: (req, res) => {
        const { nama_lengkap, email, password } = req.body
        if (!nama_lengkap, !email || !password) res.status(402).json({ message: 'nama lengkap, email dan password harus diisi.'})
    
        return db.query('insert into pengguna set ?', { nama_lengkap, email, password: hashPassword(password) }, (err, result) => {
            if (err) return res.status(500).json({ err })
    
            return res.json({ message: 'registrasi berhasil', data: result })
        })
    },

    login: (req, res) => {
        const { email, password } = req.body
        if (!email || !password) res.status(402).json({ message: 'email dan password harus diisi.' })

        return db.query('select * from pengguna where email = ?', email, (err, result) => {
            if (err) return res.status(500).json({ err })
            
            const user = result[0]
            if (typeof user === 'undefined') return res.status(401).json({ message: 'user tidak ditemukan' })
            if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'email atau password tidak sesusai' })

            const token = jwt.sign({data: user}, secret)
            return res.json({ message: 'login berhasil. silhakan menggunakan token dibawah ini untuk mengakses endpoint private lain', token })
        })
    }
}