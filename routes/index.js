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

/* GET test page. */
router.get('/test', (req, res, next)=> {
  res.render('test', { title: 'test' })
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
    console.log(`history list: ${list}`)
    res.send(list)
  })
})

module.exports = router