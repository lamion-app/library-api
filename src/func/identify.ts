import fingerprint from "browser-fingerprint";
import { getCookie, setCookie } from "../utils/cookie";
import { storePrefix } from "../defaults/constants";

const cookieKey = storePrefix + "identify_key";
const cookieExpireDays = 30;

export function getIdentifyKey(): string {
  const cookie = getCookie(cookieKey);

  if (cookie) return cookie;

  const newKey = fingerprint();

  setCookie(cookieKey, newKey, cookieExpireDays);

  return newKey;
}
