import { storePrefix } from "../defaults/constants";
import { ErrorLogItem, LogItem } from "../model/log";

const eventsKey = storePrefix + "lamion_events";
const errorsKey = storePrefix + "lamion_errors";

export const dataStorage = {
  events(): Array<LogItem> {
    const data = sessionStorage.getItem(eventsKey);
    if (!data) return [];

    return JSON.parse(data);
  },
  errors(): Array<ErrorLogItem> {
    const data = sessionStorage.getItem(errorsKey);
    if (!data) return [];

    return JSON.parse(data);
  },
  addEvent: (value: LogItem) => {
    const items = dataStorage.events();
    const newItems = [...items, value];

    sessionStorage.setItem(eventsKey, JSON.stringify(newItems));
  },
  addError: (value: ErrorLogItem) => {
    const items = dataStorage.errors();
    const newItems = [...items, value];

    sessionStorage.setItem(errorsKey, JSON.stringify(newItems));
  },
  clear: () => {
    sessionStorage.removeItem(eventsKey);
    sessionStorage.removeItem(errorsKey);
  },
};
