import { LogItem } from "../model/log";
import { Context, Properties } from "../model/properties";
import { getTimestamp } from "../utils/date";

export const loggerFactory = (
  properties: Properties,
  context: Context,
  flush: () => void
) => {
  return (name: string, feature?: string) => {
    const log = () => {
      const item: LogItem = {
        name: name,
        feature: feature,
        createdAt: getTimestamp(),
      };

      context.dataStore.addEvent(item);

      if (properties.autoFlush) {
        flush();
      }
    };

    return {
      log: log,
    };
  };
};
