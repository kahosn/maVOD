const assert = require('chai').assert
const mongoose = require('mongoose')
const dbURL = 'mongodb://mavod:1dovam@ds035006.mlab.com:35006/mavoddb'

describe('#mongooseDBConnect()', function(){
    let mongooseDBConnect = (url)=>{
        mongoose.connect(url, (err)=>{
            if(err)
                throw err
            done()    
        })
    }
    it('Mongoose Connectes to MongoDB', function(){
        mongooseDBConnect(dbURL)
    })
})