import { Car, MapPin, ShieldCheck, Sparkles, Sun, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

import type { Dictionary } from "@/i18n/config";

const ICONS: ReactNode[] = [
  <MapPin key="map-pin" className="h-5 w-5" />,
  <Sparkles key="sparkles" className="h-5 w-5" />,
  <Sun key="sun" className="h-5 w-5" />,
  <ShieldCheck key="shield" className="h-5 w-5" />,
  <Car key="car" className="h-5 w-5" />,
  <TrendingUp key="trending" className="h-5 w-5" />,
];

interface ProjectAdvantagesProps {
  advantages: Dictionary["advantages"];
  title: string;
  subtitle?: string;
}

export function ProjectAdvantages({ advantages, title, subtitle }: ProjectAdvantagesProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-white/50">{subtitle}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((advantage, i) => (
          <div
            key={advantage.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-light">
              {ICONS[i % ICONS.length]}
            </div>
            <h3 className="mb-1.5 font-semibold text-white">{advantage.title}</h3>
            <p className="text-sm text-white/55">{advantage.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
