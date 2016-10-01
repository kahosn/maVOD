const playVideo = (url, format)=>{
    setUpForVideoPlay(url)  
}

const setUpForVideoPlay = (url, format)=>{ 
    $('#container').addClass('hidden')
    $('#videoPlaceHolder').append(buildVideoElement(url, format))
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
    $('#container').removeClass('hidden')
    $('#videoPlaceHolder').removeClass('block')
    $('#videoPlaceHolder').addClass('none') 
    $('#mavodVideo').remove()  
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
