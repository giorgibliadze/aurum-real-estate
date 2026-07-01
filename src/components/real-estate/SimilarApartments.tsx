import type { Apartment } from "@/data/apartments";
import { ApartmentCard } from "./ApartmentCard";

interface SimilarApartmentsProps {
  apartments: Apartment[];
  title: string;
}

export function SimilarApartments({ apartments, title }: SimilarApartmentsProps) {
  if (apartments.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </section>
  );
}
