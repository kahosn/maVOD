//$(window).on("load", ()=> {
$(document).ready(()=>{  
    $('#carouselPlaceHolder').removeClass('hidden')
    $('.carousel').carousel({
      interval: 0
    })
    $('#spinner').remove()
})