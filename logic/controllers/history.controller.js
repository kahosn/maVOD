/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that saves and finds History model to/from MongoDB database
*/
"use strict"
const reqPromise = require('request-promise')
const History = require('../../models/history.model')

/**
 * @desc saves History to MongoDB
 * @param string $sessionId - the client browser's session id
 * @param string $videoId - the video id of the one played at the client
 * @return Promise - success or failure
*/
exports.save = ((sessionId, videoId)=> {
    let history = new History({sessionId: sessionId, videoId: videoId})
    return history.save()
})

/**
 * @desc finds History in MongoDB
 * @param string $sessionId - the client browser's session id
 * @return Promise - success or failure
*/
exports.findBySessionId = ((sessionId)=>{
    let promise = History.find({sessionId:sessionId}).exec()
    return promise    
})