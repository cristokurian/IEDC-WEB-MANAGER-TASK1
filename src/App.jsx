import { lazy, Suspense, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStrip from './components/BrandStrip';
import IdeaTicker from './components/IdeaTicker';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const About = lazy(() => import('./components/About'));
const Pillars = lazy(() => import('./components/Pillars'));
const EventJourney = lazy(() => import('./components/EventJourney'));
const Schedule = lazy(() => import('./components/Schedule'));
const TeamFinder = lazy(() => import('./components/TeamFinder'));
const AboutIEDC = lazy(() => import('./components/AboutIEDC'));
const Registration = lazy(() => import('./components/Registration'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20" aria-hidden="true">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-charcoal" />
    </div>
  );
}

function LazySection({ children }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  const isRegistrationPage =
    window.location.pathname.replace(/\/+$/, '') === '/register';

  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (isRegistrationPage) {
      document.title = 'Register | IEDC IDEA SPRINT 2026';
      if (canonical) {
        canonical.setAttribute('href', 'https://iedc-idea-sprint.vercel.app/register');
      }
    } else {
      document.title = 'IEDC IDEA SPRINT 2026 | IEDC BOOTCAMP CEC';
      if (canonical) {
        canonical.setAttribute('href', 'https://iedc-idea-sprint.vercel.app/');
      }
    }
  }, [isRegistrationPage]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-offwhite text-charcoal">
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-offwhite focus:shadow-lg"
        >
          Skip to main content
        </a>

        {isRegistrationPage ? (
          <main id="main-content">
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
              <a
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-charcoal"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Home
              </a>
            </div>
            <LazySection>
              <Registration />
            </LazySection>
          </main>
        ) : (
          <>
            <Navbar />
            <main id="main-content">
              <Hero />
              <BrandStrip />
              <LazySection>
                <About />
              </LazySection>
              <LazySection>
                <Pillars />
              </LazySection>
              <LazySection>
                <EventJourney />
              </LazySection>
              <LazySection>
                <Schedule />
              </LazySection>
              <IdeaTicker />
              <LazySection>
                <TeamFinder />
              </LazySection>
              <LazySection>
                <AboutIEDC />
              </LazySection>
            </main>
            <Footer />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
