import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import AboutSCAICT from './components/AboutSCAICT';
import TopNav from './components/TopNav';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Registration from './components/Registration';
import Course from './components/Course';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Partners from './components/Partners';
import Gallery from './components/Gallery';
import Organizations from './components/Organizations';
import Footer from './components/Footer';

const CourseDetailPage = lazy(() => import('./components/CourseDetailPage'));
const TeamDetailPage = lazy(() => import('./components/TeamDetailPage'));
const ClubsPage = lazy(() => import('./components/ClubsPage'));
const PhotosPage = lazy(() => import('./components/PhotosPage'));
const QA = lazy(() => import('./components/QA'));

function PageLoader() {
  return <div style={{ minHeight: '100vh' }} />;
}

function getRouteFromHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));

  if (hash === '/course') return { page: 'course' };
  if (hash === '/team') return { page: 'team' };
  if (hash === '/clubs') return { page: 'clubs' };
  if (hash === '/photos') return { page: 'photos' };
  if (hash.startsWith('/home/')) return { page: 'home', section: hash.replace('/home/', '') };
  if (hash && !hash.startsWith('/')) return { page: 'home', section: hash };

  return { page: 'home' };
}

function useHashRoute() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

function scrollToTarget(target, { immediate = false } = {}) {
  const useImmediate = immediate;
  const lenis = typeof window !== 'undefined' ? window.__lenis : null;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, useImmediate ? { immediate: true } : { duration: 1.6 });
    return;
  }

  const behavior = useImmediate ? 'auto' : 'smooth';

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior });
    return;
  }

  target?.scrollIntoView?.({ behavior, block: 'start' });
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useHashRoute();
  const prevPageRef = useRef(route.page);
  const activeSectionRef = useRef(null);
  const homeScrollYRef = useRef(0);
  const pendingHomeRestoreRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Track which home section is currently in view via IntersectionObserver.
  // Resets and re-observes whenever we're on the home page.
  useEffect(() => {
    if (route.page !== 'home') return;

    const rememberHomeScroll = () => {
      const lenisScroll = typeof window.__lenis?.scroll === 'number' ? window.__lenis.scroll : null;
      homeScrollYRef.current = lenisScroll ?? window.scrollY ?? 0;
    };

    rememberHomeScroll();
    window.addEventListener('scroll', rememberHomeScroll, { passive: true });

    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) {
      return () => window.removeEventListener('scroll', rememberHomeScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSectionRef.current = entry.target.id;
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -55% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', rememberHomeScroll);
    };
  }, [route.page]);

  useEffect(() => {
    const isEnteringSubpage = prevPageRef.current === 'home' && route.page !== 'home';
    const isReturningHome = prevPageRef.current !== 'home' && route.page === 'home';

    if (isEnteringSubpage) {
      pendingHomeRestoreRef.current = {
        sectionId: activeSectionRef.current,
        scrollY: homeScrollYRef.current,
      };
      scrollToTarget(0, { immediate: true });
    } else if (isReturningHome) {
      const restoreState = pendingHomeRestoreRef.current;
      const sectionId = route.section ?? restoreState?.sectionId ?? activeSectionRef.current;
      window.setTimeout(() => {
        if (route.section) {
          scrollToTarget(document.getElementById(route.section));
          return;
        }

        if (typeof restoreState?.scrollY === 'number') {
          scrollToTarget(restoreState.scrollY, { immediate: true });
          pendingHomeRestoreRef.current = null;
          return;
        }

        const target = sectionId ? document.getElementById(sectionId) : null;
        if (target) scrollToTarget(target, { immediate: true });
      }, 80);
    } else if (route.page === 'home') {
      window.setTimeout(() => {
        if (!route.section) {
          scrollToTarget(0, { immediate: true });
          return;
        }
        scrollToTarget(document.getElementById(route.section));
      }, 40);
    }

    prevPageRef.current = route.page;
  }, [route.page, route.section]);

  return (
    <SmoothScroll>
      <>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
        <TopNav />
        <Suspense fallback={<PageLoader />}>
          {route.page === 'course' ? (
            <CourseDetailPage />
          ) : route.page === 'team' ? (
            <TeamDetailPage />
          ) : route.page === 'clubs' ? (
            <ClubsPage />
          ) : route.page === 'photos' ? (
            <PhotosPage />
          ) : (
            <>
              <Hero />
              <AboutSCAICT />
              <Course />
              <Schedule />
              <Gallery />
              <Team />
              <Registration />
              <Partners />
              <Organizations />
              <QA />
              <Footer />
            </>
          )}
        </Suspense>
        <ScrollToTop />
      </>
    </SmoothScroll>
  );
}
