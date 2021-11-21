import { timeUntilShutdown } from "./time.js";

const updateCountdown = () => {
  const until = timeUntilShutdown();

  // Squash the units into pluralized strings
  const times = [
    ["day", until.days()],
    ["hour", until.hours()],
    ["minute", until.minutes()],
    ["second", until.seconds()],
  ]
    .map(([u, v]) => [u, Math.abs(v)])
    .map(([u, v]) => `${v} ${u}${v === 1 ? "" : "s"}`);

  // If there is more than one unit of time remaining, prepend "and" to the
  // front of the last one, so we get a nice comma'ed list
  if (times.length > 1) {
    times[times.length - 1] = `and ${times[times.length - 1]}`;
  }

  // If there are only two units of time, we can just cram them together, but
  // otherwise we need to Oxford-commatize it. Then when string is always the
  // same, regardless of whether the shutdown has started.
  const timeString = times.length > 2 ? times.join(", ") : times.join(" ");

  const message =
    until.asSeconds() > 0
      ? "The next US government shut down could occur in"
      : "The US government has been shut down for";

  document.getElementById("until").innerText = `${message} ${timeString}`;
};

updateCountdown();
setInterval(updateCountdown, 200);
