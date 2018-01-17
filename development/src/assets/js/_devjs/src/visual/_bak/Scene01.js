/**
 * fileOverview:
 * Project:
 * File: Scene01
 * Date: 17/05/31
 * Author: Teraguchi
 */

import Entry from '../Core/Entry';


import audio from "./Utils/audio";

'use strict';

export default class Scene01 extends Entry{

  constructor() {

    super();

    this.scene = null;
    this.camera = null;
    this.cube = null;

    this.loader = new THREE.TextureLoader();
    this.mapTexture = this.loader.load( './../../../assets/resource/img/stone.jpg');

    this.timer = 0;

    this.elVolume = null;
    this.elVolumeVal = null;

    this.group = null;

    this.render = this._render.bind(this);

    this.createScene = this._createScene.bind(this);
    this.update = this._update.bind(this);

    this.cube_update = this._cube_update.bind(this);

    this.createScene();

    // this.audioInit = new audio();

    this.audioInit();

  }

  audioInit(){

    let ctx, analyser, frequencies, getByteFrequencyDataAverage, execute;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();

    analyser = ctx.createAnalyser();
    frequencies = new Uint8Array(analyser.frequencyBinCount);

    getByteFrequencyDataAverage = function() {
      analyser.getByteFrequencyData(frequencies);
      return frequencies.reduce(function(previous, current) {
            return previous + current;
          }) / analyser.frequencyBinCount;
    };

    navigator.mediaDevices.getUserMedia({audio: true})
        .then((stream) => {
          window.hackForMozzila = stream;
          ctx.createMediaStreamSource(stream)
          // AnalyserNodeに接続
              .connect(analyser);
        })
        .catch((err) => {
          window.console.log(err.message);
        });

    // 音量を表示する要素
    this.elVolume = document.getElementById('volume');

    //可能な限り高いフレームレートで音量を取得し、表示を更新する
    execute = function() {
      // this.elVolume.innerHTML = Math.floor(getByteFrequencyDataAverage());
      this.elVolumeVal = Math.floor(getByteFrequencyDataAverage());

      requestAnimationFrame(execute);
    }.bind(this);


    execute();
  }


  /**
   * シーンを作成。オブジェクトを格納
   * @private
   */
  _createScene(){


    this.scene = new THREE.Scene(); //シーン作成

    this.group = new THREE.Group();
    const step =30;
    const num = 10;
    for (let x = 1; x <= num; x++) {
      for (let y = 1; y <= num; y++) {
        for (let z = 1; z <= num; z ++) {
          this.cube = new THREE.Mesh(
              new THREE.BoxGeometry(10, 10, 10),
              new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: this.mapTexture,
                bumpMap: this.mapTexture,
                bumpScale: 0.05,
                specular: 0xcccccc,
                shininess:50,
                ambient: 0xffffff
              })
          );
          this.cube.position.set(
              (x - num / 2) * step,
              (y - num / 2) * step,
              (z - num / 2) * step
          );

          this.group.add(this.cube);
        }
      }
    }
    this.scene.add(this.group);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(200, 200, 200);
    this.scene.add(pointLight);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.z = 200;

  }


  _cube_update(waveData)
  {

    this.group.scale.x = 1 + waveData/200;
    this.group.scale.y = 1 + waveData/200;
    this.group.scale.z = 1 + waveData/200;

  }


  _render() {
    this.group.rotation.x += 0.01;
    this.group.rotation.y += 0.01;
    this.group.rotation.z += 0.01;
    this.group.traverse(function(obj) {
      if (obj != this.group) {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        obj.rotation.z += 0.01;
      }
    }.bind(this));

  }


  /**
   *
   * @private
   */
  _update(){

    this.cube_update(this.elVolumeVal);

    this.render();

  }

}