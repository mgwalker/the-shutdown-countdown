let exhaustTimer;
const exhaustNode = document.querySelector("img.exhaust");
exhaustNode.remove();

export const doExhaust = () => {
  if (!exhaustTimer) {
    const stack = document.getElementById("rocket-stack");

    const run = () => {
      const exhaust = exhaustNode.cloneNode();
      stack.appendChild(exhaust);
      setTimeout(() => {
        exhaust.setAttribute("class", "exhaust animate");
      }, 1);
      setTimeout(() => {
        exhaust.remove();
      }, 3200);
    };

    run();
    exhaustTimer = setInterval(run, 700);
  }
};
export const stopExhaust = () => {
  clearInterval(exhaustTimer);
};
