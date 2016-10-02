/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Ajax client retrieves/posts history to site API endpoint 
 * and sends command to play the video.
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

let requestHistoryCount = ()=>{
  $.get('/history', {}, (list)=>{
      $('#historyCount').text(list.length)
  })
}

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