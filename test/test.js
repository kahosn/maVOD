const assert = require('chai').assert
const mongoose = require('mongoose')
const db = require('../logic/controllers/db.controller')
const cfg = require('../config/mavodConfig.json')
const User = require('../models/user.model')

const dbTestURL = cfg.mongoose.dbTestURL

describe(`#db.connect(${dbTestURL})`, ()=>{
    it('A promise is returned then it resolves', (done)=>{
        let connectPromise = db.connect(dbTestURL)
        .then(()=>{
            if(connectPromise instanceof Promise)
                done()
        }).catch((err)=>{
            console.log(`ERROR DB: ${err}`)
            done(err)
        })
    })
})

describe('#User.create', ()=>{
    it('Create a test User id123', ()=>{
        User.create({ sessionId:'123' }, (err, user)=> {
            if (err) 
                done(err)
            done()
        })
    })
})

describe('#user.save', ()=>{
    it('Save a test user id456 to test DB', ()=>{
        let user = new User({sessionId:'456'})
        user.save((err)=> {
            if (err) 
                done(err)
            done()
        })
    })
})