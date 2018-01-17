/**
 * fileOverview: ObjStudy01
 * Project:
 * File: Carousel
 * Date: 18/01/13
 * Author: Teraguchi
 */

import Entry from '../Core/Entry';

require('../../libs/loaders/OBJLoader');

'use strict';

export default class ObjStudy01 extends Entry {

  constructor() {

    super();

    this.canvas = document.getElementById('webgl-output');

    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    // 基本セット
    this.camera = null;
    this.renderer = null;
    this.scene = null;
		this.pointsLight = null;
		this.ambientLight = null;
		this.uniforms = null;

		// オフスクリーンレンダリングで使用
		this.baseScene = null;
		this.baseCamera = null;
		this.baseLight = null;
		this.baseGeometry = null;
		this.baseMaterial = null;
		this.baseMesh = null;
		this.renderTarget = null;

    this.createCamera = this._createCamera.bind(this);
    this.createScene = this._createScene.bind(this);
		this.createRenderer = this._createRenderer.bind(this);
    this.createLight = this._createLight.bind(this);
		this.offScreenEvent = this._offScreenEvent.bind(this);
    this.loadModel = this._loadModel.bind(this);
    this.utilEvent = this._utilEvent.bind(this);
    this.onResize = this._onResize.bind(this);
		this.Update = this._Update.bind(this);

  }

  /**
   * 初期化
   */
  init(){

		this.createScene();
    this.createCamera();
    this.createRenderer();
		this.createLight();

		this.offScreenEvent();

		this.loadModel();

		this.utilEvent();

		this.Update();

		this.onResize();

		window.addEventListener('resize', this.onResize, false );
  }


  /**
   * カメラ作成
   */
  _createCamera() {

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1.0, 2000);
    this.camera.position.x = 5;
    this.camera.position.y = 10;
    this.camera.position.z = 10;

    // this.camera.lookAt(new THREE.Vector3(0,0,0));
    this.camera.lookAt(this.scene.position);

  }

  /**
   * レンダラー作成
   */
  _createRenderer() {

		this.renderer = new THREE.WebGLRenderer({
      alpha              : false,
      antialias          : false,
      stencil            : false,
      depth              : true,
      premultipliedAlpha : false,
      canvas: this.canvas
		});

    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(this.width, this.height);

  }

  /**
   *　シーン作成
   */
  _createScene() {

		this.scene = new THREE.Scene();

  }


	/**
	 * ライト作成
	 * @private
	 */
  _createLight() {

		// Point Light
		this.pointsLight = new THREE.PointLight(0xffffff, 1.0); // 第二引数はintensity：ライトの強度でデフォルトは1.0
		this.scene.add(this.pointsLight);

		// Ambiend Light
		this.ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
		this.scene.add(this.ambientLight);

	}

	/**
	 * オフスクリーンレンダリングイベント
	 * @private
	 */
	_offScreenEvent() {

		// オフスクリーンレンダリングの描画処理（renderTarget への描画用）
		this.baseScene = new THREE.Scene();

		// オフスクリーンレンダリングの描画処理用カメラ
		this.baseCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
		this.baseCamera.position.z = 1;

		// オフスクリーンレンダリング用ライトを追加
		this.baseLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1);
		this.baseLight.position.set(0, 10, 20);
		this.baseScene.add(this.baseLight);

		// ベース用のマテリアルとジオメトリ
		this.baseGeometry = new THREE.BoxGeometry(1, 1, 1);

		//
		this.uniforms = {
			u_time: { type: "f", value: 1.0 },
			u_resolution: { type: "v2", value: new THREE.Vector2() },
		};
		this.baseMaterial = new THREE.RawShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: require('../../../../glsl/banana.vert'),
			fragmentShader: require('../../../../glsl/banana.frag'),
			side: THREE.DoubleSide,
			transparent: true
		});
		this.baseMesh = new THREE.Mesh(this.baseGeometry, this.baseMaterial);
		this.baseScene.add(this.baseMesh);


		// オフスクリーンレンダリング用
		this.renderTarget = new THREE.WebGLRenderTarget(1, 1, {
			magFilter: THREE.NearestFilter,
			minFilter: THREE.NearestFilter,
			wrapS: THREE.ClampToEdgeWrapping,
			wrapT: THREE.ClampToEdgeWrapping
		});

	}

	/**
	 * 3Dモデル読み込み・初期化
	 * @private
	 */
	_loadModel() {
		let that = this;

		//
		let manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {
			window.console.log( item, loaded, total );
		};

		//
		let onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				let percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		// 読み込みエラー処理
		let onError = function ( xhr ) {
		};

		// let textureLoader = new THREE.TextureLoader( manager );
		// let texture = textureLoader.load( '../../../../assets/resource/img/Banana.jpg' );

		this.loader = new THREE.OBJLoader( manager );
		this.loader.load( '../../../../assets/resource/model/banana03.obj', function ( object ) {
			object.traverse( function ( child ) {

				let material = new THREE.MeshPhongMaterial({
					map: that.renderTarget, //renderTargetをテクスチャとして渡す
					wireframe: false
				});
				window.console.log(material.map);
				object.children[0].material = material;

				if ( child instanceof THREE.Mesh ) {
					// child.material.map = texture;
				}

			});

			object.position.set(0.0, 0.0, 0.0);
			object.rotation.set(0.0, 0.0, 0.0);
			let scaleVal = 1.0;
			object.scale.set(scaleVal, scaleVal, scaleVal);
			that.scene.add( object );
		}, onProgress, onError );

	}

	/**
	 *
	 * @private
	 */
	_utilEvent (){
		//軸の長さ
		let axis = new THREE.AxesHelper(1000);
		this.scene.add(axis);

		// カメラ
		let controls;
		controls = new THREE.OrbitControls(this.camera);
		controls.autoRotate = true;
	}

  /**
   * 更新
   * @private
   */
  _Update() {

		this.uniforms.u_time.value += 0.02;

		// オフスクリーンレンダリング
		this.renderer.render(this.baseScene, this.baseCamera, this.renderTarget);

		//
		this.renderer.render(this.scene, this.camera);

    requestAnimationFrame( () => {
      this.Update();
    });

  }

  /**
   *　画面リサイズイベント
   */
  _onResize() {
		this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }


	setEvents() {

    $(window).on('load', this.onLoad.bind(this));

  }

}