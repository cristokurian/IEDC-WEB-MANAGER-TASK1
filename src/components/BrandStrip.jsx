import { EVENT_CONFIG } from '../data/eventConfig';

export default function BrandStrip() {
  return (
    <section aria-label="The IEDC way: ideate, build, launch, collaborate and innovate" className="border-y border-neutral-700 bg-charcoal">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center px-4 py-5 sm:py-6">
          {EVENT_CONFIG.brandStrip.map((item, index) => (
            <div key={item} className="flex items-center">
              {index > 0 && (
                <span className="mx-4 h-5 w-px bg-neutral-500 sm:mx-6 md:mx-8" aria-hidden="true" />
              )}
              <span className="font-heading text-sm font-bold tracking-[0.2em] text-offwhite sm:text-base md:text-lg">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
