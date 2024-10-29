import "./progressBar.css";

export function progressBarController(duration: number) {
  const barContainer = document.createElement("div");
  barContainer.classList.add("bar-container");
  const bar = document.createElement("div");
  bar.classList.add("bar");
  barContainer.append(bar);

  const timerEndEvent = new CustomEvent("timerEnd");

  const startTimer = () => {
    bar.style.width = "100%";
    barContainer.style.setProperty("--color", "green");
    let width = 100;

    const fillInterval = setInterval(() => {
      console.log(width);
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
