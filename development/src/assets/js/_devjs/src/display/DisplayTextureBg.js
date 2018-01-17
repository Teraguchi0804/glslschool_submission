/**
 * fileOverview:
 * Project:
 * File: Display
 * Date:
 * Author: Teraguchi
 */

import TextureBg from "../visual/TextureBg";

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

    gb.in.textureBg = new TextureBg();

    gb.in.textureBg.init();


  }

  static run() {

  }

  setEvents() {

    $(window).on('load', this.onLoad.bind(this));        

  }

}