const mongoose = require('mongoose')
const User = require('../../models/user.model')

mongoose.connect('mongodb://mavod:1dovam@ds035006.mlab.com:35006/mavoddb', { config: { autoIndex: false } })

let mavodDB = mongoose.connection

mavodDB.on('error', console.error.bind(console, 'connection error:'))
mavodDB.once('open', ()=> {
  // we're connected!
})

module.exports.save( (user)=> {

})