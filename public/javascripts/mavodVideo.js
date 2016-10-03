
/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Client script that handles everything related to the video (building the video display)
*/
"use strict"
/**
 * @desc prepares to play a video
 * @param string $url the url of the video stream data
 * @param string $format the format of the video
 * @return None
*/
const playVideo = (url, format)=>{
    setupForVideoPlay(url, format)  
}

/**
 * @desc follows the principal of SPA in setting up for video playback,
 * applies effects to show the video, 
 * then binds the events of video finishing to a command to reset page
 * @param string $url the url of the video stream data
 * @param string $format the format of the video
 * @return None
*/
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

/**
 * @desc follows the principal of SPA in setting up for video browse,
 * applies effects to hide the video
 * @param None
 * @return None
*/
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

/**
 * @desc setup the history popover then shows/hides it
 * @param string $text the history text
 * @param string $title the history title default:Viewing History
 * @return None
*/
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

/**
 * @desc shows/hides the history popover
 * @param boolean $visible default:true
 * @return None
*/
const showVideoHistoryPopover = (visible=true)=>{
    $('#history').popover((visible?'show':'hide'))
}

/**
 * @desc builds a video DOM Element
 * @param string $url the url of the video stream data
 * @param string $format the format of the video
 * @return video DOM Element
*/
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

/**
 * @desc builds the modal box, includes onclick script, and shows it
 * @param json $video the json file of the video
 * @return None
*/
const displayVideoDetails = (video)=>{
    let content = ` <div class="row">
                    <div class="col-sm-4 col-md-4 col-lg-4"><img class="img-rounded img-responsive poster-img" src="${video.images[0].url}" alt="${video.title}"></div>
                    <div class="col-sm-8 col-md-8 col-lg-8"><blockquote><p>${video.description}</p></blockquote></div>
                    </div>`
    content += 'Credits:'
    for (let i=0;i<video.credits.length;i++) {
        content += `<h4>${video.credits[i].role}: <strong>${video.credits[i].name}</strong><br></h4>`
    }
    content += `Rating: <mark>${video.parentalRatings[0].rating}</mark><br>`
    content += 'Categories:'
    for (let i=0;i<video.categories.length;i++) {
        content += ` |<em>${video.categories[i].title}</em>`
    }
    $('#video-details-label').html(`<span class="lead">${video.title}</span>`)
    $('#video-details').html(content)
    $('#video-details-play').attr('onclick', `requestPlay('${video.id}','${video.contents[0].url}', '${video.contents[0].format}')`)
    $('#video-details-modal').modal('show')
}