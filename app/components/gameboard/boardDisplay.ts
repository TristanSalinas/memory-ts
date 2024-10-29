export function removeAnimation(element: HTMLElement) {
  element.style.animation = "";
  element.offsetHeight; // Trick to trigger a reflow thus recalculating the style and applying animation none
}

export function removeAllPictureAnimations() {
  document.querySelectorAll(".picture").forEach((picture) => {
    removeAnimation(picture as HTMLElement);
  });
}
export function temporaryShow(element: HTMLElement) {
  removeAnimation(element);
  element.style.animation = "glimpse 1s";
  element.addEventListener("animationend", (e: AnimationEvent) => {
    (e.target as HTMLElement).style.animation = "";
  });
}

export function show(element: HTMLElement) {
  removeAnimation(element);
  element.classList.remove("opacity-0");
  element.classList.add("opacity-1");
}

export function hide(element: HTMLElement) {
  element.classList.remove("opacity-1");
  element.classList.add("opacity-0");
}
