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