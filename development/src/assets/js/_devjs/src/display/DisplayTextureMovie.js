/**
 * fileOverview:
 * Project:
 * File: Display
 * Date:
 * Author: Teraguchi
 */

// import WebGLinit from './WebGLinit.js';

import Canvas from "../visual/Canvas";

'use strict';

export default class DisplayTop {

  constructor(){

    this.setup();
    this.setEvents();

  }

  setup() {

    // アニメーションループスタート
    // gb.in.up.loop();
    
  }

  onLoad() {

    gb.in.canvas = new Canvas();

    gb.in.canvas.init();


  }

  static run() {

		// window.console.log('static_Run');

  }

  setEvents() {

    $(window).on('load', this.onLoad.bind(this));        

  }

}