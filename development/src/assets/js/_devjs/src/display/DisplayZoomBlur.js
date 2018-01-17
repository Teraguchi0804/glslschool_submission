/**
 * fileOverview:
 * Project:
 * File: DisplayZoomBlur
 * Date:
 * Author: Teraguchi
 */

import ZoomBlur from '../visual/ZoomBlur';

'use strict';

export default class DisplayZoomBlur {

  constructor(){

		this.zoomBlur = new ZoomBlur();

    this.setup();
    this.setEvents();

  }

  setup() {

		this.zoomBlur.init();
    
  }

  onLoad() {


  }

  static run() {

		// window.console.log('static_Run');

  }

  setEvents() {

    $(window).on('load', this.onLoad.bind(this));        

  }

}