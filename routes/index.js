/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that exposes the API endpoints
*/

const express = require('express')
const router = express.Router()
const videoController = require('../logic/controllers/video.controller')
const historyController = require('../logic/controllers/history.controller')
const builder = require('../logic/mavodBuilder')
const cfg = require('../config/mavodConfig.json')

const videosURL = cfg.api.videosURL

/* GET home page. */
router.get('/', (req, res, next)=> {
  builder.buildCarousel().then((data)=>{
    res.render('index', { title: 'maVOD', carousel: data })
  })       
    .catch((err)=>{
        res.render('index', { title: 'maVOD', carousel: 'Sorry No Videos!' })
    }) 
})

/* GET videos API. */
router.get('/videos', (req, res, next)=> {
    let requestPromise = videoController.requestVideos(videosURL)
    .then((data)=>{            
      res.send (data)
    })        
    .catch((err)=>{
        res.send ('')
    })  
})

/* POST history API. */
router.post('/history', (req, res, next)=>{
  historyController.save(req.sessionID, req.body.videoID)
  res.send('')
})

/* GET history API. */
router.get('/history', (req, res, next)=>{
  historyController.findBySessionId(req.sessionID).then((list)=>{
    res.send(list)
  })
})

module.exports = router