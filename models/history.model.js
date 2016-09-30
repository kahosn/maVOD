const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cfg = require('../config/mavodConfig.json')

let historySchema = new Schema(
    { 
        sessionId: String,
        videoId: String 
    }, 
    { autoIndex: cfg.mongoose.options.autoIndex }, 
    { strict: cfg.mongoose.options.schemaStrict }
)

let History = module.exports = mongoose.model('History', historySchema)

History.ensureIndexes()

History.on('index', (err)=> {
  if(err){
      //fail
  }
  else{
      //success
  }
})