import { AccessProperties, DefaultProperties } from "../model/properties";
import { Logger } from "../lib/logger";
import { flush } from "../lib/flush";

export const useLamion = (props: Partial<AccessProperties>) => {
  const resultProps = { ...DefaultProperties, ...props } as AccessProperties;

  if (!resultProps.key) {
    throw new Error("Access key not specified!");
  }

  return {
    useLogger: Logger.bind(undefined, resultProps),
    flush: flush.bind(resultProps),
  };
};
