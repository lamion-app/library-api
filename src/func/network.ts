import { ErrorLogItem, LogItem } from "../model/log";

interface UserData {
  clientId?: string;
  identifyKey?: string;
}

interface DeviceData {
  name: string;
  platform: string;
}

export function makeLog(data: {
  accessKey: string;
  events: Array<LogItem>;
  errors: Array<ErrorLogItem>;
  user: UserData;
  device: DeviceData;
}) {
  fetch("TODO", {
    method: "POST",
    headers: {
      Authorization: data.accessKey,
    },
    body: JSON.stringify({
      device: {
        name: data.device.name,
        platform: data.device.platform,
      },
      user: {
        clientKey: data.user.clientId,
        deviceKey: data.user.identifyKey,
      },
      events: data.events.map((x) => ({
        function: x.name,
        feature: x.feature,
        createdAt: x.createdAt,
      })),
      errors: data.errors.map((x) => ({
        function: x.name,
        text: x.text,
        createdAt: x.createdAt,
      })),
    }),
  });
}
