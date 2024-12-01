import { makeLog } from "../func/network";
import { Context, Properties } from "../model/properties";

export const flush = async (properties: Properties, context: Context) => {
  const clientId = properties.meta.clientId
    ? await properties.meta.clientId()
    : undefined;
  const identifyKey = properties.meta.identifyKey
    ? await properties.meta.identifyKey()
    : undefined;

  if (!clientId && !identifyKey) {
    throw new Error("clientId and identifyKey are both null");
  }

  makeLog({
    accessKey: properties.accessKey,
    events: context.dataStore.events(),
    errors: context.dataStore.errors(),
    user: {
      clientId: clientId,
      identifyKey: identifyKey,
    },
    device: context.device,
  });

  context.dataStore.clear();
};
