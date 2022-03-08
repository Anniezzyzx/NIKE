(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = true; // set to false before publishing

      var dom = domIds();
      var master = new TimelineMax({
        onComplete: addRollover
      }); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function moveStripes() {
        var tl = new TimelineMax({});
        tl.add('movestripes').to("#stripe-top", master.duration(), {
          backgroundPosition: '-400px 0px',
          ease: Linear.easeNone
        }, 'movestripes').to("#stripe-bottom", master.duration(), {
          backgroundPosition: '400px 0px',
          ease: Linear.easeNone
        }, 'movestripes'); // console.log('tl: ', tl.duration());

        return tl;
      }

      function frame0() {
        dom.ad_content.classList.remove('invisible');
        var speed = 0.1;
        var speed2 = 0.25;
        var delay = 0.5;
        master.to("#img02", speed, {
          autoAlpha: 1,
          yoyo: true,
          repeat: 2,
          ease: Linear.easeNone
        }, '+=' + delay) // .addPause()
        .to("#img02", speed, {
          autoAlpha: 0,
          yoyo: true,
          repeat: 3,
          ease: Linear.easeNone
        }, '+=0.5').to(["#img01", "#img02"], speed, {
          autoAlpha: 0,
          ease: Linear.easeNone
        }).add('blink').to("#ad_content", speed, {
          backgroundColor: 'black',
          yoyo: true,
          repeat: 5,
          ease: Linear.easeNone
        }, 'blink').to("#logo_black", speed, {
          autoAlpha: 0,
          yoyo: true,
          repeat: 5,
          ease: Linear.easeNone
        }, 'blink').to("#logo_white", speed, {
          autoAlpha: 1,
          yoyo: true,
          repeat: 5,
          ease: Linear.easeNone
        }, 'blink').to("#img03", speed, {
          autoAlpha: 1,
          ease: Linear.easeNone
        }).to("#img04", speed, {
          autoAlpha: 1,
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.5,
          ease: Linear.easeNone
        }).to("#force", speed2, {
          autoAlpha: 1,
          ease: Linear.easeNone
        }, '+=0.25').to("#cta_container", speed2, {
          autoAlpha: 1,
          ease: Linear.easeNone
        }, '+=0.5').add(moveStripes(), '0'); // console.log('master: ', master.duration());
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          // Remove this comment
          TweenMax.to("#cta", 0.25, {
            autoAlpha: 0
          });
          TweenMax.to("#cta_over", 0.25, {
            autoAlpha: 1
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          // Remove this comment
          TweenMax.to("#cta_over", 0.25, {
            autoAlpha: 0
          });
          TweenMax.to("#cta", 0.25, {
            autoAlpha: 1
          });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
