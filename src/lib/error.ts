import { ErrorLogItem } from "../model/log";
import { Context, Properties } from "../model/properties";
import { getTimestamp } from "../utils/date";

export const errorRecorderFactory = (
  properties: Properties,
  context: Context,
  flush: () => void
) => {
  return (e: Error, name?: string) => {
    const item: ErrorLogItem = {
      text: e.stack ?? e.message ?? "error without message",
      name: name,
      createdAt: getTimestamp(),
    };

    context.dataStore.addError(item);

    if (properties.autoFlush) {
      flush();
    }
  };
};
