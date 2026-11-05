import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStrip from './components/BrandStrip';
import IdeaTicker from './components/IdeaTicker';
import Footer from './components/Footer';

const About = lazy(() => import('./components/About'));
const Pillars = lazy(() => import('./components/Pillars'));
const EventJourney = lazy(() => import('./components/EventJourney'));
const Schedule = lazy(() => import('./components/Schedule'));
const TeamFinder = lazy(() => import('./components/TeamFinder'));
const AboutIEDC = lazy(() => import('./components/AboutIEDC'));
const Registration = lazy(() => import('./components/Registration'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-charcoal" />
    </div>
  );
}

export default function App() {
  const isRegistrationPage =
    window.location.pathname.replace(/\/+$/, '') === '/register';

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-offwhite text-charcoal">
        {isRegistrationPage ? (
          <main>
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
              <a
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-charcoal"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Home
              </a>
            </div>
            <Suspense fallback={<SectionLoader />}>
              <Registration />
            </Suspense>
          </main>
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <BrandStrip />
              <Suspense fallback={<SectionLoader />}>
                <About />
                <Pillars />
                <EventJourney />
                <Schedule />
                <IdeaTicker />
                <TeamFinder />
                <AboutIEDC />
              </Suspense>
            </main>
            <Footer />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
