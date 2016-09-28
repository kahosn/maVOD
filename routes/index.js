const express = require('express')
const router = express.Router()
const videoController = require('../logic/controllers/video.controller')
const cfg = require('../config/mavodConfig.json')

const videosURL = cfg.api.videosURL

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'maVOD' })
})

/* GET home page. */
router.get('/videos', function(req, res, next) {
        let requestPromise = videoController.requestVideos(videosURL)
        return requestPromise
        .then(()=>{            
          res.send (videoController.getVideoModel().getVideosEntries())
        })        
        .catch((err)=>{
            send ('')
        })  
})



module.exports = router
