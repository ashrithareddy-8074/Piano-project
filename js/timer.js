var timerVar;
var totalSeconds = 0;
var totalSecondsFromInit = 0;
var timerRunning = false;

document.getElementById("startTimer").addEventListener("click", function () {
  if (!timerRunning) {
    timerRunning = true;
    clearInterval(timerVar);
    timerVar = setInterval(countTimer, 1000);
    function countTimer() {
      ++totalSeconds;
      var hour = Math.floor(totalSeconds / 3600);
      var minute = Math.floor((totalSeconds - hour * 3600) / 60);
      var seconds = totalSeconds - (hour * 3600 + minute * 60);
      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      if (seconds < 10) seconds = "0" + seconds;
      document.getElementById("timer").innerHTML =
        hour + ":" + minute + ":" + seconds;
    }
  }
});

var stop = document
  .getElementById("stopTimer")
  .addEventListener("click", function () {
    clearInterval(timerVar);
    totalSecondsFromInit += totalSeconds;

    var hour = Math.floor(totalSecondsFromInit / 3600);
    var minute = Math.floor((totalSecondsFromInit - hour * 3600) / 60);
    var seconds = totalSecondsFromInit - (hour * 3600 + minute * 60);
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById("overallTimer").innerHTML =
      hour + ":" + minute + ":" + seconds;

    totalSeconds = 0;
    timerRunning = false;
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("startTimer").innerText = "Start Timer";
  });

var pause = document
  .getElementById("pauseTimer")
  .addEventListener("click", function () {
    if (timerRunning) {
      clearInterval(timerVar);
      document.getElementById("startTimer").innerText = "Resume Timer";
      timerRunning = false;
    }
  });
