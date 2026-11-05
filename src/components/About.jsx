import { motion } from 'framer-motion';
import { EVENT_CONFIG } from '../data/eventConfig';

export default function About() {
  return (
    <section id="about" className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              START MESSY.{' '}
              <span className="text-accent">LEARN FAST.</span>
            </h2>
            <div className="mt-8 h-1 w-16 bg-charcoal" aria-hidden="true" />
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 lg:mt-0"
          >
            <p className="text-lg leading-relaxed text-neutral-600">
              In {EVENT_CONFIG.durationHours} hours, move from a real-world problem to a first solution worth testing. Start by listening, ask better questions, and bring different perspectives to the work.
            </p>
            <div className="mt-10 space-y-6">
              <div className="border-t border-neutral-200 pt-5">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider">IDEATE WITH INTENT</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Find who the problem affects. Explore possible approaches before settling on an answer.
                </p>
              </div>
              <div className="border-t border-neutral-200 pt-5">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider">BUILD TO LEARN</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Make a prototype, test your assumptions, and use what happens to shape the next version.
                </p>
              </div>
              <div className="border-t border-neutral-200 pt-5">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider">SHARE THE LEARNING</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Present the problem, your approach and what you learned. A sprint is a starting point for the entrepreneurial journey, not a promise to launch a startup.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
