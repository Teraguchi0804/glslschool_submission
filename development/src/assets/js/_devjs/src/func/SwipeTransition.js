// ------------------------------------------------------------
//
//  SwipeTransition sss
//
// ------------------------------------------------------------

export default class SwipeTransition {

  constructor() {

    // ---------------
    //  dom
    // ---------------
    // this.$startWrap = $('.section01, .section02 .next, .section03 .box05');
    // this.$startWrap = $('.section02');
    this.$startWrap = $(window);
    this.$endWrap = $(window);

    this.pageList = {
      'top': 0,
      'movie': 1,
      'interview': 2,
      'history': 3,
    }

    // variable
    this.current = 0;
    this.old = null;
    this.next = 1;
    this.prev = null;
    this.len = 4;

    this.isLock = false;


    // ---------------
    //  variable
    // ---------------

    // position
    this.sX = 0;this.mX = 0;this.eX = 0; //startX,moveX,endX
    this.dis = 0;this.minDis = 15;

    // time
    this.sT=0;this.eT=0;this.minT = 300; //startTime,ellapsedTime,

    this.W = gb.in.r.W();

    this.onTouchLong = ()=>{};
    this.onTouchStartCB = ()=>{};
    this.onTouchEndCB = ()=>{};

    this.setup();
    this.setEvents();

  }

  setup() {

  }

  onTouchStart (e) {

    // targetX
    var y = e.originalEvent.changedTouches[0].pageY;
    this.sY = y;

    this.st = gb.in.s.st;
    this.sb = gb.in.s.sb;
    log('sy',y)

  }

  onTouchMove (e) {

    // targetX
    var y = e.originalEvent.changedTouches[0].pageY;
    this.mY = y;

  }

  onTouchEnd (e) {

    if (this.isLock) return;    

    var y = e.originalEvent.changedTouches[0].pageY;
    this.eY = y;

    var dis = this.sY - this.eY;
    var absDis = Math.abs(dis);

    // 最小距離より長かったら、処理
    if( this.minDis < absDis) {

      // ページ番号を取得
      this.current = this.pageList[gb.in.pjax.id];

      if (dis > 0) {

        var h = $('.section').height()*gb.in.Layout.size.scale.rate;
        log(this.sb,h-10,this.sb < h-10);

        if (this.current!==0 && this.sb < h-10) return;
        // historyページの場合は処理しない
        if (this.current==3) return;

        this.calculateOrder('next');

        // したへ
        var pageName = Object.keys(this.pageList).filter( (key) => { return this.pageList[key] === this.current })[0];
        $('.pjaxTo_'+pageName).trigger('click');

      } else {

        log(this.st,this.st !== 0);

        if (this.st !== 0) return;

        // 上へ
        this.calculateOrder('prev');

        var pageName = Object.keys(this.pageList).filter( (key) => { return this.pageList[key] === this.current })[0];
        $('.pjaxTo_'+pageName).trigger('click');

      }


    }

    // ----------------
    //  blur解除
    // ----------------
    this.isNotTouch = true;

    // コールバック
    this.onTouchEndCB();

  }

  calculateOrder(dir) {

    this.old = this.current;

    if (dir=='next') {

      this.current++;
      if (this.current>this.len-1) this.current=this.len-1;
      this.next = this.current+1;
      this.prev = this.current-1;

    } else {

      this.current--;
      if (this.current<0) this.current=0;  
      this.next = this.current+1;
      this.prev = this.current-1;

    }     

  }

  setEvents(){

    var self = this;

    this.$startWrap.on('touchstart.SwipeTransition', (e)=>{this.onTouchStart(e);});
    // this.$wrap.on('touchmove.SwipeTransition', (e)=>{this.onTouchMove(e);});
    this.$endWrap.on('touchend.SwipeTransition', (e)=>{this.onTouchEnd(e);});

  }

   removeEvents(){

    var self = this;

    this.$startWrap.off('touchstart.SwipeTransition');
    // this.$wrap.off('touchmove.SwipeTransition');
    this.$endWrap.off('touchend.SwipeTransition');

  }


    
}