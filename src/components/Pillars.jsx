import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../data/eventConfig';

export default function Pillars() {
  return (
    <section id="pillars" className="border-t border-neutral-200 bg-neutral-100">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-600">
            The IEDC Way
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            THE BUILDER&apos;S{' '}
            <span className="text-accent">MINDSET.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_CONFIG.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="interactive-surface group rounded-2xl border border-neutral-200 bg-offwhite p-8 lg:p-10"
            >
              <span className="font-heading text-6xl font-bold text-neutral-200" aria-hidden="true">
                {pillar.number}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold tracking-wide">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {pillar.description}
              </p>
              <div className="mt-6 h-0.5 w-12 bg-accent transition-all duration-300 group-hover:w-20" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
