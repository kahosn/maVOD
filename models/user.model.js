const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cfg = require('../config/mavodConfig.json')

let userSchema = new Schema(
    { sessionId: String }, 
    { autoIndex: cfg.mongoose.options.autoIndex }, 
    { strict: cfg.mongoose.options.schemaStrict }
)

let user = module.exports = mongoose.model('User', userSchema)

user.ensureIndexes()

user.on('index', (err)=> {
  if(err){
      //fail
  }
  else{
      //success
  }
})