import "./style.css";

import gameScreen from "./screens/game-screen/gameScreen";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  app?.append(gameScreen());
});
