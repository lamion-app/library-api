import { ErrorLogItem, LogItem } from "../model/log";
import { UserData, DeviceInfo } from "../model/meta";

const baseUrl = "http://150.241.92.62:9000"; // TODO
const logEndpoint = baseUrl + "/v1/event/log";

export function makeLog(data: {
  accessKey: string;
  events: Array<LogItem>;
  errors: Array<ErrorLogItem>;
  user: UserData;
  device: DeviceInfo;
}) {
  if (data.events.length == 0 && data.errors.length == 0) return;

  fetch(logEndpoint, {
    method: "POST",
    headers: {
      Authorization: data.accessKey,
      "content-type": "application/json",
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
