import { motion, useReducedMotion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { EVENT_CONFIG } from '../data/eventConfig';
import { getScrollBehavior } from '../utils/scroll';

function NetworkGraphic() {
  return (
    <svg
      viewBox="0 0 500 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Connection lines */}
      <line x1="120" y1="150" x2="280" y2="220" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="280" y1="220" x2="380" y2="180" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="280" y1="220" x2="200" y2="350" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="200" y1="350" x2="350" y2="400" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="350" y1="400" x2="300" y2="520" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="200" y1="350" x2="100" y2="450" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="100" y1="450" x2="180" y2="550" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="180" y1="550" x2="300" y2="520" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="120" y1="150" x2="80" y2="280" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="80" y1="280" x2="200" y2="350" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="380" y1="180" x2="420" y2="310" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="420" y1="310" x2="350" y2="400" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="300" y1="520" x2="400" y2="580" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="180" y1="550" x2="120" y2="620" stroke="#D4D4D4" strokeWidth="1" />

      {/* Accent circles */}
      <circle cx="280" cy="220" r="18" fill="#2563EB" opacity="0.9" />
      <circle cx="200" cy="350" r="14" fill="#2563EB" opacity="0.7" />
      <circle cx="300" cy="520" r="16" fill="#2563EB" opacity="0.8" />

      {/* Outlined circles */}
      <circle cx="120" cy="150" r="12" stroke="#171717" strokeWidth="1.5" fill="none" />
      <circle cx="380" cy="180" r="10" stroke="#171717" strokeWidth="1.5" fill="none" />
      <circle cx="350" cy="400" r="13" stroke="#171717" strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="450" r="9" stroke="#171717" strokeWidth="1.5" fill="none" />
      <circle cx="180" cy="550" r="11" stroke="#171717" strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="280" r="8" stroke="#A3A3A3" strokeWidth="1" fill="none" />
      <circle cx="420" cy="310" r="8" stroke="#A3A3A3" strokeWidth="1" fill="none" />
      <circle cx="400" cy="580" r="7" stroke="#A3A3A3" strokeWidth="1" fill="none" />
      <circle cx="120" cy="620" r="7" stroke="#A3A3A3" strokeWidth="1" fill="none" />

      {/* Small dots */}
      <circle cx="200" cy="185" r="3" fill="#D4D4D4" />
      <circle cx="330" cy="200" r="3" fill="#D4D4D4" />
      <circle cx="240" cy="285" r="3" fill="#D4D4D4" />
      <circle cx="275" cy="375" r="3" fill="#D4D4D4" />
      <circle cx="325" cy="460" r="3" fill="#D4D4D4" />
      <circle cx="140" cy="500" r="3" fill="#D4D4D4" />
      <circle cx="240" cy="535" r="3" fill="#D4D4D4" />
      <circle cx="100" cy="365" r="3" fill="#D4D4D4" />
      <circle cx="400" cy="245" r="3" fill="#D4D4D4" />
      <circle cx="385" cy="490" r="3" fill="#D4D4D4" />

      {/* Accent dot ring */}
      <circle cx="280" cy="220" r="28" stroke="#2563EB" strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="200" cy="350" r="24" stroke="#2563EB" strokeWidth="1" opacity="0.2" fill="none" />
    </svg>
  );
}

function CountdownDisplay({ days, hours, minutes, seconds, status }) {
  if (status === 'ended') {
    return (
      <div className="mt-10">
        <p className="font-heading text-sm font-medium tracking-wide text-neutral-600">
          SPRINT COMPLETE
        </p>
      </div>
    );
  }

  if (status === 'live') {
    return (
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-wide text-green-600">
            THE SPRINT IS LIVE
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <CountdownBlock value={hours} label="HRS" />
          <Divider />
          <CountdownBlock value={minutes} label="MINS" />
          <Divider />
          <CountdownBlock value={seconds} label="SECS" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4 sm:gap-6">
        <CountdownBlock value={days} label="DAYS" />
        <Divider />
        <CountdownBlock value={hours} label="HRS" />
        <Divider />
        <CountdownBlock value={minutes} label="MINS" />
        <Divider />
        <CountdownBlock value={seconds} label="SECS" />
      </div>
    </div>
  );
}

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-neutral-600 mt-1">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-8 w-px bg-neutral-200" />;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { days, hours, minutes, seconds, status } = useCountdown();

  const animationProps = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };

  const transition = (delay = 0) =>
    prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: getScrollBehavior() });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] mt-16 lg:grid lg:grid-cols-2"
    >
      {/* Left Column — Network Graphic */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-neutral-100 to-white rounded-tl-3xl rounded-bl-3xl p-8 xl:p-12">
        <NetworkGraphic />
      </div>

      {/* Right Column — Content */}
      <div className="flex flex-col justify-between p-8 lg:p-12 xl:p-16 lg:border-l border-neutral-200 min-h-[calc(100vh-4rem)]">
        {/* Top area */}
        <motion.div
          {...animationProps}
          transition={transition(0)}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            {EVENT_CONFIG.type}
          </p>
          <span className="mt-3 inline-block rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
            {EVENT_CONFIG.displayDate.toUpperCase()}
          </span>
        </motion.div>

        {/* Middle area */}
        <div className="mt-10 lg:mt-0">
          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight text-charcoal"
            {...animationProps}
            transition={transition(0.15)}
          >
            IDEAS DON&apos;T
            <br />
            BUILD
            <br />
            THEMSELVES.
          </motion.h1>

          <motion.div
            {...animationProps}
            transition={transition(0.3)}
          >
            <p className="mt-6 text-sm font-medium tracking-[0.2em] text-neutral-600">
              IEDC IDEA SPRINT 2026
            </p>
            <p className="mt-2 text-xs tracking-wider text-neutral-600">
              IDEATE · BUILD · LAUNCH
            </p>
          </motion.div>

          <motion.div
            {...animationProps}
            transition={transition(0.45)}
          >
            <p className="mt-8 max-w-md font-body text-lg text-neutral-600">
              {EVENT_CONFIG.durationHours} hours to take a real problem from first question to first build. Start messy. Validate fast. Learn in public.
            </p>
            <p className="mt-3 max-w-md text-sm text-neutral-600">
              Find a challenge worth solving. Build with people who see it differently. Share what you learn.
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            {...animationProps}
            transition={transition(0.6)}
          >
            <CountdownDisplay
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              status={status}
            />
          </motion.div>
        </div>

        {/* Bottom area — Buttons */}
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          {...animationProps}
          transition={transition(0.75)}
        >
          <a
            href="/register"
            className="rounded-full bg-charcoal px-8 py-3.5 text-center text-sm font-medium text-offwhite transition-all hover:bg-neutral-700"
          >
            Join the Sprint
          </a>
          <button
            onClick={() => scrollTo('schedule')}
            className="rounded-full border border-charcoal px-8 py-3.5 text-sm font-medium text-charcoal transition-all hover:bg-charcoal hover:text-offwhite"
          >
            Explore the Build
          </button>
        </motion.div>
      </div>
    </section>
  );
}
