export type Brand =
  | "orange"
  | "royal"
  | "emerald"
  | "slate"
  | "desert"
  | "midnight"
  | "ink"
  | "sapphire"
  | "rose";

export const palettes: Array<{
  key: Brand;
  label: string;
  icon: string;
  preview: { primary: string; accent: string };
}> = [
  { key: "orange", label: "Orange", icon: "diamond", preview: { primary: "hsl(25 95% 55%)", accent: "hsl(35 90% 65%)" } },
  { key: "royal", label: "Royal", icon: "crown", preview: { primary: "hsl(221 83% 53%)", accent: "hsl(265 80% 60%)" } },
  { key: "emerald", label: "Emerald", icon: "leaf", preview: { primary: "hsl(160 84% 40%)", accent: "hsl(145 65% 45%)" } },
  { key: "slate", label: "Slate", icon: "palette", preview: { primary: "hsl(210 20% 45%)", accent: "hsl(200 60% 50%)" } },
  { key: "desert", label: "Desert Gold", icon: "sun", preview: { primary: "hsl(38 90% 55%)", accent: "hsl(28 85% 58%)" } },
  { key: "midnight", label: "Midnight", icon: "moon", preview: { primary: "hsl(230 60% 40%)", accent: "hsl(260 70% 55%)" } },
  { key: "ink", label: "Executive Ink", icon: "gem", preview: { primary: "hsl(220 10% 35%)", accent: "hsl(220 12% 20%)" } },
  { key: "sapphire", label: "Sapphire", icon: "gem", preview: { primary: "hsl(205 85% 45%)", accent: "hsl(250 70% 55%)" } },
  { key: "rose", label: "Desert Rose", icon: "sun", preview: { primary: "hsl(350 70% 55%)", accent: "hsl(28 65% 60%)" } },
];
