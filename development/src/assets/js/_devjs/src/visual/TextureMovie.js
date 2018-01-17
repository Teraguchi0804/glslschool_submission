/**
 * fileOverview:
 * Project:
 * File: TextureMovie
 * Date:
 * Author:
 */

import Entry from '../Core/Entry';
// import TitleObject from "./TitleObject";
// import Camera from './Utils/Camera';

'use strict';

export default class TextureMovie extends Entry{

  constructor() {

    super();

    this.uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      u_mouse: { type: "v2", value: new THREE.Vector2() }
    };

    // this.titleObject = new TitleObject();

    this.canvas = document.getElementById('webgl-output');

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // this.output = opts.output || document.createElement('div');

    this.camera = null;
    this.renderer = null;
    this.scene = null;
		this.cube = null;

    this.createCamera = this._createCamera.bind(this);
    this.createRenderer = this._createRenderer.bind(this);
    this.createScene = this._createScene.bind(this);
    this.createObject = this._createObject.bind(this);
    this.orbitControls = this._orbitControls.bind(this);

    this.planeObject = this._planeObject.bind(this);

    this.render = this._render.bind(this);

    this.onResize = this._onResize.bind(this);

    this.Update = this._Update.bind(this);

  }

  /**
   * 初期化
   */
  init(){



    this.createCamera();
		this.createScene();
    this.createRenderer();

		this.orbitControls();

		// this.createObject();

    this.planeObject();

    this.Update();

    // this.titleObject.loadTexture(() => {
    //   this.scene.add(this.titleObject.obj);
    // });

    //リサイズイベント発火
    window.addEventListener('resize', () => {
      this.onResize();
    }, false);

  }

  /**
   * カメラ作成
   */
  _createCamera(){

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 100;

    this.camera.lookAt(new THREE.Vector3(0,0,0));

  }

  /**
   * レンダラー作成
   */
  _createRenderer(){

		this.renderer = new THREE.WebGLRenderer({
      alpha              : false,
      antialias          : false,
      stencil            : false,
      depth              : true,
      premultipliedAlpha : false,
      canvas: this.canvas
		});

    // this.renderer.setClearColor(0xffffff);
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(this.width, this.height);
    // this.output.appendChild(this.renderer.domElement);

  }

  /**
   *　シーン作成
   */
  _createScene(){

		this.scene = new THREE.Scene();

  }

  /**
   * Object作成
   * @private
   */
	_createObject(){

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });

    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.cube.position.x = 3;
    this.cube.position.y = 3;
    this.cube.position.z = 3;

    this.scene.add(this.cube);

	}

	_planeObject(){
    this.plane = new THREE.Mesh(
        // new THREE.PlaneBufferGeometry(256, 64, 40, 10),
        new THREE.PlaneBufferGeometry(5, 20, 32),
        new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: require('../../../../glsl/index/test.vert'),
          fragmentShader: require('../../../../glsl/index/test.frag'),
        })
    )
    this.scene.add(this.plane);
  }

  /**
   * レンダラー
   * @private
   */
	_render() {
    let clock = new THREE.Clock();
    let time = clock.getDelta();

    // this.titleObject.titrender(time);
  }

  /**
   * 更新
   * @private
   */
  _Update() {
    this.render();
    requestAnimationFrame( () => {
      this.Update();
    });
    // this.controls.update();
    this.uniforms.u_time.value += 0.05;
    this.renderer.render(this.scene, this.camera);
  }

  /**
   *　画面リサイズ
   */
  _onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

	/**
   * カメラコントロール
	 */
	_orbitControls(){
		this.controls = new THREE.OrbitControls(this.camera);
		this.controls.autoRotate = true;
		let clock = new THREE.Clock();

		let delta = clock.getDelta();
		this.controls.update(delta);
  }

	setEvents() {

    $(window).on('load', this.onLoad.bind(this));

  }

}