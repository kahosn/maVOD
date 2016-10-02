/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that requests Videos from some API endpoint
*/
"use strict"
const reqPromise = require('request-promise')
const video = require('../../models/video.model')

/**
 * @desc requests Videos from REST API endpoint
 * @param string $restURL - the url for the API endpoint
 * @return Promise - success or failure
*/
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

/**
 * @desc gets a Video from list
 * @param string $id - the video id to get
 * @return  Promise - success or failure
*/
const retrieveVideo = exports.retrieveVideo = (id)=>{
    return new Promise((resolve, reject)=>{
        let vid
        video.getVideosEntries().forEach((v)=>{
            if(v.id==id)
                vid = v       
        })
        if(vid)
            resolve(vid)
        else
            reject('Video ${id} Not Found!')    
    })
}

exports.getVideoModel = ()=> video