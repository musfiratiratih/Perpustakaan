'use strict'

const express = require('express')
const autentikasiControllers = require('../controllers/autentikasi.controllers')

const router = new express.Router

router.post('/registrasi', autentikasiControllers.registrasi)
router.post('/login', autentikasiControllers.login)

module.exports = router