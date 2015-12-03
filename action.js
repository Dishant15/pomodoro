$(document).ready(function() {
  // default timer state stored in this vars
  var defMin = 25; // session timer value
  var breakMin = 5; // break timer value
  // main timer object
  var myTimer;
  // var to allow change of session and break buttons
  var isTimerRunning = false;
  // current timer state stored in this vars
  var timerMin = defMin;
  var timerSec = 0;
  var isBreaktime = false;
  // timer function declaration, cause its used before implementation
  var resetTimer;
  var stopTimer;
  var startTimer;

  // set clock position
  var w = window.innerWidth;
  w = Math.floor(w / 2) - 240;
  $('.circle').css('left', w.toString() + 'px');

  var timerChange = function() {
    // for .change class buttons
    if (isTimerRunning) {
      return;
    }
    $this = $(this);
    if ($this.hasClass('increment')) {
      // increment functionality
      if ($this.hasClass('sess')) {
        defMin += 1;
      } else {
        breakMin += 1;
      }
    } else {
      // decrement functionality
      if ($this.hasClass('sess')) {
        if (defMin > 1) {
          defMin -= 1;
        }
      } else {
        if (breakMin > 1) {
          breakMin -= 1;
        }
      }
    }
    // update html as per needed
    var breakStr = breakMin.toString();
    var sessStr = defMin.toString();
    if(breakStr.length == 1){
      breakStr = "0" + breakStr;
    }
    if(sessStr.length == 1){
      sessStr = "0" + sessStr;
    }
    $('.break').text(breakStr);
    $('.session').text(sessStr);
    if ($this.hasClass('sess')) {
      resetTimer();
    }
  }

  var updateHtml = function() {
    // update visual details of timer when it roll over 
    if (isBreaktime) {
      $('.timer-head').text('Break..!!').css('color','#66ff33');
      $('.circle').css('border-color','#ff3300');
    } else {
      $('.timer-head').text('Session').css('color','#ff3300');
      $('.circle').css('border-color','#66ff33');
    }
  }

  var updateTimer = function() {
    // Update visual details in html for users to see as per current values of timer
    var mins = timerMin.toString();
    var secs = timerSec.toString();
    if (secs.length == 1) {
      secs = "0" + secs;
    }
    if (mins.length == 1) {
      mins = "0" + mins;
    }
    $('.timer-text').text(mins + ":" + secs);
    updateHtml();
  }

  var timerDo = function() {
    // All the things that need to happen at each tick of timer
    if (timerSec == 0) {
      // 1 min done decrease from min now
      if (timerMin == 0) {
        // timer ended roll-over to next timer
        if (isBreaktime) {
          // break time ended roll over to session timer
          isBreaktime = false;
          timerMin = defMin;
          timerSec = 0;
        } else {
          // session ended roll over to break timer
          isBreaktime = true;
          timerMin = breakMin;
          timerSec = 0;
        }
        updateHtml();
      }
      timerMin -= 1;
      timerSec = 59;
    } else {
      timerSec -= 1;
    }
    updateTimer();
  };

  var startTimer = function() {
    myTimer = setInterval(timerDo, 1000);
    isTimerRunning = true;
    $('.circle').unbind();
    $('.circle').click(stopTimer);
  }

  var stopTimer = function() {
    clearInterval(myTimer);
    isTimerRunning = false;
    $('.circle').unbind();
    $('.circle').click(startTimer);
  }

  var resetTimer = function() {
    stopTimer();
    timerMin = defMin;
    timerSec = 0;
    isBreaktime = false;
    updateTimer();
  }

  // bind all click handlers
  $('.circle').click(startTimer);
  $('.reset').click(resetTimer);
  $('.change').click(timerChange);
  // set default html texts
  updateTimer();
});