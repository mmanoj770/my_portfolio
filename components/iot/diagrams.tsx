// Hand-drawn SVG wiring diagrams for the IoT tasks. Colours follow the wire colours
// used in the pin tables: red 3V3, orange 5V, grey GND, one colour per GPIO signal.

const COLOR = {
  board: "#18181C",
  stroke: "#3A3A42",
  text: "#F5F5F7",
  muted: "#9A9AA2",
  faint: "#5C5C64",
  signal: "#5B8DEF",
  v33: "#EF4444",
  v5: "#F97316",
  gnd: "#9A9AA2",
  g2: "#5B8DEF",
  g26: "#EAB308",
  g27: "#22C55E",
  g34: "#06B6D4",
  live: "#D97706",
  neutral: "#3B82F6",
};

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "Inter, ui-sans-serif, system-ui, sans-serif";

function Box({ x, y, w, h, title, subtitle, dashed = false }: { x: number; y: number; w: number; h: number; title: string; subtitle?: string; dashed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={COLOR.board} stroke={COLOR.stroke} strokeWidth={1.5} strokeDasharray={dashed ? "6 5" : undefined} />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fill={COLOR.text} fontFamily={SANS} fontSize={14} fontWeight={600}>
        {title}
      </text>
      {subtitle && (
        <text x={x + w / 2} y={y + 42} textAnchor="middle" fill={COLOR.muted} fontFamily={SANS} fontSize={11}>
          {subtitle}
        </text>
      )}
    </g>
  );
}

function Pin({ x, y, label, side, color = COLOR.muted }: { x: number; y: number; label: string; side: "left" | "right"; color?: string }) {
  // `side` is the edge of the component the pin sits on; the label goes inside the box.
  const tx = side === "right" ? x - 10 : x + 10;
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color} />
      <text x={tx} y={y + 4} textAnchor={side === "right" ? "end" : "start"} fill={COLOR.text} fontFamily={MONO} fontSize={11.5}>
        {label}
      </text>
    </g>
  );
}

function Wire({ d, color, dashed = false }: { d: string; color: string; dashed?: boolean }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={dashed ? "5 6" : undefined} />;
}

function Label({ x, y, children, color = COLOR.muted, anchor = "middle", size = 11 }: { x: number; y: number; children: string; color?: string; anchor?: "start" | "middle" | "end"; size?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={color} fontFamily={MONO} fontSize={size}>
      {children}
    </text>
  );
}

// Net flag: a short stub ending in a labelled pill. Same label = same electrical node.
function Flag({ x, y, label, color, dir }: { x: number; y: number; label: string; color: string; dir: "left" | "right" }) {
  const stub = 22;
  const w = label.length * 7.5 + 14;
  const x2 = dir === "right" ? x + stub : x - stub;
  const rx = dir === "right" ? x2 : x2 - w;
  return (
    <g>
      <line x1={x} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={2.5} />
      <rect x={rx} y={y - 10} width={w} height={20} rx={10} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.2} />
      <text x={rx + w / 2} y={y + 4} textAnchor="middle" fill={color} fontFamily={MONO} fontSize={11} fontWeight={600}>
        {label}
      </text>
    </g>
  );
}

function ResistorV({ x, y, h = 30, label }: { x: number; y: number; h?: number; label: string }) {
  return (
    <g>
      <rect x={x - 8} y={y} width={16} height={h} rx={3} fill={COLOR.board} stroke={COLOR.text} strokeWidth={1.5} />
      <Label x={x + 16} y={y + h / 2 + 4} anchor="start" color={COLOR.text}>
        {label}
      </Label>
    </g>
  );
}

function LdrV({ x, y, h = 30 }: { x: number; y: number; h?: number }) {
  const cy = y + h / 2;
  return (
    <g>
      <circle cx={x} cy={cy} r={h / 2 + 4} fill="none" stroke={COLOR.muted} strokeWidth={1} />
      <rect x={x - 7} y={y} width={14} height={h} rx={3} fill={COLOR.board} stroke={COLOR.text} strokeWidth={1.5} />
      {/* incoming light arrows */}
      <path d={`M ${x - 34} ${cy - 18} l 16 10 M ${x - 34} ${cy - 6} l 16 10`} stroke={COLOR.g26} strokeWidth={1.5} />
      <path d={`M ${x - 18} ${cy - 8} l -5 -1 l 2 -4 z M ${x - 18} ${cy + 4} l -5 -1 l 2 -4 z`} fill={COLOR.g26} />
      <Label x={x + 26} y={cy + 4} anchor="start" color={COLOR.text}>
        LDR
      </Label>
    </g>
  );
}

