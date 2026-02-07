const express = require('express')
const { 
  createHour, 
  getHours, 
  getHour, 
  deleteHour, 
  updateHour
} = require('../controllers/hourController')

const router = express.Router()

// GET all invoices
router.get('/', getHours)

// GET single invoice
router.get('/:id', getHour)

// POST a new invoice
router.post('/', createHour)

// DELETE a invoice
router.delete('/:id', deleteHour)

// UPDATE a invoice
router.patch('/:id', updateHour)

module.exports = router
