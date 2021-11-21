import { doBlinky, stopBlinky } from "./blinky.js";
import { doExhaust, stopExhaust } from "./exhaust.js";
import { timeUntilShutdown } from "./time.js";

const ROCKET_DAYS = 7;

const cssRule = Array.from(document.styleSheets[0].cssRules).find(
  (r) => r.selectorText === ".show-rocket"
);

const updateRocket = () => {
  const until = timeUntilShutdown();
  const days = until.asDays();

  if (days <= ROCKET_DAYS) {
    cssRule.style.display = "initial";
    doBlinky();

    // The rocket should reach the tower halfway through the last day
    const halfth = ROCKET_DAYS - 0.5;
    const distance = Math.min((ROCKET_DAYS - days) / halfth, 1);

    const { offsetWidth: rocketWidth } = document.querySelector("#rocket");

    const left = distance * (document.body.offsetWidth - rocketWidth);
    document.querySelector("#rocket-stack").style.left = `${left}px`;

    if (until.asHours() < 12) {
      doExhaust();
    }
    if (days < 0) {
      stopExhaust();
      document.querySelector("#rocket").setAttribute("class", "fallen");
    }
  } else {
    stopBlinky();
    stopExhaust();
    cssRule.style.display = "none";
  }
};

updateRocket();
setInterval(updateRocket, 5_000);

window.addEventListener("resize", updateRocket);
