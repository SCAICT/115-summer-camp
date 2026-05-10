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
  const savedScrollRef = useRef(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Save scroll position right before any hash change so we capture
    // the true position before any browser/Lenis scroll reset occurs.
    const saveScroll = () => {
      savedScrollRef.current = window.scrollY ?? 0;
    };
    window.addEventListener('hashchange', saveScroll, { capture: true });
    return () => window.removeEventListener('hashchange', saveScroll, { capture: true });
  }, []);

  useEffect(() => {
    const isEnteringSubpage = prevPageRef.current === 'home' && route.page !== 'home';
    const isReturningHome = prevPageRef.current !== 'home' && route.page === 'home';

    if (isEnteringSubpage) {
      scrollToTarget(0, { immediate: true });
    } else if (isReturningHome) {
      window.setTimeout(() => {
        if (route.section) {
          scrollToTarget(document.getElementById(route.section));
        } else {
          scrollToTarget(savedScrollRef.current, { immediate: true });
        }
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
