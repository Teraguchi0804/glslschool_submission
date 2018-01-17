/**
 * fileOverview:
 * Project:
 * File: Capture
 * Date: 17/11/29
 * Author: Teraguchi
 */

'use strict';

export default class Capture extends THREE.Scene{

  constructor() {

    super();

    this._texture;

    // this.texture = this._texture.bind(this);
    // this.render = this._render.bind(this);
    // this.size = this._size.bind(this);

  }

	/**
   * 初期化
	 */
	init(){

		// this._texture = new THREE.WebGLRenderTarget(16, 16);
		this._texture = new THREE.WebGLRenderTarget(512, 512);

  }

	/**
   * テクスチャ
	 */
	texture(){

	  return this._texture.texture;

  }

	/**
   * テクスチャにレンダリング
	 * @param renderer
	 * @param camera
	 */
  render(renderer, camera){
		//this -> オフスクリーンレンダリング用のScene, camera -> オフスクリーンレンダリング用のCamera,
		//第三引数にはテクスチャを指定
    renderer.render(this, camera, this._texture);

  }

	/**
   * レンダリング先テクスチャのサイズ設定
	 * @param width
	 * @param height
	 */
  size(width, height){

    let ratio = window.devicePixelRatio || 1;
		this._texture.setSize(width * ratio, height * ratio);

  }

}