import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';
import { getScrollBehavior } from '../utils/scroll';

const NAV_LINKS = [
  { label: 'The Movement', href: '#about' },
  { label: "Builder's Mindset", href: '#pillars' },
  { label: 'Journey', href: '#journey' },
  { label: '24-Hour Build', href: '#schedule' },
  { label: 'Build Role', href: '#team-finder' },
  { label: 'IEDC', href: '#iedc' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (e.key !== 'Tab') return;

    const focusableElements = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) {
      e.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (e.shiftKey && (document.activeElement === firstElement || !dialogRef.current.contains(document.activeElement))) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && (document.activeElement === lastElement || !dialogRef.current.contains(document.activeElement))) {
      e.preventDefault();
      firstElement.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    dialog?.querySelector('a[href], button:not([disabled])')?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [isOpen, handleKeyDown]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: getScrollBehavior() });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-offwhite/95 backdrop-blur-sm border-b border-neutral-200">
      <nav aria-label="Main navigation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              aria-label="IEDC BOOTCAMP CEC — return to homepage"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: getScrollBehavior() }); }}
              className="font-heading text-sm font-bold tracking-tight sm:text-base"
            >
              IEDC BOOTCAMP CEC
            </a>
            <span className="hidden h-4 w-px bg-neutral-300 md:block" aria-hidden="true" />
            <span className="hidden text-xs text-neutral-600 font-body md:block">
              {EVENT_CONFIG.displayDateShort.toUpperCase()}
            </span>
            <span className="hidden h-4 w-px bg-neutral-300 lg:block" aria-hidden="true" />
            <span className="hidden text-xs text-neutral-600 font-body lg:block">
              {EVENT_CONFIG.venueShort}
            </span>
          </div>

          {/* Right: Desktop Nav */}
          <div className="hidden items-center gap-3 lg:flex xl:gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="whitespace-nowrap text-xs text-neutral-600 transition-colors duration-200 hover:text-charcoal font-body xl:text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/register"
              className="whitespace-nowrap rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-offwhite transition-all duration-200 hover:bg-neutral-700 font-body"
            >
              Join the Sprint
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-charcoal lg:hidden hover:bg-neutral-100 transition-colors"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls={isOpen ? 'mobile-navigation-dialog' : undefined}
            aria-haspopup="dialog"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          ref={dialogRef}
          id="mobile-navigation-dialog"
          className="fixed inset-0 top-16 z-40 bg-offwhite lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          tabIndex={-1}
        >
          <nav className="flex flex-col gap-1 p-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="rounded-lg px-4 py-3 text-lg font-medium text-charcoal transition-colors hover:bg-neutral-100 font-body"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/register"
              className="mt-4 rounded-full bg-charcoal px-6 py-3 text-center text-lg font-medium text-offwhite transition-all hover:bg-neutral-700 font-body"
            >
              Join the Sprint
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
