const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
  name: { type: String, required: true },
  hours: { type: String, required: true },
  lastWeek: { type: String, required: true }
});

const hourSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  time: {
    daily: [timeEntrySchema],
    weekly: [timeEntrySchema],
    monthly: [timeEntrySchema]
  }
}, { timestamps: true });

module.exports = mongoose.model('Hour', hourSchema);
