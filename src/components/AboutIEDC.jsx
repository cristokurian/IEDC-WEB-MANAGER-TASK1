import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export default function AboutIEDC() {
  return (
    <section id="iedc" className="border-t border-neutral-200 bg-charcoal text-offwhite">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-5 lg:gap-20 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="interactive-surface interactive-surface--dark rounded-2xl border border-neutral-700 p-6 lg:col-span-3 lg:p-8"
        >
          <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-300">
            Powered by
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {EVENT_CONFIG.host.name}
          </h2>
          <p className="mt-5 font-heading text-lg font-medium text-neutral-200">
            &ldquo;{EVENT_CONFIG.host.tagline}&rdquo;
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            IEDC BOOTCAMP CEC is a student innovation and entrepreneurship ecosystem at College of Engineering Chengannur. Students are encouraged to explore ideas, develop real-world applications, experiment with emerging technologies and build an entrepreneurial mindset.
          </p>
          <a
            href={EVENT_CONFIG.host.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-500 px-6 py-3 text-sm font-medium text-offwhite transition-colors hover:border-offwhite"
          >
            Explore IEDC BOOTCAMP CEC
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="interactive-surface interactive-surface--dark self-end rounded-2xl border border-neutral-700 p-6 lg:col-span-2 lg:p-8"
          aria-label="Volt's code for builders"
        >
          <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
            {EVENT_CONFIG.host.mascot}&apos;s code for builders
          </p>
          <p className="mt-4 font-heading text-2xl font-bold leading-tight">
            Always ship over hype.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Tangible MVPs win arguments.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
