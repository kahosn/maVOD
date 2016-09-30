const playVideo = (url)=>{
    setUpForVideoPlay(url)  
}

const setUpForVideoPlay = (url)=>{ 
    $('#carouselPlaceHolder').addClass('hidden')
    $('#videoPlaceHolder').append(buildVideoElement(url))
    $('#videoPlaceHolder').removeClass('none')
    $('#videoPlaceHolder').addClass('block')  
    $('#mavodVideo').bind("ended", ()=>{
        setUpForVideoBrowse()
    })
    $('#mavodVideo').bind("paused", ()=>{
        setUpForVideoBrowse()
    })    
}

const setUpForVideoBrowse = ()=>{
    $('#carouselPlaceHolder').removeClass('hidden')
    $('#videoPlaceHolder').removeClass('block')
    $('#videoPlaceHolder').addClass('none') 
    $('#mavodVideo').remove()  
}

const buildVideoElement = (url)=>{
    let video = document.createElement('video')
    video.id = "mavodVideo"
    video.autoplay = true
    video.controls = true
    let source = document.createElement('source')
    source.id = "videoSrc"
    source.src = url
    source.type="video/mp4"
    video.appendChild(source)
    return video   
}
