import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/dayjs.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/plugin/duration.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/plugin/timezone.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/plugin/utc.min.js";

window.dayjs.extend(window.dayjs_plugin_utc);
window.dayjs.extend(window.dayjs_plugin_duration);
window.dayjs.extend(window.dayjs_plugin_timezone);

export default window.dayjs;
