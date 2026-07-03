"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApartmentMiniCard } from "./ApartmentMiniCard";
import type { SampleApartment } from "./types";

interface FloorApartmentsModalProps {
  floor: number | null;
  apartments: SampleApartment[];
  locale: string;
  onOpenChange: (open: boolean) => void;
}

export function FloorApartmentsModal({
  floor,
  apartments,
  locale,
  onOpenChange,
}: FloorApartmentsModalProps) {
  const router = useRouter();

  const handleViewAllApartments = () => {
    if (floor === null) return;

    onOpenChange(false);
    router.push(`/${locale}/aurum/apartments?floor=${floor}`);
  };

  return (
    <Dialog open={floor !== null} onOpenChange={onOpenChange}>
      {floor !== null && (
        <DialogContent className="max-w-2xl bg-[#100f0c] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">სართული {floor}</DialogTitle>
            <p className="text-sm text-white/50">
              {apartments.length} ხელმისაწვდომი ბინა
            </p>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 px-6 pb-4 sm:grid-cols-2">
            {apartments.map((apartment) => (
              <ApartmentMiniCard key={apartment.id} apartment={apartment} locale={locale} />
            ))}
          </div>
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={handleViewAllApartments}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              ყველა ბინის ნახვა
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
