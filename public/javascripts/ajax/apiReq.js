
let requestPlay = (videoId, url)=>{
  let parameters = { videoID: videoId }
  $.post('/history', parameters, (status)=>{
    if(status=='404')
      alert('Viewing history could not be saved!')
    playVideo(url)
  })
}

$(document).ready(()=> {
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