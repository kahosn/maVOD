const reqPromise = require('request-promise')
const video = require('../../models/video.model')

const requestVideos = exports.requestVideos = (restURL)=>{
    return reqPromise({uri:restURL, json:true})
    .then((videos)=>{
        console.log(`videos.totalCount ${videos.totalCount}`)
        video.setCount(videos.totalCount) 
        video.setVideosEntries(videos.entries)
    })
    .catch((err)=>{
        console.log(`ERROR requestVideos: ${err}`)
        throw err
    })
}

exports.getVideoModel = ()=> video