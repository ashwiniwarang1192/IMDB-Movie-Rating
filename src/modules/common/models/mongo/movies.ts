import mongoose = require('mongoose');

mongoose.pluralize(null);
const movies = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.model('movies', movies);
