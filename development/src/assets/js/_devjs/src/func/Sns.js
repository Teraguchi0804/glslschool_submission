// ------------------------------------------------------------
//
//  Sns
//
// ------------------------------------------------------------

import metaData from "json-loader!../../../../ejs/inc/metaData.json";

export default class Sns {

  constructor($fb,$tw,$line,$mail){

    this.$fb = $fb;
    this.$tw = $tw;
    this.$line = $line;
    this.$mail = $mail;

    this.fb = {
      $target: $fb,
      tit: encodeURIComponent($('title').html()),
      des: encodeURIComponent($('.fbDes').attr('content')), // desctiption
      url: location.href,
    }

    this.tw = {
      $target: $tw,
      tit: encodeURIComponent($('title').html()),
      des: encodeURIComponent($('.fbDes').attr('content')), // desctiption
      url: location.href,
      hash: 'hash',
    }

    this.line = {
      $target: $line,
      tit: encodeURIComponent($('title').html()),
      des: encodeURIComponent($('.fbDes').attr('content')), // desctiption
      url: location.href,
    }

    this.setEvents();

  }

  switchMeta() {

    var p = gb.in.pjax.id;
    if (p == 'interview_detail') {

      log($('.section').hasClass('section03_detail01'));
      if ($('.section').hasClass('section03_detail01')) p = 'interviewDetail01';
      else if ($('.section').hasClass('section03_detail02')) p = 'interviewDetail02';
      else if ($('.section').hasClass('section03_detail03')) p = 'interviewDetail03';
  
    }

    // var d = gb.in.conf.meta[p];
    var d = metaData[p];

    $('title').text();
    $('.metaDes').attr({'content': d.description});
    $('.metaKey').attr({'content': d.keyword});

    $('.fbTit').attr({'content': d.fb.tit});
    $('.fbDes').attr({'content': d.fb.des});
    $('.fbImg').attr({'content': d.fb.img});
    $('.fbUrl').attr({'content': d.fb.url});

    $('.twTit').attr({'content': d.tw.tit});
    $('.twDes').attr({'content': d.tw.des});
    $('.twImg').attr({'content': d.tw.img});
    $('.twUrl').attr({'content': d.tw.url});


  }

  setting() {

    this.fb = {
      $target: this.$fb,
      tit: encodeURIComponent($('title').html()),
      des: encodeURIComponent($('.fbDes').attr('content')), // desctiption
      url: location.href,
    }

    this.tw = {
      $target: this.$tw,
      tit: encodeURIComponent($('title').html()),
      des: encodeURIComponent($('.fbDes').attr('content')), // desctiption
      url: location.href,
      hash: 'hash',
    }

    this.line = {
      $target: this.$line,
      tit: encodeURIComponent($('title').html()),
      des: encodeURIComponent($('.fbDes').attr('content')), // desctiption
      url: location.href,
    }

  }

  setOgImg() {

    // $('.ogImg_fb').attr('content', this.fb.img);
    // $('.ogImg_tw').attr('content', this.tw.img);

  }

  jumpFB(e) {

      this.openWindow('https://www.facebook.com/sharer/sharer.php?u=' + this.fb.url);

      return false;

  }


  jumpTW(e) {

    this.openWindow('http://twitter.com/intent/tweet?url=' + this.tw.url + '&text=' + this.tw.des);
    // this.openWindow('http://twitter.com/intent/tweet?url=' + this.tw.url + '&text=' + this.tw.text + '&hashtags=' + this.tw.hash);

    return false;

  }

  jumpLINE() {

      this.openWindow('http://line.me/R/msg/text/?' + this.line.tit + '%0A' + this.line.url);

      return false;
  }

  onSendMail() {

    var address = '';
    var sub = '';
    var body = encodeURIComponent($('title').html()+'\n'+location.href);

    location.href = 'mailto:' + address + '?subject=' + sub + '&body=' + body;

    return false;

  }

  openWindow(url, w, h) {

      if(w === undefined) w = 600;
      if(h === undefined) h = 600;

      var l = Number((window.screen.width-w)/2);
      var t = Number((window.screen.height-h)/2);

      window.open(url,'new_window',
                'menubar=no,' +
                'toolbar=no,' +
                'resizable=yes,' +
                'scrollbars=yes,' +
                'height=' + h + ',' +
                'width=' + w + ',' +
                'left=' + l + ',' +
                'top=' + t
              );

  }

  setEvents() {

    this.fb.$target.on('click', this.jumpFB.bind(this));
    this.tw.$target.on('click', this.jumpTW.bind(this));
    this.line.$target.on('click', this.jumpLINE.bind(this));
    if (this.$mail) this.$mail.on('click', ()=>{this.onSendMail();return false;});

  }

  removeEvents() {

    this.fb.$target.off('click');
    this.tw.$target.off('click');
    this.line.$target.off('click');
    if (this.$mail) this.$mail.off('click');

  }

}