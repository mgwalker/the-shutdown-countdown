let blinkyTimer;
export const doBlinky = () => {
  let on = false;
  const imgs = new Map([
    [false, "crawler-1.png"],
    [true, "crawler-2.png"],
  ]);

  if (!blinkyTimer) {
    const img = document.querySelector("#crawler");
    blinkyTimer = setInterval(() => {
      on = !on;
      img.src = `img/${imgs.get(on)}`;
    }, 1000);
  }
};

export const stopBlinky = () => {
  clearInterval(blinkyTimer);
};
