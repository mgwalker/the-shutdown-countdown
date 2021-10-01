import dayjs from "./dayjs.js";

const s = (v) => (v === 1 ? `` : `s`);

const what = document.getElementById("what");
const when = document.getElementById("when");

const messages = new Map([
  [true, "The US government has been shut down for"],
  [false, "The next US government shut down could occur in"],
]);

const run = (shutdown) => {
  const now = dayjs();
  const timeBetween = dayjs.duration(now.diff(shutdown));

  const fractionalDays = Math.abs(timeBetween.asDays());
  const days = Math.floor(fractionalDays);
  let remainder = 24 * (fractionalDays - days);
  const hours = Math.floor(remainder);
  remainder = 60 * (remainder - hours);
  const minutes = Math.floor(remainder);
  const seconds = Math.round(60 * (remainder - minutes));

  // Squash the units into pluralized strings
  const times = [
    ["day", days],
    ["hour", hours],
    ["minute", minutes],
    ["second", seconds],
  ].map(([u, v]) => `${v} ${u}${s(v)}`);

  // If there is more than one unit of time remaining, prepend "and" to the
  // front of the last one, so we get a nice comma'ed list
  if (times.length > 1) {
    times[times.length - 1] = `and ${times[times.length - 1]}`;
  }

  // If there are only two units of time, we can just cram them together, but
  // otherwise we need to Oxford-commatize it. Then when string is always the
  // same, regardless of whether the shutdown has started.
  when.innerText = times.length > 2 ? times.join(", ") : times.join(" ");

  const isShutdown = now.isAfter(shutdown);
  what.innerText = messages.get(isShutdown);
};

let interval = null;
export const updateCountdown = (shutdown) => {
  if (!interval) {
    const runner = () => {
      run(shutdown);
    };
    runner();
    interval = setInterval(runner, 50);
  }
};
