import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Mic, Lightbulb, Users, Coffee, Wrench, 
  GraduationCap, LayoutDashboard, BarChart3, Moon,
  CheckCircle, Presentation, Scale, Trophy
} from 'lucide-react';
import { SCHEDULE_DATA } from '../data/scheduleData';

const ICON_MAP = {
  ClipboardCheck, Mic, Lightbulb, Users, Coffee, Wrench,
  GraduationCap, LayoutDashboard, BarChart3, Moon,
  CheckCircle, Presentation, Scale, Trophy,
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const tabRefs = useRef([]);
  const currentDay = SCHEDULE_DATA[activeDay];

  const handleTabKeyDown = (event, index) => {
    let nextIndex;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % SCHEDULE_DATA.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + SCHEDULE_DATA.length) % SCHEDULE_DATA.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = SCHEDULE_DATA.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveDay(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="schedule" className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-600">
            The 24-hour build
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            ONE SPRINT.{' '}
            <span className="text-accent">REAL PROBLEMS.</span>
          </h2>
          <p className="mt-4 max-w-lg text-neutral-600">
            A suggested path from finding the problem to sharing what you learned.
          </p>
          <p className="mt-2 text-xs text-neutral-600">
            Illustrative schedule; timings are hypothetical.
          </p>
        </motion.div>

        {/* Day Selector */}
        <div className="mt-12 flex gap-3" role="tablist" aria-label="Schedule days">
          {SCHEDULE_DATA.map((day, index) => (
            <button
              key={day.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              id={`schedule-tab-${day.id}`}
              aria-selected={activeDay === index}
              aria-controls={`schedule-panel-${day.id}`}
              tabIndex={activeDay === index ? 0 : -1}
              onClick={() => setActiveDay(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`${activeDay === index ? '' : 'interactive-surface'} rounded-full border border-transparent px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeDay === index
                  ? 'border-charcoal bg-charcoal text-offwhite shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <span className="font-heading font-bold">{day.label}</span>
              <span className={`ml-2 text-xs ${activeDay === index ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {day.date}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            id={`schedule-panel-${currentDay.id}`}
            role="tabpanel"
            aria-labelledby={`schedule-tab-${currentDay.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[1.1rem] top-2 bottom-2 w-px bg-neutral-200 sm:left-[7.5rem]" aria-hidden="true" />

              <div className="space-y-0">
                {currentDay.events.map((event, index) => {
                  const Icon = ICON_MAP[event.icon] || Lightbulb;
                  return (
                    <motion.div
                      key={`${currentDay.id}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative flex gap-4 pb-8 sm:gap-8"
                    >
                      {/* Time - hidden on mobile, shown on sm+ */}
                      <div className="hidden w-24 shrink-0 pt-3 text-right sm:block">
                        <span className="font-heading text-sm font-semibold text-neutral-600">
                          {event.endTime ? `${event.time} – ${event.endTime}` : event.time}
                        </span>
                      </div>

                      {/* Dot on timeline */}
                      <div className="relative z-10 mt-3 flex shrink-0 items-center justify-center">
                        <div className={`h-3 w-3 rounded-full border-2 border-offwhite transition-colors duration-200 ${
                          index === 0 ? 'bg-accent' : 'bg-charcoal group-hover:bg-accent'
                        }`} />
                      </div>

                      {/* Content card */}
                      <div                       className="interactive-surface flex-1 rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
                        {/* Time on mobile */}
                        <span className="mb-2 inline-block font-heading text-xs font-semibold text-neutral-600 sm:hidden">
                          {event.endTime ? `${event.time} – ${event.endTime}` : event.time}
                        </span>
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                            <Icon size={18} className="text-neutral-600" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="font-heading text-sm font-semibold sm:text-base">
                              {event.title}
                            </h3>
                            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
