import { makeLog } from "../func/network";
import { AccessProperties } from "../model/properties";
import { dataStorage } from "../repository/store";
import { getDeviceName, getDevicePlatform } from "../func/device";

export const flush = async (properties: AccessProperties) => {
  makeLog({
    accessKey: properties.key,
    events: dataStorage.events(),
    errors: dataStorage.errors(),
    user: {
      clientId: await properties.clientId(),
      identifyKey: await properties.identifyKey(),
    },
    device: {
      name: getDeviceName(),
      platform: getDevicePlatform(),
    },
  });

  dataStorage.clear();
};
