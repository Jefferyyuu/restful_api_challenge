const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const HistorySchema = new Schema({
  query: String,
});

const History = mongoose.model('history', HistorySchema);
module.exports = History;
