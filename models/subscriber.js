const mongoose = require('mongoose')

constsubscriberSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    defaullt: Date.now
  }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)