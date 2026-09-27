"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LocateFixed } from "lucide-react";
import type { Map as LMap, LayerGroup } from "leaflet";
import { useDict } from "@/components/providers";
import { useOnline } from "@/lib/use-browser";

export interface MapPoint {
  id: string;
  name: string;
  sub: string;
  lat: number;
  lng: number;
  group: string;
  href?: string;
  route?: string;
}

export interface MapGroup {
  id: string;
  label: string;
  color: string;
}

export interface MapZone {
  id: string;
  kind: string;
  name: string;
  note?: string;
  polygon?: [number, number][];
  point?: [number, number];
}

/** Base map tiles. Change here to use another provider. */
const TILES = {
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const ZONE_COLORS: Record<string, string> = {
  allowed: "#5f7457", forbidden: "#b33a2e", shallow: "#c9a36a", danger: "#b8643f", mooring: "#2f7f8b", poi: "#134656",
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const homeSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>`;

export function MapView({ points = [], groups = [], home, zones = [], className = "", showList = true }: {
  points?: MapPoint[];
  groups?: MapGroup[];
  home?: { lat: number; lng: number; label: string; placeholder?: boolean };
  zones?: MapZone[];
  className?: string;
  showList?: boolean;
}) {
  const { t } = useDict();
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const [active, setActive] = useState<string>("all");
  const [ready, setReady] = useState(false);
  const offline = !useOnline();

  const visible = useMemo(() => (active === "all" ? points : points.filter((p) => p.group === active)), [points, active]);
  const colorOf = (g: string) => groups.find((x) => x.id === g)?.color ?? "#134656";

  useEffect(() => {
    let disposed = false;
    import("leaflet").then((L) => {
      if (disposed || !el.current || map.current) return;
      const m = L.map(el.current, { zoomControl: false, attributionControl: true, scrollWheelZoom: false }).setView([12.17, -68.28], 11);
      L.control.zoom({ position: "bottomright" }).addTo(m);
      L.tileLayer(TILES.url, { attribution: TILES.attribution, maxZoom: 18, subdomains: "abcd" }).addTo(m);
      zones.forEach((z) => {
        const color = ZONE_COLORS[z.kind] ?? "#134656";
        const popup = `<b>${esc(z.name)}</b>${z.note ? `<br/>${esc(z.note)}` : ""}`;
        if (z.polygon?.length) L.polygon(z.polygon, { color, weight: 2, fillOpacity: 0.18 }).bindPopup(popup).addTo(m);
        else if (z.point) L.circleMarker(z.point, { radius: 8, color: "#fff", weight: 2, fillColor: color, fillOpacity: 1 }).bindPopup(popup).addTo(m);
      });
      if (home) {
        const icon = L.divIcon({ className: "", html: `<div class="kd-pin" style="width:40px;height:40px;background:#0d3642">${homeSvg}</div>`, iconSize: [40, 40], iconAnchor: [20, 20] });
        L.marker([home.lat, home.lng], { icon, zIndexOffset: 1000, title: home.label }).bindPopup(`<b>${esc(home.label)}</b>`).addTo(m);
      }
      layer.current = L.layerGroup().addTo(m);
      map.current = m;
      setReady(true);
    });
    return () => {
      disposed = true;
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    import("leaflet").then((L) => {
      const g = layer.current!;
      g.clearLayers();
      const bounds: [number, number][] = [];
      visible.forEach((p) => {
        const icon = L.divIcon({ className: "", html: `<div class="kd-pin" style="width:26px;height:26px;background:${colorOf(p.group)}"></div>`, iconSize: [26, 26], iconAnchor: [13, 13] });
        const links = [
          p.href ? `<a href="${esc(p.href)}" style="font-weight:600;color:#1b5a6a">${esc(t.map.details)} →</a>` : "",
          p.route ? `<a href="${esc(p.route)}" target="_blank" rel="noopener" style="font-weight:600;color:#1b5a6a">${esc(t.common.route)} ↗</a>` : "",
        ].filter(Boolean).join("&nbsp;&nbsp;");
        L.marker([p.lat, p.lng], { icon, title: p.name })
          .bindPopup(`<div style="min-width:10rem"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#7a8589">${esc(p.sub)}</div><div style="font-family:var(--font-display);font-size:17px;margin:2px 0 6px">${esc(p.name)}</div>${links}</div>`)
          .addTo(g);
        bounds.push([p.lat, p.lng]);
      });
      if (home) bounds.push([home.lat, home.lng]);
      zones.forEach((z) => z.polygon?.forEach((c) => bounds.push(c)));
      if (bounds.length > 1) map.current?.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, visible]);

  const locate = () => {
    map.current?.locate({ setView: true, maxZoom: 14 });
  };

  return (
    <div className={className}>
      {groups.length > 0 && (
        <div className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1" role="group">
          {[{ id: "all", label: t.common.all, color: "#0d3642" }, ...groups].map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={active === g.id}
              onClick={() => setActive(g.id)}
              className={`chip shadow-[var(--shadow-soft)] ${active === g.id ? "bg-ocean-800 text-white" : "bg-white text-ink-soft"}`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} aria-hidden />
              {g.label}
            </button>
          ))}
        </div>
      )}
      <div className="relative overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-soft)]">
        <div ref={el} className="h-[62svh] min-h-[22rem] w-full bg-ocean-100" role="application" aria-label={t.map.title} />
        {!ready && <div className="absolute inset-0 animate-pulse bg-ocean-100" aria-hidden />}
        <button type="button" onClick={locate} className="glass absolute left-3 top-3 z-[500] inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-xs font-semibold shadow-[var(--shadow-soft)]">
          <LocateFixed className="h-4 w-4" aria-hidden /> {t.map.locate}
        </button>
      </div>
      {offline && <p className="mt-3 rounded-2xl bg-sand-100 p-3 text-sm text-ink-soft">{t.map.offline}</p>}
      {home?.placeholder && <p className="mt-3 text-xs text-muted">⌂ {t.map.homePlaceholder}</p>}

      {showList && (
        <ul className="mt-6 space-y-2">
          {visible.map((p) => (
            <li key={p.id}>
              <Link href={p.href ?? "#"} className="card flex min-h-14 items-center gap-3 px-4 py-2.5">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: colorOf(p.group) }} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{p.name}</span>
                  <span className="block truncate text-xs text-muted">{p.sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
