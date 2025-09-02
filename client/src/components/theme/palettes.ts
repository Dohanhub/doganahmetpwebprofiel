export type Brand =
  | "modern"
  | "minimal"
  | "executive"
  | "clean"
  | "professional";

export const palettes: Array<{
  key: Brand;
  label: string;
  icon: string;
  preview: { primary: string; accent: string };
}> = [
  { key: "modern", label: "Modern Professional", icon: "diamond", preview: { primary: "hsl(220 15% 25%)", accent: "hsl(200 60% 50%)" } },
  { key: "minimal", label: "Minimal Clean", icon: "palette", preview: { primary: "hsl(220 10% 30%)", accent: "hsl(200 40% 60%)" } },
  { key: "executive", label: "Executive Navy", icon: "crown", preview: { primary: "hsl(220 20% 20%)", accent: "hsl(200 70% 55%)" } },
  { key: "clean", label: "Clean Slate", icon: "gem", preview: { primary: "hsl(220 15% 35%)", accent: "hsl(200 50% 50%)" } },
  { key: "professional", label: "Professional", icon: "briefcase", preview: { primary: "hsl(220 18% 28%)", accent: "hsl(200 65% 52%)" } },
];
