import { useEffect, useLayoutEffect, useState, useRef, lazy, Suspense } from 'react';
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
import QA from './components/QA';

const CourseDetailPage = lazy(() => import('./components/CourseDetailPage'));
const TeamDetailPage = lazy(() => import('./components/TeamDetailPage'));
const ClubsPage = lazy(() => import('./components/ClubsPage'));
const PhotosPage = lazy(() => import('./components/PhotosPage'));


const subpageHomeSections = {
  course: '課程',
  team: '團隊',
  clubs: '社團',
  photos: '成果',
};

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
    lenis.resize?.();
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
  const [isHomeRestoring, setIsHomeRestoring] = useState(false);
  const [isSubpageRestoring, setIsSubpageRestoring] = useState(false);
  const route = useHashRoute();
  const prevPageRef = useRef(route.page);
  const activeSectionRef = useRef(null);
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

    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

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
    return () => observer.disconnect();
  }, [route.page]);

  useLayoutEffect(() => {
    if (route.page === 'home') return undefined;

    let rafId = 0;
    let secondRafId = 0;

    const forceScrollTop = () => {
      scrollToTarget(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    setIsSubpageRestoring(true);
    forceScrollTop();

    rafId = window.requestAnimationFrame(() => {
      forceScrollTop();

      secondRafId = window.requestAnimationFrame(() => {
        setIsSubpageRestoring(false);
      });
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(secondRafId);
    };
  }, [route.page]);

  useLayoutEffect(() => {
    const isEnteringSubpage = prevPageRef.current === 'home' && route.page !== 'home';
    const isReturningHome = prevPageRef.current !== 'home' && route.page === 'home';

    const getSectionTop = (target) => {
      const lenisScroll = typeof window.__lenis?.scroll === 'number' ? window.__lenis.scroll : null;
      return Math.max(0, target.getBoundingClientRect().top + (lenisScroll ?? window.scrollY ?? 0));
    };

    const scrollToSection = (sectionId, options = { immediate: true }) => {
      const target = sectionId ? document.getElementById(sectionId) : null;
      if (!target) return false;

      scrollToTarget(getSectionTop(target), options);
      return true;
    };

    if (isEnteringSubpage) {
      setIsHomeRestoring(false);
      pendingHomeRestoreRef.current = {
        sectionId: subpageHomeSections[route.page] ?? activeSectionRef.current,
      };
      scrollToTarget(0, { immediate: true });
    } else if (isReturningHome) {
      const restoreState = pendingHomeRestoreRef.current;
      const sectionId =
        route.section ??
        restoreState?.sectionId ??
        subpageHomeSections[prevPageRef.current] ??
        activeSectionRef.current;

      setIsHomeRestoring(true);

      const rafId = window.requestAnimationFrame(() => {
        if (!scrollToSection(sectionId)) {
          scrollToTarget(0, { immediate: true });
        }

        window.requestAnimationFrame(() => {
          pendingHomeRestoreRef.current = null;
          setIsHomeRestoring(false);
        });
      });

      prevPageRef.current = route.page;
      return () => window.cancelAnimationFrame(rafId);
    } else if (route.page === 'home') {
      if (!route.section) {
        setIsHomeRestoring(false);
        scrollToTarget(0, { immediate: true });
      } else if (!scrollToSection(route.section, { immediate: false })) {
        const retryId = window.setTimeout(() => {
          scrollToSection(route.section, { immediate: false });
        }, 40);

        prevPageRef.current = route.page;
        return () => window.clearTimeout(retryId);
      }
    }

    prevPageRef.current = route.page;
  }, [route.page, route.section]);

  return (
    <SmoothScroll>
      <>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
        <TopNav />
        <Suspense fallback={<PageLoader />}>
          {route.page !== 'home' ? (
            <div style={{ visibility: isSubpageRestoring ? 'hidden' : 'visible' }}>
              {route.page === 'course' ? (
                <CourseDetailPage />
              ) : route.page === 'team' ? (
                <TeamDetailPage />
              ) : route.page === 'clubs' ? (
                <ClubsPage />
              ) : route.page === 'photos' ? (
                <PhotosPage />
              ) : null}
            </div>
          ) : (
            <div style={{ visibility: isHomeRestoring ? 'hidden' : 'visible' }}>
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
            </div>
          )}
        </Suspense>
        <ScrollToTop />
      </>
    </SmoothScroll>
  );
}
