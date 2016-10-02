/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that builds Mongoose User Model for MongoDB
*/
"use strict"
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cfg = require('../config/mavodConfig.json')

let userSchema = new Schema(
    { sessionId: String }, 
    { autoIndex: cfg.mongoose.options.autoIndex }, 
    { strict: cfg.mongoose.options.schemaStrict }
)

let User = module.exports = mongoose.model('User', userSchema)

User.ensureIndexes()

User.on('index', (err)=> {
  if(err){
      //fail
  }
  else{
      //success
  }
})