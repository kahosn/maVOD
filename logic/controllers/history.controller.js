const reqPromise = require('request-promise')
const History = require('../../models/history.model')

exports.save = ((sessionId, videoId)=> {
    let history = new History({sessionId: sessionId, videoId: videoId})
    return history.save()
})

exports.findBySessionId = ((sessionId)=>{
    console.log(`in Controller sessionId: ${sessionId}`)
    let promise = History.find({sessionId:sessionId}).exec()
    return promise    
})