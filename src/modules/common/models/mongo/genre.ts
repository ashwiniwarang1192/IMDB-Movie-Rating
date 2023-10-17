import mongoose = require('mongoose');

mongoose.pluralize(null);
const genre = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.model('genre', genre);
