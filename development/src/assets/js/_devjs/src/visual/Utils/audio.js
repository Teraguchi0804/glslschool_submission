/**
 * fileOverview:
 * Project:
 * File: audio
 * Date:
 * Author: Teraguchi
 */


'use strict';

export default class audio {

  constructor() {

    this.elVolume = null;
    this.elVolumeVal = null;

    this.getByteFrequencyDataAverage = null;

    this.execute = this._execute.bind(this);

    this.getVal = this._getVal.bind(this);

    this.audioInit();

  }

  /**
   * 初期化
   */
  audioInit(){

    let ctx, analyser, frequencies;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();

    analyser = ctx.createAnalyser();
    frequencies = new Uint8Array(analyser.frequencyBinCount);

    this.getByteFrequencyDataAverage = function() {
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

    this.execute();

  }

  /**
   *
   * @private
   */
  _execute(){
    // 音量を表示する要素
    this.elVolume = document.getElementById('volume');

    // 可能な限り高いフレームレートで音量を取得し、表示を更新する
    this.elVolume.innerHTML = Math.floor(this.getByteFrequencyDataAverage());
    this.elVolumeVal = Math.floor(this.getByteFrequencyDataAverage());

    requestAnimationFrame(this.execute);

    return(this.elVolumeVal);
  }

  _getVal(){

    return(this.elVolumeVal);

  }

}