import { LogItem } from "../model/log";
import { Context, Properties } from "../model/properties";
import { getTimestamp } from "../utils/date";

export const logLambdaFactory = (
  properties: Properties,
  context: Context,
  flush: () => void
) => {
  return (name: string, feature?: string) => {
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
};

export const loggerFactory = (
  properties: Properties,
  context: Context,
  flush: () => void
) => {
  const log = logLambdaFactory(properties, context, flush);

  return (name: string, feature?: string) => {
    return {
      log: () => {
        log(name, feature);
      },
    };
  };
};
