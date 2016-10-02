/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Mocha Tests for the MongoDB database operations (connect, create, find)
*/

const expect = require('chai').expect
const mongoose = require('mongoose')
const db = require('../logic/controllers/db.controller')
const historyController = require('../logic/controllers/history.controller')
const User = require('../models/user.model')
const History = require('../models/history.model')
const cfg = require('../config/mavodConfig.json')

const dbTestURL = cfg.mongoose.dbTestURL
const dbProductionURL = cfg.mongoose.dbURL
const historyURL = cfg.api.historyURL
const sessionId = "fMP6OqnlP_uRcC0qnaTEdYSkoZ1T9efV"   
const videoId1 = "2001-a-space-odyssey" 
const videoId2 = "2-guns"  

describe('hooks', ()=> {
    console.log(`hook`)

    before((done)=> {//Close open Production Connection (if any)
        console.log(`before hook: mongoose.connection.readyState ${mongoose.connection.readyState}`)
        if(mongoose.connection.readyState)     
            mongoose.connection.close((err)=>{
                if(err)
                    throw err
                done()
            })
        done()
    })

    describe(`#db.connect(${dbTestURL})`, ()=>{
        it('A promise is returned then it resolves with a connection', ()=>{
            let connectPromise = db.connectPromise(dbTestURL)
            return connectPromise
            .then(()=>{
                console.log(`In TEST db.connect typeof(db.getConnection()): ${typeof(db.getConnection())}`)
                if(db.getConnection() == null)    
                    throw new Error('ERROR in TEST: Connection is null!')           
            }).catch((err)=>{
                console.log(`ERROR TEST DB db.connect: ${err}`)
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
                done()
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

    describe(`#historyController.findBySessionId(${sessionId})`, ()=>{    
        afterEach((done) => { //After each we remove the test histories from the test database
            History.remove({sessionId:sessionId}, (errHistory) => {
                done()     
            })   
        })
        it('A promise is returned then it resolves with a non-empty history list from api', ()=>{
            let history1 = new History({sessionId:sessionId, videoId:videoId1})
            let history2 = new History({sessionId:sessionId, videoId:videoId2})
            return Promise.all([history1.save(), history2.save()])
            .then((data1, data2)=>{
                console.log(`Promise.all Then`)
                return historyController.findBySessionId(sessionId) 
            })  
            .then((list)=>{
                console.log(`history list: ${list}`)
                expect(list.length).to.be.above(0)
            })       
            .catch((err)=>{
                console.log(`ERROR in TestAccessDB historyController: ${err}`)
                throw err
            })
        })
    })

    after((done)=> {//Close Test Connection re-open Production Connection
        console.log(`after hook`)  
        mongoose.connection.close((errMongoose)=>{
            if(errMongoose)
                throw errMongoose
            db.connectCallBack(dbProductionURL, (errConnect)=>{
                if(errConnect)
                    throw errConnect
                done()
            })
        })        
        .catch((err)=>{
            console.log(`ERROR in TestAccessDB after hook: ${err}`)
            throw err
        })
    })
})