import dayjs from "./dayjs.js";

const rocket = document.getElementById("rocket");
const tower = document.getElementById("tower");

const getRocketImage = (isShutdown, diff) => {
  // Already shutdown
  if (isShutdown) {
    return "rocket-fallen.png";
  }

  const ts = Math.round(Date.now() / 700);

  // 10 minutes away
  if (diff.hours() === 0 && diff.minutes() < 10) {
    if (ts % 4 === 0) {
      return "rocket-off.png";
    }
    return `rocket-warmup-${ts % 4}.png`;
  }

  // Longer
  return ts % 2 === 0 ? "rocket-off.png" : "rocket-on.png";
};

const getRocketLocation = (isShutdown, diff) => {
  // Account for rocket width, tower width, and some padding
  const totalWidth = window.innerWidth - (isShutdown ? 229 : 104) - 20;

  // If we're already shutdown, no need for additional calculation.
  if (isShutdown) {
    return totalWidth;
  }

  // 1440 minutes in a day (usually), but for last 60 minutes, rocket should be
  // at the tower
  const minutes = Math.round(diff.asMinutes()) - 60;
  const percent = 1 - minutes / 1440;

  return Math.min(totalWidth * percent, totalWidth);
};

const run = (shutdown) => {
  const now = dayjs();
  const timeBetween = dayjs.duration(now.diff(shutdown));
  const isShutdown = now.isAfter(shutdown);

  if (isShutdown || timeBetween.days() === 0) {
    rocket.setAttribute("src", getRocketImage(isShutdown, timeBetween));
    rocket.style.left = getRocketLocation(isShutdown, timeBetween) + "px";
    tower.setAttribute("src", "tower.png");
  }
};

let interval = null;
export const updateRocket = (shutdown) => {
  if (!interval) {
    const runner = () => {
      run(shutdown);
    };
    runner();
    interval = setInterval(runner, 100);
  }
};
