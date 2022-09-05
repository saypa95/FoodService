function timer(timerSelector, deadline) {

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const remainingTime = Date.parse(endTime) - Date.parse(new Date());

    if (remainingTime <= 0) {
      days = hours = minutes = seconds = 0;
    } else {
      days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      seconds = Math.floor((remainingTime / 1000) % 60);
    }

    return {
      total: remainingTime,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = `0${t.days}`.slice(-2);
      hours.innerHTML = `0${t.hours}`.slice(-2);
      minutes.innerHTML = `0${t.minutes}`.slice(-2);
      seconds.innerHTML = `0${t.seconds}`.slice(-2);

      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock(timerSelector, deadline);
}

export default timer;

