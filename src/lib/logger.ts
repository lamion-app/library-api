import { LogItem } from "../model/log";
import { AccessProperties } from "../model/properties";
import { dataStorage } from "../repository/store";
import { getTimestamp } from "../utils/date";
import { flush } from "../lib/flush";

export const Logger = (
  properties: AccessProperties,
  name: string,
  feature?: string
) => {
  const logEvent = () => {
    const item: LogItem = {
      name: name,
      feature: feature,
      createdAt: getTimestamp(),
    };

    dataStorage.addEvent(item);

    if (properties.autoFlush) {
      flush(properties);
    }
  };

  return {
    log: logEvent,
  };
};
