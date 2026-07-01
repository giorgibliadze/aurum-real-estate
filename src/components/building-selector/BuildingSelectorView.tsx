"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { DirectOverlayMode } from "./DirectOverlayMode";
import { FloorGridMode } from "./FloorGridMode";

type Mode = "floors" | "direct";

interface BuildingSelectorViewProps {
  locale: string;
}

export function BuildingSelectorView({ locale }: BuildingSelectorViewProps) {
  const [mode, setMode] = useState<Mode>("floors");

  return (
    <div>
      <section className="border-b border-white/10 px-6 pb-6 pt-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          შენობის ინტერაქტიული სელექტორი
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-white/50">
          აირჩიეთ სასურველი რეჟიმი ბინების დასათვალიერებლად
        </p>

        <div className="mx-auto mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          <button
            type="button"
            aria-pressed={mode === "floors"}
            onClick={() => setMode("floors")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              mode === "floors" ? "bg-gold text-black" : "text-white/60 hover:text-white",
            )}
          >
            სართულების სქემა
          </button>
          <button
            type="button"
            aria-pressed={mode === "direct"}
            onClick={() => setMode("direct")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              mode === "direct" ? "bg-gold text-black" : "text-white/60 hover:text-white",
            )}
          >
            პირდაპირი შერჩევა
          </button>
        </div>
      </section>

      {mode === "floors" ? (
        <FloorGridMode locale={locale} />
      ) : (
        <DirectOverlayMode locale={locale} />
      )}
    </div>
  );
}
