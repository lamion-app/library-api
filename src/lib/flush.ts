import { makeLog } from "../func/network";
import { AccessProperties } from "../model/properties";
import { dataStorage } from "../repository/store";
import { getDeviceName, getDevicePlatform } from "../func/device";

export const flush = async (properties: AccessProperties) => {
  const clientId = properties.clientId
    ? await properties.clientId()
    : undefined;
  const identifyKey = properties.identifyKey
    ? await properties.identifyKey()
    : undefined;

  if (!clientId && !identifyKey) {
    throw new Error("clientId and identifyKey are both null");
  }

  makeLog({
    accessKey: properties.key,
    events: dataStorage.events(),
    errors: dataStorage.errors(),
    user: {
      clientId: clientId,
      identifyKey: identifyKey,
    },
    device: {
      name: getDeviceName(),
      platform: getDevicePlatform(),
    },
  });

  dataStorage.clear();
};
