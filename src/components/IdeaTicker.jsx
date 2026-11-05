const messages = [
  'EXPERIMENT. VALIDATE. SHIP. REPEAT.',
  'IDEAS INTO ACTION.',
  'BUILD SOMETHING THAT MATTERS.',
  'THINK BOLD. BUILD REAL.',
  'FROM PROBLEM TO POSSIBILITY.',
];

function TickerCopy() {
  return (
    <span className="ticker-copy flex shrink-0 items-center gap-8 whitespace-nowrap px-4 py-5 sm:gap-10 sm:px-6 sm:py-6">
      {messages.map((message) => (
        <span key={message} className="flex items-center gap-8 sm:gap-10">
          <span className="font-heading text-sm font-bold tracking-[0.12em] text-offwhite sm:text-base lg:text-lg">
            {message}
          </span>
          <span className="text-accent" aria-hidden="true">✳</span>
        </span>
      ))}
    </span>
  );
}

export default function IdeaTicker() {
  return (
    <section
      id="idea-ticker"
      className="overflow-hidden border-y border-neutral-700 bg-charcoal"
      aria-label="IEDC builder mindset"
    >
      <p className="sr-only">
        Experiment. Validate. Ship. Repeat. Ideas into action. Build something that matters.
        Think bold. Build real. From problem to possibility.
      </p>
      <div className="ticker-track flex w-max" aria-hidden="true">
        <TickerCopy />
        <TickerCopy />
      </div>
    </section>
  );
}
