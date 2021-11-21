const stars = [];
let twinkler;

const twinkle = () => {
  stars.forEach((star) => {
    const direction = +star.getAttribute("data-direction");
    const size = +star.getAttribute("data-size");
    const speed = +star.getAttribute("data-speed");

    const newSize = size + (direction * speed * 0.4) / 100;
    star.setAttribute("data-size", newSize);
    star.setAttribute(
      "style",
      star.getAttribute("style").replace(/: \d?\.?\d+px;/g, `: ${newSize}px;`)
    );

    if (newSize > 5 && direction > 0) {
      star.setAttribute("data-direction", -1);
    } else if (newSize < 1.5 && direction < 0) {
      star.setAttribute("data-direction", 1);
    }
  });
};

export const makeStars = () => {
  if (stars.length === 0) {
    const starField = document.getElementById("stars");
    [...Array(100)].forEach(() => {
      const star = document.createElement("div");
      star.setAttribute("class", "star");

      const x = Math.floor(Math.random() * 99);
      const y = Math.floor(Math.random() * 99);
      const size = Math.floor(Math.random() * 4) + 1.5;

      star.setAttribute(
        "style",
        `left: ${x}vw; top: ${y}vh; width: ${size}px; height: ${size}px;`
      );
      star.setAttribute("data-direction", Math.random() < 0.5 ? -1 : 1);
      star.setAttribute("data-size", size);
      star.setAttribute("data-speed", Math.floor(Math.random() * 80) + 20);
      starField.appendChild(star);

      stars.push(star);
    });

    twinkler = setInterval(twinkle, 20);
  }
};

export const removeStars = () => {
  clearInterval(twinkler);
  stars.forEach((star) => {
    star.remove();
  });
  stars.length = 0;
};
