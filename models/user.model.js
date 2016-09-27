const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    sessionId: String
}, { autoIndex: false }, { strict: false })

let user = exports.User = mongoose.model('User', userSchema)

user.ensureIndexes(callback)

user.on('index', (err)=> {
  if(err){
      //fail
  }
  else{
      //success
  }
})