function Bulb({ cx, cy, labelAbove = false }: { cx: number; cy: number; labelAbove?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={18} fill="#2A2410" stroke={COLOR.g26} strokeWidth={2} />
      <path d={`M ${cx - 9} ${cy - 9} L ${cx + 9} ${cy + 9} M ${cx + 9} ${cy - 9} L ${cx - 9} ${cy + 9}`} stroke={COLOR.g26} strokeWidth={2} />
      <Label x={cx} y={labelAbove ? cy - 28 : cy + 36} color={COLOR.text}>
        230 V bulb
      </Label>
    </g>
  );
}

function Legend({ x, y, items }: { x: number; y: number; items: [string, string][] }) {
  let offset = 0;
  return (
    <g>
      {items.map(([label, color]) => {
        const gx = x + offset;
        offset += label.length * 7 + 34;
        return (
          <g key={label}>
            <line x1={gx} y1={y} x2={gx + 18} y2={y} stroke={color} strokeWidth={3} />
            <text x={gx + 24} y={y + 4} fill={COLOR.muted} fontFamily={MONO} fontSize={10.5}>
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ---------------------------------------------------------------- Task 1 */

export function Task1Wiring() {
  return (
    <svg viewBox="0 0 780 300" className="h-auto w-full" role="img" aria-label="Task 1 wiring: laptop USB to ESP32, GPIO 2 drives the on-board LED through a resistor to GND, ESP32 joins Wi-Fi and serves the browser">
      <Box x={20} y={95} w={170} h={100} title="Laptop" subtitle="Arduino IDE · Serial 115200" />
      <Wire d="M 190 145 L 260 145" color={COLOR.v5} />
      <Label x={225} y={135}>USB</Label>
      <Label x={225} y={165} size={9.5}>5 V + data</Label>

      <Box x={260} y={30} w={250} h={240} title="ESP32 DevKit V1" subtitle="ESP32-WROOM-32" />
      <rect x={285} y={95} width={200} height={150} rx={10} fill="none" stroke={COLOR.faint} strokeDasharray="5 5" />
      <Label x={385} y={113} size={10}>built into the board</Label>

      {/* GPIO2 -> resistor -> LED -> GND */}
      <Pin x={300} y={150} label="GPIO 2" side="left" color={COLOR.g2} />
      <Wire d="M 358 150 L 372 150" color={COLOR.g2} />
      <rect x={372} y={142} width={30} height={16} rx={3} fill={COLOR.board} stroke={COLOR.text} strokeWidth={1.5} />
      <Label x={387} y={136} size={9.5} color={COLOR.text}>R</Label>
      <Wire d="M 402 150 L 420 150" color={COLOR.g2} />
      <path d="M 420 140 L 420 160 L 438 150 Z" fill={COLOR.g2} />
      <line x1={439} y1={139} x2={439} y2={161} stroke={COLOR.g2} strokeWidth={2.5} />
      <path d="M 432 134 l 8 -10 M 440 136 l 8 -10" stroke={COLOR.g2} strokeWidth={1.5} />
      <Label x={430} y={180} size={10} color={COLOR.text}>blue LED</Label>
      <Wire d="M 439 150 L 465 150 L 465 220 L 340 220" color={COLOR.gnd} />
      <Pin x={300} y={220} label="GND" side="left" color={COLOR.gnd} />
      <Wire d="M 340 220 L 334 220" color={COLOR.gnd} />

      {/* Wi-Fi link */}
      <Wire d="M 510 110 L 575 75" color={COLOR.signal} dashed />
      <Wire d="M 510 200 L 575 225" color={COLOR.signal} dashed />
      <Box x={575} y={35} w={190} h={70} title="Wi-Fi hotspot" subtitle="2.4 GHz · 192.168.137.x" />
      <Box x={575} y={185} w={190} h={80} title="Browser (same Wi-Fi)" subtitle="http://<ESP32 IP>/" />
      <Label x={670} y={130} color={COLOR.signal}>HTTP GET /api/on</Label>
      <Label x={670} y={150} color={COLOR.signal}>{`reply "ON"`}</Label>
      <Wire d="M 670 105 L 670 118" color={COLOR.signal} dashed />
      <Wire d="M 670 158 L 670 185" color={COLOR.signal} dashed />

      <Legend x={30} y={288} items={[["GPIO 2 signal", COLOR.g2], ["GND", COLOR.gnd], ["USB 5 V", COLOR.v5], ["Wi-Fi / HTTP", COLOR.signal]]} />
    </svg>
  );
}

/* ---------------------------------------------------------------- Task 2 / 3 */

export function Task2Wiring() {
  return (
    <svg viewBox="0 0 900 340" className="h-auto w-full" role="img" aria-label="Task 2 wiring: ESP32 VIN, GND and GPIO 26 to the relay module VCC, GND and IN; relay COM to mains live, NO to the bulb, bulb to mains neutral">
      <Label x={250} y={22} color={COLOR.text} size={11.5}>LOW-VOLTAGE SIDE (5 V / 3.3 V)</Label>
      <Label x={705} y={22} color={COLOR.live} size={11.5}>MAINS SIDE (230 V AC)</Label>

      <Box x={20} y={40} w={200} h={220} title="ESP32 DevKit V1" subtitle="Adafruit IO MQTT client" />
      <Pin x={220} y={110} label="VIN (5 V)" side="right" color={COLOR.v5} />
      <Pin x={220} y={150} label="GND" side="right" color={COLOR.gnd} />
      <Pin x={220} y={190} label="GPIO 26" side="right" color={COLOR.g26} />

      <Wire d="M 220 110 L 330 110" color={COLOR.v5} />
      <Wire d="M 220 150 L 330 150" color={COLOR.gnd} />
      <Wire d="M 220 190 L 330 190" color={COLOR.g26} />

      <Box x={330} y={60} w={210} h={180} title="5 V relay module" subtitle="active-HIGH" />
      <Pin x={330} y={110} label="VCC" side="left" color={COLOR.v5} />
      <Pin x={330} y={150} label="GND" side="left" color={COLOR.gnd} />
      <Pin x={330} y={190} label="IN" side="left" color={COLOR.g26} />
      <Pin x={540} y={110} label="COM" side="right" color={COLOR.live} />
      <Pin x={540} y={150} label="NO" side="right" color={COLOR.live} />
      <Pin x={540} y={190} label="NC (unused)" side="right" color={COLOR.faint} />

      <Box x={760} y={40} w={125} h={70} title="230 V AC" subtitle="wall socket" />
      <Label x={790} y={128} color={COLOR.live}>L</Label>
      <Label x={855} y={128} color={COLOR.neutral}>N</Label>

      {/* Live -> COM, NO -> bulb -> neutral */}
      <Wire d="M 540 110 L 640 110 L 640 80 L 760 80" color={COLOR.live} />
      <Label x={690} y={72} color={COLOR.live}>live (L)</Label>
      <Wire d="M 540 150 L 620 150 L 620 235 L 682 235" color={COLOR.live} />
      <Label x={650} y={190} color={COLOR.live}>switched live</Label>
      <Bulb cx={700} cy={235} />
      <Wire d="M 718 235 L 855 235 L 855 110" color={COLOR.neutral} />
      <Label x={790} y={226} color={COLOR.neutral}>neutral (not switched)</Label>

      <text x={450} y={315} textAnchor="middle" fill={COLOR.live} fontFamily={SANS} fontSize={12}>
        ⚠ 230 V side: screw terminals only, fully insulated, unplugged from the wall while wiring
      </text>
      <Legend x={30} y={290} items={[["5 V", COLOR.v5], ["GND", COLOR.gnd], ["GPIO 26 → IN", COLOR.g26], ["live", COLOR.live], ["neutral", COLOR.neutral]]} />
    </svg>
  );
}

/* ---------------------------------------------------------------- Task 4 / 5 */

export function SmartHomeWiring() {
  return (
    <svg viewBox="0 0 900 540" className="h-auto w-full" role="img" aria-label="Tasks 4 and 5 wiring: DHT11 data to GPIO 27, LDR voltage divider output to GPIO 34, relay IN to GPIO 26, relay switches the 230 V bulb">
      {/* ESP32 with power pins as net flags on the left, signal pins on the right */}
      <Box x={110} y={40} w={200} h={400} title="ESP32 DevKit V1" subtitle="Firebase RTDB client" />
      <Pin x={110} y={150} label="3V3" side="left" color={COLOR.v33} />
      <Flag x={110} y={150} label="3V3" color={COLOR.v33} dir="left" />
      <Pin x={110} y={200} label="VIN 5V" side="left" color={COLOR.v5} />
      <Flag x={110} y={200} label="5V" color={COLOR.v5} dir="left" />
      <Pin x={110} y={250} label="GND" side="left" color={COLOR.gnd} />
      <Flag x={110} y={250} label="GND" color={COLOR.gnd} dir="left" />

      <Pin x={310} y={110} label="GPIO 27" side="right" color={COLOR.g27} />
      <Pin x={310} y={240} label="GPIO 34 (ADC1)" side="right" color={COLOR.g34} />
      <Pin x={310} y={370} label="GPIO 26" side="right" color={COLOR.g26} />

      {/* DHT11 */}
      <Wire d="M 310 110 L 440 110" color={COLOR.g27} />
      <Label x={375} y={100} color={COLOR.g27}>DATA</Label>
      <Box x={440} y={60} w={190} h={95} title="DHT11" subtitle="temperature + humidity" />
      <Pin x={440} y={110} label="DATA" side="left" color={COLOR.g27} />
      <Pin x={630} y={118} label="VCC" side="right" color={COLOR.v33} />
      <Flag x={630} y={118} label="3V3" color={COLOR.v33} dir="right" />
      <Pin x={630} y={142} label="GND" side="right" color={COLOR.gnd} />
      <Flag x={630} y={142} label="GND" color={COLOR.gnd} dir="right" />

      {/* LDR divider: 3V3 -> LDR -> node -> 10k -> GND, node -> GPIO34 */}
      <Wire d="M 310 240 L 440 240" color={COLOR.g34} />
      <Label x={375} y={230} color={COLOR.g34}>A0 voltage</Label>
      <rect x={440} y={180} width={190} height={130} rx={12} fill={COLOR.board} stroke={COLOR.stroke} strokeWidth={1.5} strokeDasharray="6 5" />
      <text x={452} y={200} fill={COLOR.text} fontFamily={SANS} fontSize={12.5} fontWeight={600}>
        LDR divider
      </text>
      <Wire d="M 560 195 L 630 195" color={COLOR.v33} />
      <Wire d="M 560 195 L 560 207" color={COLOR.v33} />
      <LdrV x={560} y={207} h={24} />
      <Wire d="M 560 231 L 560 250" color={COLOR.g34} />
      <circle cx={560} cy={240} r={4.5} fill={COLOR.g34} />
      <Wire d="M 440 240 L 560 240" color={COLOR.g34} />
      <ResistorV x={560} y={250} h={30} label="10 kΩ" />
      <Wire d="M 560 280 L 560 295 L 630 295" color={COLOR.gnd} />
      <Flag x={630} y={195} label="3V3" color={COLOR.v33} dir="right" />
      <Flag x={630} y={295} label="GND" color={COLOR.gnd} dir="right" />

      {/* Relay */}
      <Wire d="M 310 370 L 440 370" color={COLOR.g26} />
      <Label x={375} y={360} color={COLOR.g26}>IN (LOW = on)</Label>
      <Box x={440} y={330} w={190} h={100} title="Relay module" subtitle="active-LOW" />
      <Pin x={440} y={370} label="IN" side="left" color={COLOR.g26} />
      <Pin x={630} y={360} label="VCC" side="right" color={COLOR.v5} />
      <Flag x={630} y={360} label="5V" color={COLOR.v5} dir="right" />
      <Pin x={630} y={395} label="GND" side="right" color={COLOR.gnd} />
      <Flag x={630} y={395} label="GND" color={COLOR.gnd} dir="right" />

      {/* Mains side from the relay's bottom terminals */}
      <circle cx={490} cy={430} r={4} fill={COLOR.live} />
      <circle cx={570} cy={430} r={4} fill={COLOR.live} />
      <Label x={490} y={422} color={COLOR.text}>COM</Label>
      <Label x={570} y={422} color={COLOR.text}>NO</Label>
      <Wire d="M 490 430 L 490 515 L 800 515 L 800 495" color={COLOR.live} />
      <Wire d="M 570 430 L 570 470 L 642 470" color={COLOR.live} />
      <Bulb cx={660} cy={470} labelAbove />
      <Wire d="M 678 470 L 765 470" color={COLOR.neutral} />
      <Box x={765} y={445} w={125} h={50} title="230 V AC" />
      <circle cx={765} cy={470} r={4} fill={COLOR.neutral} />
      <circle cx={800} cy={495} r={4} fill={COLOR.live} />
      <Label x={752} y={462} color={COLOR.neutral}>N</Label>
      <Label x={815} y={512} color={COLOR.live}>L</Label>
      <Label x={640} y={533} color={COLOR.live}>live → COM, NO → bulb → neutral</Label>

      <Legend x={20} y={470} items={[["3V3", COLOR.v33], ["5V", COLOR.v5], ["GND", COLOR.gnd]]} />
      <text x={20} y={495} fill={COLOR.muted} fontFamily={SANS} fontSize={11}>
        Pills with the same label
      </text>
      <text x={20} y={511} fill={COLOR.muted} fontFamily={SANS} fontSize={11}>
        are the same connection.
      </text>
    </svg>
  );
}
