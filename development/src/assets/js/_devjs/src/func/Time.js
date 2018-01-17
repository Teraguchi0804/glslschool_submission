//--------------------------------------------------
//
//  Time
//
//--------------------------------------------------

export default class Time {

  constructor() {

    this.isState = '';
    this.stateList = [
      'morning',
      'afternoon',
      'night'
    ]

    this.setup();
    this.setEvents();

    this.judgeState();
 
  }

  setup() {

    log(gb.in.u.date());

  }

  update() {

    gb.in.u.time();

    log(gb.in.u.hour,gb.in.u.minute,gb.in.u.second);

  }

  getNow() {


  }
       
  // ニューヨーク時間の取得
  getNowAtNY() {

    gb.in.u.time();
    var hour = gb.in.u.hour
    var dis = 13; // ニューヨークとの時差

    hour = hour - dis;
    if (hour < 0) hour = 24 + hour;

    return hour;

  }

  // 朝夕夜判定
  judgeState() {

    var h = this.getNowAtNY();

    // 朝 6〜15
    if (6 <= h && h <= 15) {

      this.isState = this.stateList[0];

    // 夕 16〜20
    } else if (15 < h && h <= 20) {

      this.isState = this.stateList[1];

    // 夜 21〜5
    } else if ((20 < h && h <= 23) || (0 <= h && h <=5)) {

      this.isState = this.stateList[2];

    }

    // log(this.isState);

  }
       
  setEvents() {

    // gb.in.up.add(this.update.bind(this));

  }

}
