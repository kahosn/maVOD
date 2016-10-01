const playVideo = (url, format)=>{
    setupForVideoPlay(url, format)  
}

const setupForVideoPlay = (url, format)=>{ 
    $('#container').addClass('hidden')
    $('#videoPlaceHolder').append(buildVideoElement(url, format))
    $('#videoPlaceHolder').removeClass('none')
    $('#videoPlaceHolder').addClass('block')  
    $('#mavodVideo').bind("ended", ()=>{
        setupForVideoBrowse()
    })
    $('#mavodVideo').bind("paused", ()=>{
        setupForVideoBrowse()
    })    
}

const setupForVideoBrowse = ()=>{
    $('#container').removeClass('hidden')
    $('#videoPlaceHolder').removeClass('block')
    $('#videoPlaceHolder').addClass('none') 
    $('#mavodVideo').remove()  
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
