import dayjs from "./dayjs.js";
import { updateRocket } from "./rocket.js";
import { updateCountdown } from "./countdown.js";

const SHUTDOWN_DATE = "2021-12-04";
const shutdown = dayjs.tz(`${SHUTDOWN_DATE} 00:00`, "America/New_York");

updateRocket(shutdown);
updateCountdown(shutdown);
