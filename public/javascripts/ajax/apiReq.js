
let requestPlay = (videoId, url, format='mp4')=>{
  let parameters = { videoID: videoId }
  $.post('/history', parameters, (status)=>{
    if(status=='404')
      alert('Viewing history could not be saved!')
    requestHistoryCount()  
  })
  playVideo(url, format)
}

let requestHistory = ()=>{
  $.get('/history', {}, (list)=>{
      let length = list.length
      let num = 1
      let text = ''
      let title = `${length} ${length==1?'movie':'movies'} in session`
      let template = '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      list.forEach((history)=>{
        text += ` [${num++}] [ ${history.videoId} ]  `
      })
      $('#history').attr('html', true)
      $('#history').attr('delay', 500)
      $('#history').attr('data-trigger', 'focus')
      $('#history').attr('template', template)
      $('#history').attr('title', title)
      $('#history').attr('data-content', text)
      $('#history').popover('toggle')
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