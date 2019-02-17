const SECOND = 1000;
const MINUTE = 1000 * 60;

let btnStart, btnPause, btnReset, pomodoroHeading, x, pomodoro;

getComponents();

setComponents();

function toggleButton(button) {
  button.disabled = !button.disabled;
}

function initPomodoro() {
  toggleButton(btnStart);
  toggleButton(btnPause);

  if (btnReset.disabled) {
    toggleButton(btnReset);
  }

  inputPomodoro.disabled = true;
  console.log("AO ENTRAR NO INIT", pomodoro);
  x = setInterval(() => {
    pomodoroHeading.innerHTML = `${formatPomodoroMinutes(
      convertTime(pomodoro, "m")
    )}:${formatPomodoroSeconds(convertTime(pomodoro, "s"))}`;

    pomodoro -= 1000;
    if (pomodoro < 0) {
      clearInterval(x);
      audioAlarm.play();
      document.title = "Buzzzz!";
      pomodoro = 0;
    }
  }, 1000);
}

function reset() {
  clearInterval(x);
  inputPomodoro.disabled = false;
  pomodoroTime = parseInt(inputPomodoro.value);
  pomodoro = MINUTE * pomodoroTime;
  pomodoroHeading.innerHTML = `${formatPomodoroMinutes(
    convertTime(pomodoro, "m")
  )}:${formatPomodoroSeconds(convertTime(pomodoro, "s"))}`;
}

function formatPomodoroMinutes(minutes) {
  return minutes < 1 ? `0${minutes}` : `${minutes}`;
}

function convertTime(time, unit) {
  const SECOND = 1000; //1 second equals 1000ms
  const MINUTE = 1000 * 60; /// (SECOND * 60)

  if (unit === "m") {
    return Math.floor(time / MINUTE);
  } else if (unit === "s") {
    return Math.floor((time % MINUTE) / SECOND);
  }
}

function formatPomodoroSeconds(seconds) {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

function resetPomodoro(time) {
  pomodoro = time;
}

function stopPomodoro() {
  console.log(pomodoro + SECOND);
  /* remainingTime = pomodoro + SECOND; */
  document.querySelector(
    "#pomodoroTimer"
  ).innerHTML = `${formatPomodoroMinutes(
    convertTime(pomodoro + 1000, "m")
  )}:${formatPomodoroSeconds(convertTime(pomodoro + 1000, "s"))}`;
  clearInterval(x);
}

function getComponents() {
  btnStart = document.getElementById("btnStart");
  btnPause = document.getElementById("btnPause");
  btnReset = document.getElementById("btnReset");
  audioAlarm = document.createElement("audio");
  pomodoroHeading = document.getElementById("pomodoroTimer");
}

function setComponents() {
  audioAlarm.src = "./alarm.mp3";
  pomodoro = 0;

  toggleButton(btnStart);
  toggleButton(btnPause);
  toggleButton(btnReset);

  let inputPomodoro = document.getElementById("inputPomodoro");
  window.addEventListener("focus", () => {
    audioAlarm.pause();
  });

  inputPomodoro.addEventListener("change", e => {
    if (btnStart.disabled) {
      toggleButton(btnStart);
    }

    pomodoroTime = parseInt(e.target.value);
    pomodoro = MINUTE * pomodoroTime;
  });

  btnStart.addEventListener("click", () => {
    initPomodoro();
  });

  btnPause.addEventListener("click", () => {
    toggleButton(btnStart);
    toggleButton(btnPause);
    stopPomodoro();
  });

  btnReset.addEventListener("click", () => {
    reset();
  });
}