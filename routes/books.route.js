'use strict'

const express = require('express');
const booksController = require('../controllers/books.controller');
const router = new express.Router();

router.get("/", booksController.index)
router.get("/:id", booksController.detail)
router.post("/", booksController.create)
router.put("/:id", booksController.edit)
router.delete("/:id", booksController.delete)

module.exports = router