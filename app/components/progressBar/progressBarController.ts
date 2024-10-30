import "./progressBar.css";

export function progressBarController(duration: number) {
  const barContainer = document.createElement("div");
  barContainer.classList.add("bar-container");
  const bar = document.createElement("div");
  bar.classList.add("bar");
  barContainer.append(bar);

  const timer = document.createElement("p");
  timer.classList.add("timer");
  barContainer.append(timer);
  let timeLeft = duration / 1000;
  function actualiseTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const timerEndEvent = new CustomEvent("timerEnd");

  const startTimer = () => {
    bar.style.width = "100%";
    barContainer.style.setProperty("--color", "green");
    let width = 100;

    const fillInterval = setInterval(() => {
      timeLeft--;
      actualiseTimer();
      width -= 100 / (duration / 1000);
      bar.style.width = width + "%";
      if (width <= 0) {
        bar.style.width = 0 + "%";
        clearInterval(fillInterval);
        barContainer.dispatchEvent(timerEndEvent);
      } else if (width <= 25) {
        barContainer.style.setProperty("--color", "red");
      } else if (width <= 55) {
        barContainer.style.setProperty("--color", "yellow");
      }
    }, 1000);
  };

  const getProgresssBar = () => {
    return barContainer;
  };

  return { startTimer, getProgresssBar };
}
