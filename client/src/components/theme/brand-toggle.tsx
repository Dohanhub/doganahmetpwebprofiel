import { useEffect, useState } from "react";
import { Palette, Diamond, Leaf, Crown, Moon, Sun, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { palettes, type Brand } from "./palettes";

const BRAND_KEY = "brand-theme";

const iconFor = (icon: string) => {
  switch (icon) {
    case "diamond": return <Diamond className="h-4 w-4" />;
    case "crown": return <Crown className="h-4 w-4" />;
    case "leaf": return <Leaf className="h-4 w-4" />;
    case "palette": return <Palette className="h-4 w-4" />;
    case "sun": return <Sun className="h-4 w-4" />;
    case "moon": return <Moon className="h-4 w-4" />;
    case "gem": return <Gem className="h-4 w-4" />;
    default: return <Palette className="h-4 w-4" />;
  }
};

export function BrandToggle() {
  const [brand, setBrand] = useState<Brand>("modern");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const qp = params.get("brand") as Brand | null;
    const validKeys = new Set(palettes.map((p) => p.key));
    if (qp && validKeys.has(qp)) {
      applyBrand(qp);
    } else {
      const stored = (localStorage.getItem(BRAND_KEY) as Brand) || "orange";
      applyBrand(stored);
    }
  }, []);

  const applyBrand = (b: Brand) => {
    setBrand(b);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-brand", b);
      localStorage.setItem(BRAND_KEY, b);
      // Update URL query param for shareable palette links
      const url = new URL(window.location.href);
      url.searchParams.set("brand", b);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 px-0 bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          data-testid="button-brand-toggle"
          aria-label={`Brand: ${palettes.find(p=>p.key===brand)?.label ?? brand}`}
        >
          {iconFor(palettes.find(p=>p.key===brand)?.icon ?? "palette")}
          <span className="sr-only">Toggle brand palette</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border">
        {palettes.map((p) => (
          <DropdownMenuItem
            key={p.key}
            onClick={() => applyBrand(p.key)}
            className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <span className="mr-2">{iconFor(p.icon)}</span>
            <span className="flex items-center gap-2">
              {p.label}
              <span className="ml-2 inline-flex items-center gap-1">
                <span
                  className="inline-block h-3 w-3 rounded-full border border-border"
                  style={{ background: p.preview.primary }}
                />
                <span
                  className="inline-block h-3 w-3 rounded-full border border-border"
                  style={{ background: p.preview.accent }}
                />
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BrandToggle;
