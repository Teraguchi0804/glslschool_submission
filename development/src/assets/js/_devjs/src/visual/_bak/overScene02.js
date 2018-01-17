/**
 * fileOverview:
 * Project:
 * File: overScene02
 * Date: 17/06/21
 * Author: Teraguchi
 */

import Entry from '../Core/Entry';

'use strict';

export default class overScene02 extends Entry{

  constructor() {

    super();

    this.timer = 0;
    this.UPDATE = true;
    this.END = false;
    this.scene = null;
    this.camera = null;

    this.createScene = this._createScene.bind(this);
    this.remove = this._remove.bind(this);
    this.endEnabled = this._endEnabled.bind(this);
    this.update = this._update.bind(this);

    this.createScene();

  }

  /**
   * シーンを作成。オブジェクトを格納
   * @private
   */
  _createScene(){

    this.scene = new THREE.Scene(); //シーン作成

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 5000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 1400;
		this.camera.lookAt(new THREE.Vector3(10, 0, 0));

    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.copy(new THREE.CircleBufferGeometry(1, 6));


    let particleCount = 10000;
    let translateArray = new Float32Array(particleCount * 3);
    for (let i = 0, i3 = 0, l = particleCount; i < l; i++, i3 += 3) {
      translateArray[i3 + 0] = Math.random() * 2 - 1;
      translateArray[i3 + 1] = Math.random() * 2 - 1;
      translateArray[i3 + 2] = Math.random() * 2 - 1;
    }
    this.geometry.addAttribute("translate", new THREE.InstancedBufferAttribute(translateArray, 3, 1));
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        map: { value: new THREE.TextureLoader().load("../../../../assets/resource/img/circle.png") },
        time: { value: 0.0 }
      },
      vertexShader: require('../../../../glsl/over.vert'),
      fragmentShader: require('../../../../glsl/over.frag'),
      depthTest: true,
      depthWrite: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(400, 400, 400);
    this.scene.add(this.mesh);


  }

  /**
	 *
   * @private
   */
  _remove(){
    while (this.scene.children.length != 0) {
      this.scene.remove(this.scene.children[0]);
      if (this.scene.children[0] == THREE.Mesh) {
        this.scene.children[0].geometry.dispose();
        this.scene.children[0].material.dispose();
      }
    };
	}

  /**
	 *
   * @private
   */
  _endEnabled(){
    this.UPDATE = false;
	}


  /**
   * update関数
   * @private
   */
  _update(){
    this.timer += 0.01;
    //console.log(this.END);
    if (this.UPDATE == false) {
      //this.scene.remove(this.scene.children[0]);
      this.remove();
      if (this.scene.children.length == 0) {
        this.END = true;
      }
    }
    let time = performance.now() * 0.0005;
    this.material.uniforms.time.value = time;
    this.mesh.rotation.x = time * 0.2;
    this.mesh.rotation.y = time * 0.4;
    // this.camera.position.y = 100*Math.sin(this.timer);
    // this.camera.position.x = 100* Math.cos(this.timer);
    let rad = 600 + Math.sin(this.timer) * 200;
    this.camera.position.x = Math.sin(this.timer * 0.4) * Math.cos(this.timer * 0.3) * rad;
    this.camera.position.y = Math.cos(this.timer * 0.4) * rad;
    this.camera.position.z = Math.sin(this.timer * 0.4) * Math.sin(this.timer * 0.3) * rad; //+Math.sin(this.timer*0.5)*200;
    this.camera.lookAt(new THREE.Vector3(0, 0, 100 * Math.cos(this.timer * 0.005)));


  }

}