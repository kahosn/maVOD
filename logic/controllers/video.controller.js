const reqPromise = require('request-promise')
const video = require('../../models/video.model')

const requestVideos = exports.requestVideos = (restURL)=>{
    return reqPromise({uri:restURL, json:true})
    .then((videos)=>{
        console.log(`videos.totalCount ${videos.totalCount}`)
        video.setCount(videos.totalCount) 
        video.setVideosEntries(videos.entries)
        return videos.entries
    })
    .catch((err)=>{
        console.log(`ERROR requestVideos: ${err}`)
        throw err
    })
}

const retrieveVideo = exports.retrieveVideo = (id)=>{
    let vid
    video.getVideosEntries().forEach((v)=>{
        if(v.id==id)
            vid = v       
    })
    return vid
}

exports.getVideoModel = ()=> video