/**
 * fileOverview: 
 * Project:
 * File:
 * Date:
 * Author:
 */

(function(){

  var gb = jp.co.mie;

  function LoadCnt(len) {

    this.cnt = 0;
    this.len = len || 0;

    this.onComplete = function(){};

  }

  LoadCnt.prototype = {

    add: function () {

      this.cnt++;
      if (this.cnt == this.len) this.run();

    },

    run: function () {

      var self = this;

      TweenMax.set($('#wrapper'), {opacity: 1})
      TweenMax.to($('#loading'), 0.8, {
        opacity: 0,
        ease: Power2.easeOut,
        delay: 0.7,
        onComplete: function() {
          $('#loading').hide();
          self.onComplete();
        }
      })

    },

    setEvents: function () {

    },

  }

  gb.LoadCnt = LoadCnt;

})();