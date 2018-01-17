/**
 * fileOverview:
 * Project:
 * File: SceneManger
 * Date: 17/05/29
 * Author: Teraguchi
 */

import Entry from '../Core/Entry';
// import OverScene from "../visual/overScene";
import OverScene02 from "../visual/overScene02";

'use strict';

export default class SceneManger extends Entry{

  constructor() {

    super();

		this.NUM = 0; // 現在のシーンの番号
		this.scenes = []; // シーンを格納する配列
    this.fadeInOutTimer = -1; //
    this.op = 0;

		this.canvas = null;
    this.renderer = null; // Renderer
    this.renderer02 = null; // Renderer02

    this.overscene = []; // overscene



    this.overAlpha = 0;

    this.addScene = this._addScene.bind(this);

		this.onResize = this._onResize.bind(this);
		this.checkNum = this._checkNum.bind(this);
		this.onKeyDown = this._onKeyDown.bind(this);
		this.fadeInOut = this._fadeInOut.bind(this);
		this.draw = this._draw.bind(this);


		this.alphaReset = this._alphaReset.bind(this);

		this.keyname = null;


		this.init(); // 初期化処理後、イベント登録

    window.addEventListener('resize', this.onResize, false );
    document.addEventListener("keydown", this.onKeyDown, true);

  }

  /**
   * 初期化
   */
  init(){

    this.overscene.push(new OverScene02());

		// Renderer作成
		this.renderer = new THREE.WebGLRenderer({alpha: true});
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new THREE.Color(0x000000, 0.0));
		this.renderer.sortObjects = false;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
		this.renderer.domElement.id = "main";
    this.canvas = this.renderer.domElement;
		document.body.appendChild(this.canvas);

    // Renderer02作成
    this.renderer02 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer02.setPixelRatio( window.devicePixelRatio );
    this.renderer02.setSize( window.innerWidth, window.innerHeight );
    this.renderer02.sortObjects = false;
    this.renderer02.shadowMap.enabled = true;
    this.renderer02.shadowMap.type = THREE.PCFShadowMap;
    this.renderer02.domElement.id = "sub";
    this.renderer02.setClearColor(0x000000, 0.5);
    this.canvas02 = this.renderer02.domElement;
    document.body.appendChild(this.canvas02);

  }

	/**
   * 管理したいシーンを格納する関数
	 * @param scene
	 */
	_addScene(scene) {

		this.scenes.push(scene);

	}

  /**
   *　ウィンドウの幅が変わったときの処理
   * @private
   */
  _onResize() {

  	// 表示しているシーンごとにカメラのリサイズを走らせる
    this.scenes[this.NUM].camera.aspect = window.innerWidth / window.innerHeight;
    this.scenes[this.NUM].camera.updateProjectionMatrix();
    // rendererは全てのシーンで共通
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // this.overscene[0].camera.aspect = window.innerWidth / window.innerHeight;
    // this.overscene[0].camera.updateProjectionMatrix();
    // this.renderer02.setSize(window.innerWidth, window.innerHeight);
  }

	/**
   * 現在のシーン番号が、不適切な値にならないようにチェック
	 * @private
	 */
	_checkNum(){

		if(this.NUM < 0) {
			this.NUM = this.scenes.length-1;
		}

		if(this.NUM >= this.scenes.length) {
			this.NUM = 0;
		}
		
  }

	/**
   * ←→キーでシーン番号を足し引き
	 * @private
	 */
	_onKeyDown(){
		window.onkeydown = (e) => {
			// console.log(e);
      this.keyname = e.key;

      if(this.keyname == "ArrowRight"){
        // this.alphaReset();
        this.NUM++;
        this.checkNum();
      }

      if(this.keyname == "ArrowLeft"){
        // this.alphaReset();
        this.NUM--;
        this.checkNum();
      }

      if(this.keyname == "ArrowRight" || this.keyname == "ArrowLeft") {

        this.fadeInOutTimer = 0;

      }

      if(this.keyname == "ArrowUp") {
        // window.console.log('Up');

        this.overAlpha+=0.05;
        if(this.overAlpha > 1){
          this.overAlpha = 1.0;
        }

      }

      if(this.keyname == "ArrowDown") {
        // window.console.log('Down');

        this.overAlpha-=0.05;
        if(this.overAlpha < 0){
          this.overAlpha = 0.0;
        }

      }

      $("#sub").css({ opacity: this.overAlpha });
			window.console.log('現在のシーン番号は',this.NUM);
		}
	}

  /**
	 * シーンチェンジ時のレイヤー
   * @private
   */
	_fadeInOut(){

    if(this.fadeInOutTimer <= Math.PI*2){

      this.fadeInOutTimer += 0.07;
      this.op = Math.sin(this.fadeInOutTimer);

      $("#fadeInOut").css({ opacity: this.op });

    } else {

      this.fadeInOutTimer = -1;
      this.op = 0.0;
      
    }

    if(this.op > 0.95 && this.op <= 1.0) {
      switch (this.keyname) {
        case 'ArrowRight':

          // this.NUM++;
          // this.checkNum();
          this.alphaReset();
          break;

        case 'ArrowLeft':

          // this.NUM--;
          // this.checkNum();
          this.alphaReset();
          break;
      }
    }
	}

  _alphaReset() {
    this.overAlpha = 0.0;

    $("#sub").css({opacity: this.overAlpha});
  }


	/**
   * 最終的な描写処理と、アニメーション関数をワンフレームごとに実行
	 * @private
	 */
	_draw() {
    
    // window.console.log(this.fadeInOutTimer);
    
		this.scenes[this.NUM].update();
		// this.overscene[this.NUM].update();
		// this.overscene[0].update();
		this.renderer.render(this.scenes[this.NUM].scene, this.scenes[this.NUM].camera);
		// this.renderer02.render(this.overscene[0].scene, this.overscene[0].camera);
		requestAnimationFrame(this.draw.bind(this));

    if(this.fadeInOutTimer >= 0) {
      this.fadeInOut();
    }

	}

}