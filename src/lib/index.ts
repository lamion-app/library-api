import { Properties, Context } from "../model/properties";
import { logLambdaFactory, loggerFactory } from "../lib/logger";
import { errorRecorderFactory } from "../lib/error";
import { flush } from "../lib/flush";

export const useLamion = (props: Properties) => {
  if (!props.accessKey) {
    throw new Error("Access key not specified!");
  }

  if (!props.meta.clientId && !props.meta.identifyKey) {
    throw new Error("One of clientId and identifyKey must be specified!");
  }

  const context: Context = {
    dataStore: props.createStore(),
    device: props.meta.device(),
  };

  const flushImpl = flush.bind(undefined, props, context);

  return {
    logEvent: logLambdaFactory(props, context, flushImpl),
    useLogger: loggerFactory(props, context, flushImpl),
    recordError: errorRecorderFactory(props, context, flushImpl),
    flush: flushImpl,
  };
};
