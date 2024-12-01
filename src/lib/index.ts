import { AccessProperties, DefaultProperties } from "../model/properties";
import { Logger } from "../lib/logger";
import { recordError } from "../lib/error";
import { flush } from "../lib/flush";

export const useLamion = (props: Partial<AccessProperties>) => {
  const resultProps = { ...DefaultProperties, ...props } as AccessProperties;

  if (!resultProps.key) {
    throw new Error("Access key not specified!");
  }

  if (!resultProps.clientId && !resultProps.identifyKey) {
    throw new Error("One of clientId and identifyKey must be specified!");
  }

  return {
    useLogger: Logger.bind(undefined, resultProps),
    recordError: recordError.bind(undefined, resultProps),
    flush: flush.bind(undefined, resultProps),
  };
};
