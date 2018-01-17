/**
 * fileOverview:
 * Project:
 * File: Main
 * Date:
 * Author: Teraguchi
 */

import DisplayTop from '../Display/DisplayTop';
// import DisplayZoomBlur from '../Display/DisplayZoomBlur';
// import DisplayFloating from '../Display/DisplayFloating';
// import DisplayDistort from '../Display/DisplayDistort';
// import Display3DCarousel from '../Display/Display3DCarousel';
// import DisplayTextureBg from '../Display/DisplayTextureBg';
// import DisplayTextureMovie from '../Display/DisplayTextureMovie';
// import DisplayGpgpu01 from '../Display/DisplayGpgpu01';
import DisplayObjStudy01 from '../Display/DisplayObjStudy01';

'use strict';

export default class Main {

  constructor() {

    this.setup();
    this.setEvents();

  }

  setup() {

  }

  onReady() {

    //pageページ別のIDを取得
    const page = $('body').data('id');

    window.console.log('現在のページIDは ', page);

		//pageのIDごとに発火するクラスの振り分け
    switch (page) {

      case 'top':

        new DisplayTop();

        break;

			// case 'ZoomBlur':
			//
			// 	new DisplayZoomBlur();
			//
			// 	break;
			//
			// case 'Floating':
			//
			// 	new DisplayFloating();
			//
			// 	break;
			//
			// case 'Distort':
			//
			// 	new DisplayDistort();
			//
			// 	break;
			//
			// case '3DCarousel':
			//
			// 	new Display3DCarousel();
			//
			// 	break;
			//
			// case 'textureBg':
			//
			// 	new DisplayTextureBg();
			//
			// 	break;
			//
			// case 'textureMovie':
			//
			// 	new DisplayTextureMovie();
			//
			// 	break;
			//
			// case 'gpgpu01':
			//
			// 	new DisplayGpgpu01();
			//
			// 	break;

			case 'objStudy01':

				new DisplayObjStudy01();

				break;
    }

  }

  onLoad() {

    
  }

  onRender() {


  }

  setEvents() {

    $(document).on('ready', this.onReady.bind(this));
    $(window).on('load', this.onLoad.bind(this));        

  }

}