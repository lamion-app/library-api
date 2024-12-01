import { ErrorLogItem } from "../model/log";
import { AccessProperties } from "../model/properties";
import { dataStorage } from "../repository/store";
import { getTimestamp } from "../utils/date";
import { flush } from "../lib/flush";

export const recordError = (
  properties: AccessProperties,
  e: Error,
  name?: string
) => {
  const item: ErrorLogItem = {
    text: `${e.message}\n${e.stack}`,
    name: name,
    createdAt: getTimestamp(),
  };

  dataStorage.addError(item);

  if (properties.autoFlush) {
    flush(properties);
  }
};
