/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Client script that shows the carousel when everything is loaded.
*/

$(window).on("load", ()=> {
//$(document).ready(()=>{  
    $('#carouselPlaceHolder').removeClass('hidden')
    $('.carousel').carousel({
      interval: 0
    })
    $('#spinner').remove()
})