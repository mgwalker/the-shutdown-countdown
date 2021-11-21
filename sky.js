import { makeStars, removeStars } from "./stars.js";
import { now } from "./time.js";

const computeColor = (from, to, percent) => {
  return from.map((value, i) => {
    const diff = to[i] - value;
    return value + diff * percent;
  });
};

const skyColors = [
  [0, 0, 24], // 0
  [0, 0, 24], // 1, 23
  [0, 0, 24], // 2, 22
  [34, 17, 51],
  [68, 51, 86], // 4, 20
  [119, 51, 119], // 5, 19
  [187, 136, 136], // 6, 18
  [187, 170, 221], // 7, 17
  [153, 170, 221], // 8, 16
  [0, 170, 221], // 9, 15
  [136, 221, 255], // 10, 14
  [136, 221, 255], // 11, 13
  [136, 221, 255], // 12
];
skyColors.push(...skyColors.slice(1, skyColors.length - 1).reverse());

const updateSky = () => {
  const hour = now().hour();
  const minute = now().minute();

  const color = computeColor(
    skyColors[hour],
    skyColors[(hour + 1) % 24],
    minute / 60
  );

  document.body.setAttribute(
    "style",
    `background-color: rgb(${color.join(",")});`
  );

  if (hour > 18 || hour < 6) {
    makeStars();
  } else {
    removeStars();
  }
};

updateSky();
setInterval(updateSky, 60_000);
