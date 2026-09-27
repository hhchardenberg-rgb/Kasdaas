import type { ArtVariant } from "@/lib/types";

/**
 * Quiet, art-directed illustrations used until real photography is added.
 * Pure inline SVG: no network, works offline, scales to any card.
 */
export function SceneArt({ variant, uid, className }: { variant: ArtVariant; uid: string; className?: string }) {
  const id = (s: string) => `${uid}-${s}`.replace(/[^a-zA-Z0-9_-]/g, "");
  const u = (s: string) => `url(#${id(s)})`;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden role="presentation">
      {renderScene(variant, id, u)}
    </svg>
  );
}

type F = (s: string) => string;

function lin(id: string, stops: [string, string][], x2 = 0, y2 = 1) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
    </linearGradient>
  );
}

function Waves({ y, color, opacity = 0.35, n = 4, gap = 14 }: { y: number; color: string; opacity?: number; n?: number; gap?: number }) {
  return (
    <g stroke={color} strokeOpacity={opacity} fill="none" strokeWidth="1.2" strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${-20 + i * 37} ${y + i * gap} q 25 -6 50 0 t 50 0 t 50 0`} />
      ))}
    </g>
  );
}

function renderScene(v: ArtVariant, id: F, u: F) {
  switch (v) {
    case "sunset":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#f5e3cc"], ["0.55", "#eab08c"], ["1", "#d9805f"]])}
            {lin(id("sea"), [["0", "#56607a"], ["1", "#1d2c3c"]])}
          </defs>
          <rect width="400" height="190" fill={u("sky")} />
          <circle cx="250" cy="190" r="46" fill="#fbe7c4" />
          <rect y="190" width="400" height="110" fill={u("sea")} />
          <g fill="#fbe7c4" opacity="0.55">
            <rect x="222" y="200" width="56" height="3" rx="1.5" />
            <rect x="232" y="214" width="36" height="2.5" rx="1.25" />
            <rect x="240" y="228" width="20" height="2" rx="1" />
          </g>
        </>
      );
    case "reef":
      return (
        <>
          <defs>{lin(id("w"), [["0", "#58a9ad"], ["0.5", "#1e6c78"], ["1", "#0b3440"]])}</defs>
          <rect width="400" height="300" fill={u("w")} />
          <g fill="#fff" opacity="0.08">
            <polygon points="60,0 110,0 40,300 0,300" />
            <polygon points="190,0 225,0 170,300 130,300" />
            <polygon points="300,0 330,0 330,300 280,300" />
          </g>
          <g fill="#0a2d36" opacity="0.85">
            <path d="M0 300 V250 q20 -40 40 -10 q10 -30 30 -5 q15 -20 30 10 q20 -35 45 0 V300Z" />
            <path d="M240 300 V262 q15 -30 35 -8 q12 -26 32 0 q20 -40 45 -6 q20 -20 48 4 V300Z" />
          </g>
          <g fill="#e9c38f" opacity="0.9">
            <ellipse cx="210" cy="140" rx="7" ry="3" /><ellipse cx="226" cy="150" rx="6" ry="2.6" /><ellipse cx="198" cy="156" rx="5" ry="2.2" />
          </g>
          <g fill="#fff" opacity="0.35"><circle cx="120" cy="90" r="2" /><circle cx="126" cy="70" r="1.5" /><circle cx="118" cy="52" r="1" /></g>
        </>
      );
    case "beach":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#e7f0ef"], ["1", "#f7f2e8"]])}
            {lin(id("sea"), [["0", "#5fb3b4"], ["1", "#9fd3cc"]])}
          </defs>
          <rect width="400" height="130" fill={u("sky")} />
          <rect y="130" width="400" height="80" fill={u("sea")} />
          <path d="M0 196 C 120 176, 260 214, 400 186 V300 H0Z" fill="#efe3cf" />
          <path d="M0 196 C 120 176, 260 214, 400 186" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" fill="none" />
          <circle cx="330" cy="62" r="18" fill="#fff6e3" />
        </>
      );
    case "sea":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#dfe9e8"], ["1", "#f6f1e8"]])}
            {lin(id("sea"), [["0", "#3f8f98"], ["1", "#12495a"]])}
          </defs>
          <rect width="400" height="160" fill={u("sky")} />
          <rect y="160" width="400" height="140" fill={u("sea")} />
          <Waves y={190} color="#fff" opacity={0.25} n={5} gap={18} />
          <circle cx="90" cy="96" r="22" fill="#fff7e8" />
        </>
      );
    case "wind":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#e3eeee"], ["1", "#f7f2e8"]])}
            {lin(id("sea"), [["0", "#8fd0c8"], ["1", "#3c9aa0"]])}
          </defs>
          <rect width="400" height="150" fill={u("sky")} />
          <rect y="150" width="400" height="150" fill={u("sea")} />
          <g>
            <path d="M120 150 L120 72 L158 146Z" fill="#b8643f" />
            <path d="M250 158 L250 96 L280 154Z" fill="#f2e2c4" />
            <path d="M310 150 L310 110 L330 148Z" fill="#134656" opacity="0.8" />
          </g>
          <Waves y={200} color="#fff" opacity={0.35} n={4} gap={20} />
        </>
      );
    case "boat":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#e4eeee"], ["1", "#f7f2e8"]])}
            {lin(id("sea"), [["0", "#2f8791"], ["1", "#0d3642"]])}
          </defs>
          <rect width="400" height="150" fill={u("sky")} />
          <rect y="150" width="400" height="150" fill={u("sea")} />
          <path d="M140 196 L292 196 L276 216 L158 216Z" fill="#fbf8f3" />
          <rect x="196" y="176" width="46" height="20" rx="4" fill="#fbf8f3" />
          <rect x="204" y="181" width="30" height="8" rx="2" fill="#134656" opacity="0.5" />
          <path d="M140 218 C 100 222, 60 230, 0 234" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" fill="none" />
          <path d="M150 226 C 110 232, 70 244, 0 252" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" fill="none" />
        </>
      );
    case "villa":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#cfe3e2"], ["1", "#f4efe6"]])}
            {lin(id("pool"), [["0", "#7cc5c3"], ["1", "#2f8b93"]])}
          </defs>
          <rect width="400" height="300" fill={u("sky")} />
          <rect x="40" y="96" width="210" height="120" fill="#f3ece1" />
          <rect x="200" y="62" width="160" height="154" fill="#faf6ef" />
          <rect x="40" y="90" width="210" height="8" fill="#e6dccd" />
          <rect x="196" y="56" width="168" height="8" fill="#ebe2d4" />
          <rect x="70" y="130" width="46" height="86" fill="#2c3b40" opacity="0.8" />
          <rect x="132" y="130" width="46" height="86" fill="#2c3b40" opacity="0.8" />
          <rect x="228" y="100" width="104" height="60" fill="#2c3b40" opacity="0.75" />
          <rect x="0" y="216" width="400" height="84" fill="#e9dfcf" />
          <rect x="60" y="232" width="280" height="44" rx="3" fill={u("pool")} />
          <Waves y={246} color="#fff" opacity={0.35} n={3} gap={8} />
          <path d="M300 216 L400 170 V216Z" fill="#000" opacity="0.04" />
        </>
      );
    case "pool":
      return (
        <>
          <defs>{lin(id("w"), [["0", "#8fd3cf"], ["1", "#2c8a92"]], 1, 1)}</defs>
          <rect width="400" height="300" fill="#efe6d8" />
          <rect x="36" y="30" width="328" height="240" rx="6" fill={u("w")} />
          <g stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" fill="none">
            <path d="M50 80 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0" />
            <path d="M40 140 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0" />
            <path d="M50 200 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0" />
          </g>
          <rect x="36" y="30" width="328" height="240" rx="6" fill="none" stroke="#faf6ef" strokeWidth="10" />
        </>
      );
    case "terrace":
      return (
        <>
          <defs>{lin(id("sky"), [["0", "#d5e7e6"], ["1", "#f4efe6"]])}</defs>
          <rect width="400" height="150" fill={u("sky")} />
          <rect y="118" width="400" height="32" fill="#4c9aa1" opacity="0.7" />
          <rect y="150" width="400" height="150" fill="#ece2d2" />
          <g fill="#000" opacity="0.06">
            {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${i * 60 - 40} 150 l40 0 l-80 150 l-40 0z`} />)}
          </g>
          <rect x="70" y="196" width="130" height="18" rx="9" fill="#faf6ef" />
          <rect x="70" y="214" width="8" height="26" fill="#b08d57" />
          <rect x="192" y="214" width="8" height="26" fill="#b08d57" />
          <rect x="250" y="190" width="80" height="50" rx="10" fill="#faf6ef" />
          <circle cx="360" cy="176" r="14" fill="#5f7457" opacity="0.8" />
        </>
      );
    case "shower":
      return (
        <>
          <rect width="400" height="300" fill="#efe7da" />
          <g fill="#5f7457" opacity="0.18">
            <path d="M0 0 C60 40 80 120 30 190 C 70 120 40 60 0 30Z" />
            <path d="M400 20 C330 70 320 150 360 230 C 310 160 330 90 400 60Z" />
          </g>
          <rect x="196" y="40" width="6" height="210" fill="#8a8f8f" />
          <rect x="160" y="40" width="42" height="6" rx="3" fill="#8a8f8f" />
          <rect x="140" y="44" width="42" height="10" rx="5" fill="#6f7575" />
          <g stroke="#2f7f8b" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round">
            {Array.from({ length: 9 }, (_, i) => <line key={i} x1={146 + i * 4} y1={64 + (i % 3) * 8} x2={140 + i * 5} y2={120 + (i % 4) * 14} />)}
          </g>
          <rect y="250" width="400" height="50" fill="#dccdb6" />
          <g fill="#c7b193">{Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 42} y="250" width="2" height="50" />)}</g>
        </>
      );
    case "interior":
      return (
        <>
          <rect width="400" height="300" fill="#f1e9dd" />
          <path d="M150 260 V120 a50 50 0 0 1 100 0 V260Z" fill="#cfe4e3" />
          <rect x="150" y="190" width="100" height="70" fill="#3d8f97" opacity="0.8" />
          <path d="M150 260 V120 a50 50 0 0 1 100 0 V260" fill="none" stroke="#e3d7c5" strokeWidth="10" />
          <rect y="260" width="400" height="40" fill="#e2d5c1" />
          <rect x="30" y="206" width="100" height="40" rx="12" fill="#faf6ef" />
          <rect x="30" y="238" width="100" height="22" rx="6" fill="#e6dccd" />
          <rect x="290" y="170" width="60" height="90" rx="30" fill="#5f7457" opacity="0.3" />
        </>
      );
    case "nature":
      return (
        <>
          <defs>{lin(id("sky"), [["0", "#e4eeed"], ["1", "#f6efe2"]])}</defs>
          <rect width="400" height="300" fill={u("sky")} />
          <path d="M0 200 C 80 150, 150 170, 220 140 C 290 110, 350 150, 400 130 V300 H0Z" fill="#d9c7a6" />
          <path d="M0 240 C 100 210, 200 250, 400 214 V300 H0Z" fill="#c7ad84" />
          <g fill="#5f7457">
            <rect x="84" y="150" width="10" height="94" rx="5" /><rect x="72" y="180" width="8" height="40" rx="4" /><rect x="98" y="170" width="8" height="46" rx="4" />
            <rect x="300" y="170" width="9" height="64" rx="4.5" /><rect x="290" y="190" width="7" height="30" rx="3.5" />
            <rect x="200" y="196" width="7" height="44" rx="3.5" />
          </g>
          <circle cx="320" cy="64" r="20" fill="#fff4dc" />
        </>
      );
    case "food":
      return (
        <>
          <rect width="400" height="300" fill="#efe5d6" />
          <g fill="#000" opacity="0.05">{Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 36} y="0" width="1" height="300" />)}</g>
          <circle cx="150" cy="150" r="82" fill="#fbf8f3" />
          <circle cx="150" cy="150" r="60" fill="none" stroke="#e7dccb" strokeWidth="2" />
          <path d="M112 150 q38 -40 76 0 q-38 30 -76 0z" fill="#d98d6b" />
          <circle cx="140" cy="176" r="8" fill="#6f8a5f" /><circle cx="166" cy="172" r="6" fill="#6f8a5f" />
          <circle cx="300" cy="96" r="30" fill="#fff" opacity="0.8" /><circle cx="300" cy="96" r="22" fill="#e8c46b" opacity="0.5" />
          <circle cx="298" cy="210" r="18" fill="#9cc56b" /><circle cx="298" cy="210" r="13" fill="#d7eab6" />
          <rect x="258" y="130" width="6" height="110" rx="3" fill="#b08d57" opacity="0.6" />
        </>
      );
    case "coffee":
      return (
        <>
          <rect width="400" height="300" fill="#ede3d3" />
          <circle cx="200" cy="150" r="78" fill="#fbf8f3" />
          <circle cx="200" cy="150" r="46" fill="#fff" stroke="#e7dccb" strokeWidth="3" />
          <circle cx="200" cy="150" r="36" fill="#6b4630" />
          <path d="M186 146 q14 -16 28 0 q-14 14 -28 0z" fill="#d9b58f" />
          <path d="M246 150 h26 a10 10 0 0 1 0 20 h-26" fill="none" stroke="#fff" strokeWidth="8" />
          <circle cx="70" cy="70" r="14" fill="#b08d57" opacity="0.4" /><circle cx="340" cy="250" r="20" fill="#b08d57" opacity="0.25" />
        </>
      );
    case "town":
      return (
        <>
          <rect width="400" height="300" fill="#e7efee" />
          {[
            ["#f0d58f", 0, 110], ["#e6a58a", 80, 90], ["#9fcfc9", 160, 120], ["#f3ece1", 240, 100], ["#d7b9d2", 320, 115],
          ].map(([c, x, y]) => (
            <g key={String(x)}>
              <rect x={x as number} y={y as number} width="80" height={300 - (y as number)} fill={c as string} />
              <rect x={(x as number) + 14} y={(y as number) + 28} width="18" height="28" rx="2" fill="#fff" opacity="0.65" />
              <rect x={(x as number) + 48} y={(y as number) + 28} width="18" height="28" rx="2" fill="#fff" opacity="0.65" />
              <rect x={(x as number) + 28} y={(y as number) + 90} width="24" height="60" rx="2" fill="#2c3b40" opacity="0.35" />
            </g>
          ))}
          <rect y="262" width="400" height="38" fill="#d9ccb6" />
        </>
      );
    case "salt":
      return (
        <>
          <defs>
            {lin(id("sky"), [["0", "#d8e8ec"], ["1", "#f7efe9"]])}
            {lin(id("pink"), [["0", "#f1c7c4"], ["1", "#e4a7a6"]])}
          </defs>
          <rect width="400" height="170" fill={u("sky")} />
          <rect y="170" width="400" height="130" fill={u("pink")} />
          <path d="M230 170 L286 108 L342 170Z" fill="#fbf8f3" />
          <path d="M286 108 L342 170 H300Z" fill="#e8e0d6" />
          <g stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5">
            <line x1="0" y1="200" x2="400" y2="196" /><line x1="0" y1="236" x2="400" y2="230" /><line x1="0" y1="270" x2="400" y2="264" />
          </g>
        </>
      );
    case "flamingo":
      return (
        <>
          <defs>{lin(id("w"), [["0", "#f2e4e0"], ["1", "#d4e6e5"]])}</defs>
          <rect width="400" height="300" fill={u("w")} />
          <rect y="170" width="400" height="130" fill="#b9d8d7" opacity="0.6" />
          {[[120, 150], [170, 160], [250, 146]].map(([x, y]) => (
            <g key={x} fill="none" stroke="#e38d8b" strokeLinecap="round">
              <ellipse cx={x} cy={y} rx="14" ry="8" fill="#e9a3a0" stroke="none" />
              <path d={`M${x + 10} ${y - 4} q 10 -26 -2 -34 q -6 -2 -8 4`} strokeWidth="3" />
              <line x1={x} y1={y + 8} x2={x} y2={y + 36} strokeWidth="1.5" />
            </g>
          ))}
          <Waves y={210} color="#fff" opacity={0.5} n={3} gap={22} />
        </>
      );
    case "night":
      return (
        <>
          <defs>{lin(id("sky"), [["0", "#0d2530"], ["1", "#1f4a57"]])}</defs>
          <rect width="400" height="300" fill={u("sky")} />
          <g fill="#fff">
            {[[40, 40], [90, 80], [150, 30], [220, 60], [300, 36], [360, 90], [120, 120], [260, 110], [330, 150]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1} opacity={0.7} />
            ))}
          </g>
          <circle cx="320" cy="64" r="18" fill="#f6e7c8" /><circle cx="328" cy="58" r="16" fill="#0f2a35" />
          <path d="M0 170 Q 100 200 200 170 T 400 170" stroke="#f6e7c8" strokeOpacity="0.4" fill="none" />
          {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={20 + i * 45} cy={176 + Math.sin(i) * 6} r="4" fill="#f6d58f" opacity="0.9" />)}
          <rect y="240" width="400" height="60" fill="#0a1c24" />
        </>
      );
    case "practical":
    default:
      return (
        <>
          <rect width="400" height="300" fill="#ece5da" />
          <g stroke="#c7b193" strokeOpacity="0.5">
            {Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} />)}
            {Array.from({ length: 14 }, (_, i) => <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="300" />)}
          </g>
          <path d="M40 240 C 120 200, 160 120, 260 110 S 360 60, 380 40" stroke="#2f7f8b" strokeWidth="4" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
          <circle cx="260" cy="110" r="12" fill="#b8643f" /><circle cx="260" cy="110" r="4" fill="#fff" />
        </>
      );
  }
}
