/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that builds the carousel of Videos for the EJS View Engine
*/
"use strict"
const videoController = require('../logic/controllers/video.controller')
const cfg = require('../config/mavodConfig.json')

const videosURL = cfg.api.videosURL
const slideVideoCount = cfg.carousel.video.slide.videoCount

/**
 * @desc builds the carousel of Videos for the EJS View Engine
 * @param None
 * @return Promise - success or failure
*/
let buildCarousel = exports.buildCarousel = ()=>{
    let carouselBegin = `
        <!--carousel-mavod -->     
        <div class="carousel slide" id="carousel-mavod">
            <div id="carousel-content" class="carousel-inner">
    `
    let carouselEnd = `
            </div>    
            <!--.control-box --> 
            <nav>
              <ul class="control-box pager">
                <li><a data-slide="prev" href="#carousel-mavod" class=""><i class="glyphicon glyphicon-chevron-left"></i></a></li>
                <li><a data-slide="next" href="#carousel-mavod" class=""><i class="glyphicon glyphicon-chevron-right"></i></li>
              </ul>
            </nav>
            <!--.control-box -->
        </div>
        <!--carousel-mavod -->      
    `   
    let outerSlideBegin = (isActive)=> ` 
                            <!--Outer Loop Slide -->
                            <div class="item${isActive?' active':''}">
                              <ul class="thumbnails">`    
    let innnerBoxBegin  = (index, id, url, format)=> `     
                                <li class="col-sm-3"><!--Inner Loop Box -->
                                  <div class="fff">
                                    <a class="thumbnail" href="#" tabindex="${index+1}" ${(index+1)==1?'autofocus':''}  ${clickToPlay(id, url, format)}><!--Pic -->`
    let innnerTextBegin = `         
                                    </a> 
                                    <div class="caption"><!--Text -->` 
    let innerBoxEnd     = `       
                                    </div>
                                </div>
                              </li>`                             
    let outerSlideEnd   = `
                            </ul>
                          </div>
                          <!--Outer Loop Slide -->
                          `                       
    return videoController.requestVideos(videosURL)
    .then((data)=>{   
        const loop = Math.ceil(data.length/slideVideoCount)                                                             
        let content = carouselBegin
        let video 
        let itemIndex = -1      
        let itemActive = true
        try{
            for(let i=0;i<loop;i++){
                content += outerSlideBegin(itemActive)
                itemActive = false
                for(let ii=0;ii<slideVideoCount;ii++){
                    itemIndex++
                    video = data[itemIndex]
                    content += innnerBoxBegin(itemIndex, video.id, video.contents[0].url, video.contents[0].format)
                    content += `
                                        
                                            <img class="img-rounded img-responsive poster-img" src="${video.images[0].url}" alt="${video.title}">
                                        
                                `
                    content += innnerTextBegin
                    content += `
                                <h4>${video.title}</h4>
                                <button type="button" class="btn btn-success" ${clickToPlay(video.id, video.contents[0].url, video.contents[0].format)}>
                                    <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
                                    Play
                                </button>                                    
                                <button type="button" class="btn btn-info" ${clickForDetails(video.id)}>
                                    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                                    <em>info...</em>
                                </button>                                                                
                        `
                    content += innerBoxEnd
                }
                content += outerSlideEnd
            }
        }
        catch(e){}

        content += carouselEnd
        return content
    })        
    .catch((err)=>{
        console.warn(err)
    })
}

let clickToPlay = (id, url, format)=>`onclick="requestPlay('${id}', '${url}', '${format}')"`
let clickForDetails = (id)=>`onclick="requestVideoDetails('${id}')"`