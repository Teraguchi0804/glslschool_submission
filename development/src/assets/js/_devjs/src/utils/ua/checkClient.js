/**
 * fileOverview: Ua判別
 * Project:
 * File: checkClient
 * Date:
 * Author: Teraguchi
 */

const parser = require("../../../libs/ua-parser.min.js");

'use strict';

export default class checkClient {

  constructor() {

    this.ua = new parser();

  }

  /**
   * IEかどうか判定
   * @returns {boolean}
   */
  isIE() {
    let browser = this.ua.getBrowser().name;
    return browser === 'IE' ? true : false;
  }

  /**
   * Firefoxかどうか判定
   * @returns {boolean}
   */
  isFirefox() {
    let browser = this.ua.getBrowser().name;
    return browser === 'Firefox' ? true : false;
  }

  /**
   * Chromeかどうか判定
   * @returns {boolean}
   */
  isChrome() {
    let browser = this.ua.getBrowser().name;
    return browser === 'Chrome' ? true : false;
  }

  /**
   * Safariかどうか判定
   * @returns {boolean}
   */
  isSafari() {
    let browser = this.ua.getBrowser().name;
    return browser === 'Safari' ? true : false;
  }

  /**
   * モバイルかどうか判定
   * @returns {*}
   */
  isMobile() {
    let device = this.ua.getDevice().type;
    return device === 'mobile' ? true : null;
  }

  /**
   * タブレットかどうか判定
   * @returns {*}
   */
  isTablet() {
    let device = this.ua.getDevice().type;
    return device === 'tablet' ? true : null;
  }

  /**
   * OS名を取得
   * @returns {string}
   */
  os() {
    return this.ua.getOS().name;
  }

  /**
   * デバイス名を取得
   * @returns {vendor|{HTC, Sprint}}
   */
  device_name() {
    let device_name = this.ua.getDevice().vendor;
    return device_name;
  }

  /**
   * ブラウザ名を取得
   */
  browser_name() {
    return this.ua.getBrowser().name;
  }

  /**
   * ユーザーエージェント情報：全てを取得
   */
  all() {
    return this.ua.getUA();
  }

}