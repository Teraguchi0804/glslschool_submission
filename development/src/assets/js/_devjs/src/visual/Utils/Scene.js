/**
 * fileOverview:
 * Project:
 * File: Scene
 * Date:
 * Author: Teraguchi
 */


'use strict';

export default class Scene {

  constructor() {

    this.scene = null;

    this.createCameraObject = this._createCameraObject.bind(this);

    this.init();
  }

  /**
   * 初期化
   */
  init(){

    this.createCameraObject();

  }

  /**
   * カメラオブジェクト作成
   */
  _createCameraObject(){

    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);

  }

  /**
   * レンダラー作成
   */
  // _createRenderer(){
  //
  // }

  /**
   *　シーン作成
   */
  // _createScene(){
  //
  // }
  //
  //
  // onLoad(){
  //
  // }
  //
  // setEvents() {
  //
  // 	$(window).on('load', this.onLoad.bind(this));
  //
  // }

}