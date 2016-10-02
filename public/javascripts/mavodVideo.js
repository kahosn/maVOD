/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Client script that handles everything related to the video (building the video display)
*/
"use strict"
const playVideo = (url, format)=>{
    setupForVideoPlay(url, format)  
}

const setupForVideoPlay = (url, format)=>{ 
    $('#spa').removeClass('colorized-bg')
    $('#spa').addClass('black-bg')
    $('#container').addClass('hidden')
    $('#videoPlaceHolder').append(buildVideoElement(url, format))
    $('#videoPlaceHolder').removeClass('video-none')
    $('#videoPlaceHolder').addClass('video-expand')  
    $('#mavodVideo').bind("ended", ()=>{
        setupForVideoBrowse()
    })
    $('#mavodVideo').bind("paused", ()=>{
        setupForVideoBrowse()
    })    
}

const setupForVideoBrowse = ()=>{
    $('#videoPlaceHolder').removeClass('video-expand')
    $('#videoPlaceHolder').addClass('video-shrink') 
    setTimeout(()=>{
        $('#videoPlaceHolder').removeClass('video-shrink')
        $('#videoPlaceHolder').addClass('video-none')
        $('#mavodVideo').remove()
        $('#spa').removeClass('black-bg')
        $('#spa').addClass('colorized-bg')
        $('#container').removeClass('hidden')
    }, 2000)  
}

const setupVideoHistoryPopover = (text, title='Viewing History')=>{
    let template = '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    $('#history').attr('html', true)
    $('#history').attr('delay', 500)
    $('#history').attr('data-trigger', 'focus')
    $('#history').attr('template', template)
    $('#history').attr('title', title)
    $('#history').attr('data-content', text)
    $('#history').popover('toggle')
}

const showVideoHistoryPopover = (visible=true)=>{
    $('#history').popover((visible?'show':'hide'))
}

const buildVideoElement = (url, format)=>{
    let video = document.createElement('video')
    video.id = "mavodVideo"
    video.autoplay = true
    video.controls = true
    let source = document.createElement('source')
    source.id = "videoSrc"
    source.src = url
    source.type=`video/${format}`
    video.appendChild(source)
    return video   
}
