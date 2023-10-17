import mongoose = require('mongoose');

mongoose.pluralize(null);
const metaInfo = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.model('meta_info', metaInfo);
