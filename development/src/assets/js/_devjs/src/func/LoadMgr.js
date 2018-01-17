/**
 * fileOverview:
 * Project:
 * File: LoadMgr
 * Date:
 * Author:
 */

import Loader from './Loader.js';
import Sec01Video from '../Display/UI/Sec01Video.js';

export default class LoadMgr {

  constructor() {

  }

  start() {

    // その他
    // ソーシャルスクリプトなど
    // this.snsScript();

    // this.loadYoutubeScript();

    // section02で使う大量の画像をロード // web workerなども使って
    // this.sec02Img();

    // this.webFont();

  }

  loadYoutubeScript() {

    var loader = new Loader();

    var len = 1;
    gb.in.rm.total += len; // load数のtotalを計算
    if (gb.in.u.isSP) gb.in.rm.completed++;

    var cb = ()=>{

      gb.in.rm.completed++;

    }

    loader.youtubeIframeScript(cb);

  }

  sec02Img() {

    // bgVideoTile用の連番画像の読み込み
    gb.in.loadSec02Img = this.loader = new Loader();

    if (gb.in.u.isPC) {
      var len = gb.in.conf.sec02ImgNum;
      gb.in.rm.total += len;　// load数のtotalを計算
      var path = '/assets/resource/img/movie/bgImg/';
    } else {
      var len = 19;
      gb.in.rm.total += len;　// load数のtotalを計算
      var path = '/assets/resource/img/movie/bgImgSP/';
    }

    var cb = ()=>{
      // gb.in.Sec02Bg.create();
    }
    var cb02 = ()=>{
      gb.in.rm.completed++;
    }

    // this.loader.imgSerialLoad(len,path,'tfny_',cb,cb02);
    this.loader.img(len+1,path,'tfny_',cb,cb02);

  }

  section04ProductShader() {

    var shaders = [];
    var shaderLoadList = [
                       // gb.Clock,
                       // gb.Color,
                       // gb.Plasma,
                       // gb.Sepia,
                       // gb.Mosaic,
                       gb.ZoomBlur,
                       gb.ZoomBlur,
                       gb.Transition02,
                     ];

    var len = shaderLoadList.length;
    gb.in.rm.total += len; // load数のtotalを計算

    var shaderSerialLoad = (len, cb)=>{

        var shader,cnt=0;

        var load = (i)=>{
          shader = new shaderLoadList[i](comp);
          shaders.push(shader);
        };

        var comp = function(){
          cnt++;
          gb.in.rm.completed++;
          if(cnt == len) cb(shaders);
          else load(cnt);
        };

        load(cnt);

    }

    shaderSerialLoad(shaderLoadList.length,(shaders)=>{

      this.shaders = shaders;
      this.section04ProductImg();

    })

  }

  section04ProductImg() {

    var textureList = [
      '/assets/resource/img/product/tiffany_hand1.jpg',
      '/assets/resource/img/product/brown.png',
      '/assets/resource/img/product/blue.png',
      '/assets/resource/img/product/white.png',
      '/assets/resource/img/product/tiffanyblue.png',
      '/assets/resource/img/product/pink.png',
    ];      
    this.textures = [];

    var len = textureList.length;
    gb.in.rm.total += len; // load数のtotalを計算

    var textureSerialLoad = (len, cb)=>{

      var texture,cnt=0;

      var load = (i)=>{
        texture = THREE.ImageUtils.loadTexture(textureList[i], null ,comp);
        this.textures.push(texture);
      };

      var comp = function(){
        cnt++;
        gb.in.rm.completed++;
        if(cnt == len) cb();
        else load(cnt);
      };

      load(cnt);

    }

    textureSerialLoad(textureList.length, ()=>{$(window).trigger('onSection04ProductImg');});

  }

  webFont() {

    // web font loader用param
    var config = {
      custom: {
        families: [
          'Cormorant',
          'Roboto Condensed'
          // 'Noto Sans Japanese',
          // 'Roboto',
          // 'Alegreya Sans',
          // 'Alegreya Sans SC'
          ],
        urls: [
          'https://fonts.googleapis.com/css?family=Cormorant:500,500i|Roboto+Condensed'
          // '/assets/css/font.css',
          // 'https://fonts.googleapis.com/css?family=Roboto:400,500,300',
          // 'https://fonts.googleapis.com/css?family=Alegreya+Sans:400,100',
          // 'https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:400,300,100'
          ]
      },
      active: function() { 
          
          log('webFont!!!!');
          gb.in.conf.webFontLoaded = true;

      } 
    };

    var loader = new Loader();   
    loader.webFont(config);

  }

  onEnd() {


  }

  setEvents() {


    
  }

}