//--------------------------------------------------
//
//  pjax sss
//
//--------------------------------------------------

import Loader from '../Func/Loader.js';
import DisplayPjaxPage from '../Display/DisplayPjaxPage.js';

export default class Pjax {

  constructor() {

    this.id = null;
    this.e = null;
    // this.nextLink = null;
    // this.prevLink = this.getLink();

    this.isPjaxLock = true;

    this.setEvents();

  }

  setup () {

    this.id = $('.section').data('id');

    // 背景色の変更
    if (this.id=='interview_detail' || this.id=='history') $('html').css('background-color', '#fff');
    else $('html').css('background-color', '#000');

  }

  getLink (url) {

    if (url.indexOf('movie') !== -1){
      return 'movie';
    } else if (url.indexOf('interview/01') !== -1){
      return 'interview_detail';
    } else if (url.indexOf('interview/02') !== -1){
      return 'interview_detail';
    } else if (url.indexOf('interview') !== -1){
      return 'interview';
    } else if (url.indexOf('history') !== -1){
      return 'history';
    } else {
      return 'top';
    }

  }

  setID () {

    this.id = $('.section').data('id');

    // bodyのpageクラスを削除
    $('body').removeClass('top movie interview interview_detail history');

    // 新しいページのクラスをつける
    $('body').addClass(this.id);

  }

  onClick (e) {

    var href = $(e.currentTarget).attr('href');
    this.e = e;
    this.nextLink = href;

    $(document).trigger('fetch');

  }

  onStart (e, that) {

    if (this.isPjaxLock) return;
    this.isPjaxLock = true;

    // クリック無効
    e.preventDefault();
    var href = $(that).attr('href');

    log('fecth');

    DisplayPjaxPage.outPageBeforeEf(href);

    // ページ遷移エフェクト コールバック登録
    gb.in.pageTransitionEffect.cb = ()=>{

      DisplayPjaxPage.outPageAfterEf();

      // pjaxリクエスト
      $.pjax({
        url: href,
        container : '#inner',
        fragment : '#inner',
        timeout : 5000
      });

    };

    // ページ遷移エフェクト開始
    gb.in.pageTransitionEffect.outEffect();

  }

  onEnd () {

    log('End');
    this.setID();

    DisplayPjaxPage.inPageBeforeImgLoaded();

    // 動画のロード確認
    var l = new Loader();
    l.ajaxImgLoad(()=>{ //画像が完全にロードされたらページ表示処理を始める

      DisplayPjaxPage.inPageAfterImgLoaded();

    });

  }

  onSend () {

  }

  onComplete() {

  }

  onPopState(e) {

    if (this.isPjaxLock) return;
    this.isPjaxLock = true;

    var href = e.target.baseURI;

    log('fecth');

    DisplayPjaxPage.outPageBeforeEf(href);

    // ページ遷移エフェクト開始
    gb.in.pageTransitionEffect.cb = ()=>{
    
      DisplayPjaxPage.outPageAfterEf();

      // pjaxリクエスト
      $.pjax({
        push: false,
        url: href,
        container : '#inner',
        fragment : '#inner',
        timeout : 5000
      });

    };

    // ページ遷移エフェクト開始
    gb.in.pageTransitionEffect.outEffect();

  }

  onReady() {

    var self = this;

    this.setup();

    $(document).on('click', 'a.pjax', function(e) { self.onStart.call(self, e, this); return false;});
    // $(document).on('pjax:start', (e)=>{this.onStart02(e);}); // ブラウザ back / forward用
    $(document).on('pjax:end', this.onEnd.bind(this));
    // $(document).on('pjax:send', this.onSend.bind(this));
    // $(document).on('pjax:complete', this.onComplete.bind(this));

    // ブラウザバックイベント
    $(document).on('pjax:popstate', (e)=>{this.onPopState(e);});


  }
       
  setEvents() {

    $(document).on('ready', this.onReady.bind(this));

  }

}