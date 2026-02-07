const Hour = require('../models/hourModel')
const mongoose = require('mongoose')

// get all hours
const getHours = async (req, res) => {
  try {
    const hours = await Hour.find().sort({ createdAt: -1 })
    res.status(200).json(hours)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get a single hour
const getHour = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hour' })
  }

  const hour = await Hour.findById(id)

  if (!hour) {
    return res.status(404).json({ error: 'No such hour' })
  }

  res.status(200).json(hour)
}


// create a new hour
const createHour = async (req, res) => {
  const { user, time } = req.body;

  let emptyFields = [];

  if (!user) emptyFields.push('user');
  if (!time) emptyFields.push('time');

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all fields',
      emptyFields
    });
  }

  try {
    const hour = await Hour.create({ user, time });
    res.status(200).json(hour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a hour
const deleteHour = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hour' })
  }

  const hour = await Hour.findOneAndDelete({_id: id})

  if (!hour) {
    return res.status(400).json({ error: 'No such hour' })
  }

  res.status(200).json(hour)
}

// update a hour
const updateHour = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hour' })
  }

  const hour = await Hour.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!hour) {
    return res.status(400).json({ error: 'No such hour' })
  }

  res.status(200).json(hour)
}

module.exports = {
  getHours,
  getHour,
  createHour,
  deleteHour,
  updateHour
}