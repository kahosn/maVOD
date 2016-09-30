const reqPromise = require('request-promise')
const History = require('../../models/history.model')

module.exports.save = ((sessionId, videoId)=> {
    History.create({sessionId: sessionId, videoId:videoId}, (history)=>{
        history.save((err)=>{ 
            if(err) 
            throw err
        })
    })
})