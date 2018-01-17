//--------------------------------------------------
//
//  ReadyPercent
//
//--------------------------------------------------

export default class ReadyPercent {

  constructor() {

    this.$loading = $('#loading');
    this.$bar = $('.loadingBar');
    this.$percent = $('.loadingPercent');

    this.isLock = false;
    this.setTimeoutLock = false;

    this.setEvents();

  }

  update() {

    if (!gb.in.conf.webFontLoaded) return;

    var target = (gb.in.rm.completed / gb.in.rm.total) * 100;

    gb.in.rm.current += (target - gb.in.rm.current) * 0.1;
    // this.$bar.css({ width: gb.in.rm.current + '%' }); //percent 伸ばす
    this.$percent.text( Math.floor(gb.in.rm.current) + '%');

    // 終了処理
    if (gb.in.rm.current >= 100 && !this.isLock) {
      this.isLock = true;
      gb.in.rm.onComplete();
    }

    // current が 99.9 より大きければ 100 と見なして終了処理へ
    if (gb.in.rm.current > 99.9) {
      gb.in.rm.current = 100;
    }

    // ie11は,99になって、5秒経っても100でなければ、強制的に、表示
    // その際、completeして無ければ背景は静止画に
    // if (gb.in.u.isIE11) {

    if (gb.in.rm.current > 99 && !this.setTimeoutLock) {
    this.setTimeoutLock = true;

    log('99!!!!');
      // gb.in.rm.current = 99;

      setTimeout(()=>{

        log('5!!!')

        if (gb.in.rm.current !== 100) {

          gb.in.rm.completed++;
          $('.bgOverlayImg').addClass('isActive');

          log('対応！！')

        };

        
      },5000);

    };

    // };

  }

  remove() {


    TweenMax
      .to(this.$loading, 2.8, {
        scale: 1.2,
        opacity: 0,
        ease: Power3.easeInOut,
        onComplete:()=>{
          this.$loading.remove();
        }
      })    

  }

  setEvents() {

    gb.in.up.add('readyPercent',this.update.bind(this));
    
  }

}