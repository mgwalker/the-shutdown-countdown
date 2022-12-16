import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/dayjs.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/plugin/duration.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/plugin/timezone.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/plugin/utc.min.js";

const SHUTDOWN_DATE = "2022-12-23";
const TIMEZONE = "America/New_York";

window.dayjs.extend(window.dayjs_plugin_utc);
window.dayjs.extend(window.dayjs_plugin_duration);
window.dayjs.extend(window.dayjs_plugin_timezone);

export default window.dayjs;

export const now = () => dayjs.tz(dayjs(), TIMEZONE);

const shutdown = dayjs.tz(`${SHUTDOWN_DATE}T00:00:00`, TIMEZONE);
export const timeUntilShutdown = () => dayjs.duration(shutdown.diff(now()));

export { SHUTDOWN_DATE, TIMEZONE };
