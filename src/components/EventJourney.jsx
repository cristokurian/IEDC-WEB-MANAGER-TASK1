import { motion } from 'framer-motion';

const stages = [
  {
    number: '01',
    title: 'PROBLEM',
    description: 'Identify a real-world challenge and understand who it affects.',
  },
  {
    number: '02',
    title: 'IDEATE',
    description: 'Explore different approaches and shape a solution concept.',
  },
  {
    number: '03',
    title: 'PROTOTYPE',
    description: 'Make an initial version to give the idea something concrete to test.',
  },
  {
    number: '04',
    title: 'VALIDATE',
    description: 'Question assumptions, refine the concept and learn from feedback.',
  },
  {
    number: '05',
    title: 'PITCH',
    description: 'Present the solution and communicate the impact it could have.',
  },
];

export default function EventJourney() {
  return (
    <section id="journey" className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-600">
            The 24-hour journey
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            FROM PROBLEM TO{' '}
            <span className="text-accent">POSSIBILITY.</span>
          </h2>
        </motion.div>

        <div className="relative mt-14">
          <div className="absolute bottom-9 left-9 top-9 w-px bg-neutral-300 sm:bottom-10 sm:left-10 sm:top-10 lg:hidden" aria-hidden="true" />
          <div className="absolute left-9 right-[12.5%] top-10 hidden h-px bg-neutral-300 lg:block" aria-hidden="true" />
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
            {stages.map((stage, index) => (
              <motion.li
                key={stage.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="interactive-surface flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 lg:block lg:px-4 lg:py-5"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-offwhite font-heading text-xs font-bold text-charcoal lg:mb-6">
                  {stage.number}
                </span>
                <div className="pt-1 lg:pt-0">
                  <h3 className="font-heading text-sm font-bold tracking-wider">{stage.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600 lg:mt-3">
                    {stage.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <p className="mt-10 max-w-2xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-neutral-600">
          A sprint is a starting point for exploration and learning. It does not promise that every idea will become a functioning startup.
        </p>
      </div>
    </section>
  );
}
