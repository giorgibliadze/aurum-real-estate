import { BuildingExplorer } from "@/components/building-explorer/BuildingExplorer";
import { ExteriorGallery } from "@/components/gallery/ExteriorGallery";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-stone-50">
      <section className="px-6 pb-12 pt-20 text-center sm:pt-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
          Aurum Residences
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Explore the building, floor by floor
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-stone-600">
          Hover or tap any level of the facade below to preview the apartment layouts available
          on that floor.
        </p>
      </section>

      <section className="px-6 pb-20" aria-label="Interactive building floor explorer">
        <BuildingExplorer />
      </section>

      <section className="bg-white px-6 py-20" aria-label="Exterior gallery">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            The building, from every angle
          </h2>
        </div>
        <ExteriorGallery />
      </section>
    </main>
  );
}
