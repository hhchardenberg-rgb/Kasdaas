import { createHash } from "node:crypto";
import { hasValue, tx } from "@/lib/i18n";
import { wifi } from "@/content/house/stay";

/**
 * iPhone/iPad "tap to connect": an Apple configuration profile containing only
 * the villa's WiFi network. Safari offers to download it; after installing it
 * in Settings the device joins the network automatically.
 */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Stable UUID derived from a seed, so re-downloading replaces the same profile. */
function uuid(seed: string) {
  const h = createHash("sha256").update(seed).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`.toUpperCase();
}

export function GET() {
  if (!hasValue(wifi.network)) return new Response("Not found", { status: 404 });
  const ssid = tx(wifi.network, "en");
  const password = hasValue(wifi.password) ? tx(wifi.password, "en") : "";
  const encryption = wifi.security === "nopass" ? "None" : wifi.security === "WEP" ? "WEP" : "WPA";
  const seed = `kasdaas-wifi-${ssid}`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>AutoJoin</key><true/>
      <key>EncryptionType</key><string>${encryption}</string>
      <key>HIDDEN_NETWORK</key><false/>
      ${password ? `<key>Password</key><string>${esc(password)}</string>` : ""}
      <key>SSID_STR</key><string>${esc(ssid)}</string>
      <key>PayloadDisplayName</key><string>WiFi ${esc(ssid)}</string>
      <key>PayloadIdentifier</key><string>com.kasdaas.wifi.network</string>
      <key>PayloadType</key><string>com.apple.wifi.managed</string>
      <key>PayloadUUID</key><string>${uuid(seed + "-network")}</string>
      <key>PayloadVersion</key><integer>1</integer>
    </dict>
  </array>
  <key>PayloadDescription</key><string>WiFi Kas Daas · ${esc(ssid)}</string>
  <key>PayloadDisplayName</key><string>Kas Daas WiFi</string>
  <key>PayloadIdentifier</key><string>com.kasdaas.wifi</string>
  <key>PayloadOrganization</key><string>Kas Daas</string>
  <key>PayloadRemovalDisallowed</key><false/>
  <key>PayloadType</key><string>Configuration</string>
  <key>PayloadUUID</key><string>${uuid(seed)}</string>
  <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/x-apple-aspen-config",
      "Content-Disposition": 'inline; filename="KasDaas-WiFi.mobileconfig"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
