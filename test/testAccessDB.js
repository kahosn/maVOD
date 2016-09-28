const expect = require('chai').expect
const mongoose = require('mongoose')
const db = require('../logic/controllers/db.controller')
const User = require('../models/user.model')
const cfg = require('../config/mavodConfig.json')

const dbTestURL = cfg.mongoose.dbTestURL
const dbProductionURL = cfg.mongoose.dbURL
    
describe(`#db.connect(${dbTestURL})`, ()=>{    
    beforeEach((done) => { //Close open Production Connection (if any)
        console.log(`mongoose.connection.readyState ${mongoose.connection.readyState}`)
        if(mongoose.connection.readyState)     
            mongoose.connection.close((err)=>{
                if(err)
                    throw err
                done()
            })            
    })
    it('A promise is returned then it resolves with a connection', ()=>{
        let connectPromise = db.connectPromise(dbTestURL)
        return connectPromise
        .then(()=>{
            console.log(`In TEST db.connect typeof(db.getConnection()): ${typeof(db.getConnection())}`)
            if(db.getConnection() == null)    
                throw new Error('ERROR in TEST: Connection is null!')           
        }).catch((err)=>{
            console.log(`ERROR TEST DB: ${err}`)
            throw err
        })
    })
})

describe('#User.create', ()=>{
    it('Create a test User id123', ()=>{
        User.create({ sessionId:'123' }, (err, user)=> {
            if (err) 
                throw(err)
            expect(user.sessionId).to.be.equal('123')
        })
    })
})

describe('#user.save', ()=>{
    afterEach((done) => { //After each we remove the user from the test database and we reconnect to production
        User.remove({sessionId:'456'}, (errUser) => { 
            mongoose.connection.close((err)=>{
                if(err)
                    throw err
                db.connectCallBack(dbProductionURL, (errConnect)=>{
                    if(errConnect)
                        throw errConnect
                    done()
                })
            })      
        })     
    })
    it('Save a test user id456 to test DB', ()=>{
        let user = new User({sessionId:'456'})
        user.save((err)=> {
            if (err) 
                throw(err)
            expect(user.sessionId).to.be.equal('456')
        })
    })
})