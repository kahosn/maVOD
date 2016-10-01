const videoController = require('../logic/controllers/video.controller')
const cfg = require('../config/mavodConfig.json')

const videosURL = cfg.api.videosURL

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
                                    <a class="thumbnail" href="#" tabindex="${index+1}" ${(index+1)==1?'autofocus':''}  ${clickToPlay(id, url, format)}><div><!--Pic -->`
    let innnerTextBegin = `         
                                    </div></a> 
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
        let itemActive = true                                                                     
        let content = ''
        let itemIndex = -1
        let video
        content += carouselBegin
        for(let i=0;i<3;i++){
            content += outerSlideBegin(itemActive)
            itemActive = false
            for(let ii=0;ii<4;ii++){
                itemIndex++
                video = data[itemIndex]
                content += innnerBoxBegin(itemIndex, video.id, video.contents[0].url, video.contents[0].format)
                content += `
                                    
                                        <img class="img-rounded img-responsive" src="${video.images[0].url}" alt="${video.title}">
                                    
                            `
                content += innnerTextBegin
                content += `
                            <h4>${video.title}</h4>
                            <p><a href="#" class="btn btn-mini" ${clickToPlay(video.id, video.contents[0].url, video.contents[0].format)}>» Play</a></p>                            
                    `
                content += innerBoxEnd
            }
            content += outerSlideEnd
        }
        content += carouselEnd
        return content
    })        
    .catch((err)=>{
        console.warn(err)
    })
}

let clickToPlay = (id, url, format)=>`onclick="requestPlay('${id}', '${url}', '${format}')"`