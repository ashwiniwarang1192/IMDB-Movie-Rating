import mongoose = require('mongoose');

const merchantConfig = new mongoose.Schema({
  access_token: {
    type: 'String',
  },
  refresh_token: {
    type: 'String',
  },
}, { strict: false });

export default mongoose.model('merchants', merchantConfig);
