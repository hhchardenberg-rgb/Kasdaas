import "server-only";
import QRCode from "qrcode";

export async function qrSvg(data: string, dark = "#0d3642"): Promise<string> {
  return QRCode.toString(data, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark, light: "#ffffff" } });
}

/** Standard WiFi QR payload (scanned natively by iOS and Android cameras). */
export function wifiPayload(ssid: string, password: string, security: "WPA" | "WEP" | "nopass") {
  const esc = (s: string) => s.replace(/([\;,:"])/g, "\\$1");
  return `WIFI:T:${security};S:${esc(ssid)};${security === "nopass" ? "" : `P:${esc(password)};`};`;
}
