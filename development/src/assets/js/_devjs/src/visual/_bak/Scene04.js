/**
 * fileOverview:
 * Project:
 * File: Scene04
 * Date: 17/06/19
 * Author: Teraguchi
 */

import Sphere from './objects/Sphere';
import Plane from './objects/Plane';
import Cube from './objects/Cube';
import Ring from './objects/Ring';

import Entry from '../Core/Entry';
// import PlaneScene03 from './PlaneScene03';

'use strict';

export default class Scene04 extends Entry{

  constructor(width, height, audio) {

    super();

    this.canvas = document.getElementById('main');

    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    this.camera = null;
    this.renderer = null;
    this.scene = null;

    this.usePostprocessing = true;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.plane = new Plane();
    this.plane.position.set(0, 0, 0);
    this.scene.add(this.plane);

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);

    this.sphere = new Sphere();
    this.sphere.position.set(0, 0, 0);
    this.scene.add(this.sphere);

    this.ring = new Ring();
    this.ring.position.set(0, 0, 0);
    this.scene.add(this.ring);

    this.ring.removeMesh();
    this.cube.removeMesh();
    this.plane.removeMesh();

    this.createScene = this._createScene.bind(this);

    this.onResize = this._onResize.bind(this);
		this.update = this._update.bind(this);
		this.loadTexture = this._loadTexture.bind(this);

		this.plane = new PlaneScene03(); // plane

		this.init(); // 初期化実行

  }

  initPostprocessing() {
    if (!this.usePostprocessing) return;

    this.vignette2Pass = new WAGNER.Vignette2Pass();
  }

  /**
   * 初期化
   */
  init(){

		this.createScene();

		this.loadTexture();

  }



  /**
   *　シーン作成
   */
  _createScene(){

    this.scene = new THREE.Scene(); //シーン作成

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 100;

    this.camera.lookAt(new THREE.Vector3(0,0,0));

  }

  /**
   * 画像をロード
   * @private
   */
	_loadTexture(){

		this.plane.loadTexture('../../../../assets/resource/img/shibuya01.jpg', () => {
			this.scene.add(this.plane.mesh);
			window.addEventListener('resize', () => {
				this.onResize();
			}, false);
			this.onResize();
			this.update();
		});

	}

  /**
   * 更新
   * @private
   */
  _update() {

		this.plane.uniforms.time.value += 0.05;

		// window.console.log('03');
  }

  /**
   *　画面リサイズイベント
   */
  _onResize() {
		this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
		this.plane.mesh.material.uniforms.resolution.value.set(document.body.clientWidth, document.body.clientHeight);

  }


	setEvents() {

    $(window).on('load', this.onLoad.bind(this));

  }

}