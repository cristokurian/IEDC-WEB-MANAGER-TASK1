import { ArrowDownRight, ExternalLink, Instagram, Linkedin, Mail } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';
import { getScrollBehavior } from '../utils/scroll';

const { host } = EVENT_CONFIG;

const quickLinks = [
  { label: 'The Movement', href: '#about' },
  { label: "Builder's Mindset", href: '#pillars' },
  { label: 'From Problem to Possibility', href: '#journey' },
  { label: '24-Hour Build', href: '#schedule' },
  { label: 'Find Your Build Role', href: '#team-finder' },
  { label: 'About IEDC', href: '#iedc' },
  { label: 'Join the Sprint', href: '/register' },
];

const socialLinks = [
  { label: 'Official Website', href: host.website, icon: ExternalLink },
  { label: 'Instagram', href: host.instagram, icon: Instagram },
  { label: 'LinkedIn', href: host.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${host.email}`, icon: Mail },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: getScrollBehavior() });
  };

  return (
    <footer className="bg-charcoal text-neutral-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section
          aria-labelledby="footer-closing-title"
          className="border-b border-neutral-700 pb-12 sm:pb-16"
        >
          <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
            THE NEXT BIG THING IS COMING.
          </p>
          <h2
            id="footer-closing-title"
            className="mt-5 font-heading text-6xl font-bold leading-[0.9] tracking-tight text-offwhite sm:text-8xl lg:text-9xl"
          >
            STAY TUNED.
          </h2>
          <a
            href="/register"
            aria-label="Join the sprint"
            className="group mt-7 inline-flex h-14 w-14 items-center justify-center rounded-full text-accent transition-colors hover:bg-white/5 focus-visible:bg-white/5 sm:mt-9 sm:h-16 sm:w-16"
          >
            <ArrowDownRight
              size={42}
              strokeWidth={1.6}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 motion-reduce:transition-none"
            />
          </a>
        </section>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-lg font-bold text-offwhite">
              {host.name}
            </h3>
            <p className="mt-2 text-sm italic text-neutral-400">
              &ldquo;{host.tagline}&rdquo;
            </p>
            <p className="mt-4 text-sm text-neutral-400">
              {host.institution}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Explore
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-sm text-neutral-400 transition-colors duration-200 hover:text-offwhite"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Stay Connected
            </h4>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-offwhite"
                  >
                    <link.icon size={14} aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-neutral-700 pt-8">
          <div className="flex justify-center text-center">
            <p className="text-xs text-neutral-400">
              &copy; 2026 {host.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
