const assert = require('chai').assert
const expect = require('chai').expect
const videoController = require('../logic/controllers/video.controller')
const cfg = require('../config/mavodConfig.json')

const videosURL = cfg.api.videosURL

describe(`#videoController.requestVideos(${videosURL})`, ()=>{
    it('A promise is returned then it resolves with a non-empty video list from api', ()=>{
        let requestPromise = videoController.requestVideos(videosURL)
        return requestPromise
        .then(()=>{
            console.log(`In test videos.totalCount ${videoController.getVideoModel().getCount()}`)
            expect(videoController.getVideoModel().getCount()).to.be.above(0)
        })        
        .catch((err)=>{
            console.log(`ERROR requestVideos: ${err}`)
            throw err
        })
    })
})

describe(`#videoController.videoSet`, ()=>{
    it('A video from the list is valid', ()=>{
        let requestPromise = videoController.requestVideos(videosURL)
        return requestPromise 
        .then(()=>{
            console.log(`videoController.getVideoModel().getVideosEntries()[0].title ${videoController.getVideoModel().getVideosEntries()[0].title}`)
            expect(videoController.getVideoModel().getVideosEntries()[0].title).to.be.a('string')
        })        
        .catch((err)=>{
            console.log(`ERROR requestVideos: ${err}`)
            throw err
        })
    })
})