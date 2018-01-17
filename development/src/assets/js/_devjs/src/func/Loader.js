/**
 * fileOverview:
 * Project:
 * File: Loader
 * Date:
 * Author:
 */

export default class Loader {

  constructor() {

    this.list = [];
    this.cnt = 0;

  }

  json(src,cb) {

    $.getJSON(src, (data)=>{

      cb(data);

    });

  }

  img(len, path, name, cb=()=>{}, cb02=()=>{}){

    var i, img, nth, cnt = 1, list = [];

    for(i = 1;i < len;i++){
      img = new Image();
      nth = gb.in.u.add0(i,-5);
      this.list.push(img);
      img.onload = ()=>{
        cb02();
        cnt++;
        if(cnt == len) cb();
      }
      img.src = path+name+nth+".jpg";
    }

  }

  // cb02 load完了時 都度都度用コールバック関数
  imgSerialLoad(len, path, name, cb=()=>{},cb02=()=>{}){

    var i, img, nth, cnt = 0, list = [];

    var load = (i)=>{
        img = new Image();
        nth = gb.in.u.add0(i,-5);
        this.list.push(img);
        img.onload = ()=>{
          cb02();
          comp();
        }
        img.src = path+name+nth+".jpg";
    };

    var comp = ()=>{
        cnt++;
        if(cnt == len){
          cb();
        }else{
          load(cnt);
        }
    };

    load(cnt);
  }

  ajaxImgLoad(cb){

    var imgNum = $('img').length;
    var cnt = 0;

    $('img').each(function(i, elm) {

        var img = new Image();
        img.onload = ()=>{
          cnt++;
          if (cnt==imgNum-1) {
            cb();
          };
        }
        img.src = elm.src;

    });

  }

  video(src, cb=()=>{}) {

    var isLoad = false;
    this.video = document.createElement('video');

    var type = this.supportVideoExt(this.video);
    if (type == "") {
      return;
    }

    this.video.addEventListener("canplay", ()=>{

      if (!this.isLoad) {
        this.isLoad = true;
        this.video.loop = true;
        this.video.play();
        cb();
      }

    },false);

    // ロード
    this.video.src = src;

  }

  youtubeIframeScript(cb) {

    // IFrame Player API の読み込み
    var tag = document.createElement('script');
    tag.onload = ()=>{

      cb();

    };

    // tag.src = "https://www.youtube.com/iframe_api";
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // YouTube動画
    window.onYouTubeIframeReady = function() {
      
      window.console.log('youtubeready');


    }

  }

  supportVideoExt() {

    var ext = "";
    if (this.video.canPlayType("video/webm") == "probably" || this.video.canPlayType("video/webm") == "maybe") {
      ext = "webm";
    } else if(this.video.canPlayType("video/mp4") == "probably" || this.video.canPlayType("video/mp4") == "maybe") {
      ext = "mp4";
    } else if(this.video.canPlayType("video/ogg") == "probably" || this.video.canPlayType("video/ogg") == "maybe") {
      ext = "ogg";
    }

    return ext;

  }

  //WebFontのローダー管理
  webFont(config) {

    // web font loader用jsのappend
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);

    var again = ()=>{

      // yt.playerがloadされていない場合を考慮して
      if((typeof WebFont !== "undefined") && WebFont) {

          WebFont.load(config);

      }else{

          setTimeout(again, 100);

      }

    }

    again();    

  }

  onLoaded() {

    $('html').css('opacity', '1');

  }

  setEvents(len) {

    var self = this;

    $(window).on('loaded', (event)=>{
      
      self.cnt++;
      if (self.cnt == len) onLoaded();

    });
      
  } 


}
