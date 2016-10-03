
/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Ajax client for video and history data access through API endpoint.
*/
"use strict"
/**
 * @desc POST history session video then sends command to play the video
 * @param $string $videoId the video id
 * @param $string $url the url of the video stream data
 * @param $string $format the format of the video default:mp4
 * @return None
*/
let requestPlay = (videoId, url, format='mp4')=>{
  let parameters = { videoID: videoId }
  $.post('/history', parameters, (status)=>{
    if(status=='404')
      alert('Viewing history could not be saved!')
    requestHistoryCount()  
  })
  showVideoHistoryPopover(false)
  playVideo(url, format)
}

/**
 * @desc GET video details and sends command to display them
 * @param $string $videoId the video id
 * @return None
*/
let requestVideoDetails = (videoId)=>{
  let parameters = { videoID: videoId }
  $.get(`/video/${videoId}`, (video)=>{
    displayVideoDetails(video)
  })
}

/**
 * @desc GET history session videos then sends command to popover the info
 * @param None
 * @return None
*/
let requestHistory = ()=>{
  $.get('/history', {}, (list)=>{
      let length = list.length
      let num = 1
      let text = ''
      let title = `${length} ${length==1?'movie':'movies'} in session`      
      list.forEach((history)=>{
        text += ` [${num++}] » ${history.videoId}   _ `
      })
      setupVideoHistoryPopover(text, title)
  })
}

/**
 * @desc GET history session videos count then dynamically writes it to page
 * @param None
 * @return None
*/
let requestHistoryCount = ()=>{
  $.get('/history', {}, (list)=>{
      $('#historyCount').text(list.length)
  })
}

//Note this is a experimental method to search
$(document).ready(()=> {
  $(()=> {
    $('[data-toggle="popover"]').popover()
    requestHistoryCount()
    $('container').on('click', ()=>showVideoHistoryPopover(false))
  })  
  $(()=>{
      let searchBox = $('#search')
      let results = $('#results')
      searchBox.on('keyup', (e)=>{
        if(e.keyCode === 13) {
          let parameters = { search: searchBox.val() };
          let txt = 'Results<br>'
          $.get( '/videos', parameters, (data)=>{
            data.forEach((v)=>{
              txt += `${v.title}<br>`
            })
            results.html(txt)
          })
        }
      })
    })
})