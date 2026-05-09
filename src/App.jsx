import { useEffect, useState, useRef } from 'react';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import AboutSCAICT from './components/AboutSCAICT';
import TopNav from './components/TopNav';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Course from './components/Course';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Partners from './components/Partners';
import Organizations from './components/Organizations';
import Footer from './components/Footer';
import CourseDetailPage from './components/CourseDetailPage';
import TeamDetailPage from './components/TeamDetailPage';
import ClubsPage from './components/ClubsPage';

function getRouteFromHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));

  if (hash === '/course') return { page: 'course' };
  if (hash === '/team') return { page: 'team' };
  if (hash === '/clubs') return { page: 'clubs' };
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

function smoothScrollTo(target) {
  const lenis = typeof window !== 'undefined' ? window.__lenis : null;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, { duration: 1.6 });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }

  target?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useHashRoute();
  const prevPageRef = useRef(route.page);

  useEffect(() => {
    const isEnteringSubpage = prevPageRef.current === 'home' && route.page !== 'home';
    const isReturningHome = prevPageRef.current !== 'home' && route.page === 'home';

    if (isEnteringSubpage) {
      smoothScrollTo(0);
    } else if (route.page === 'home' && !isReturningHome) {
      // Only scroll within home page if not returning from subpage
      window.setTimeout(() => {
        if (!route.section) {
          smoothScrollTo(0);
          return;
        }

        smoothScrollTo(document.getElementById(route.section));
      }, 40);
    }

    prevPageRef.current = route.page;
  }, [route.page, route.section]);

  return (
    <SmoothScroll>
      <>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
        <TopNav />
        {route.page === 'course' ? (
          <CourseDetailPage />
        ) : route.page === 'team' ? (
          <TeamDetailPage />
        ) : route.page === 'clubs' ? (
          <ClubsPage />
        ) : (
          <>
            <Hero />
            <AboutSCAICT />
            <Course />
            <Schedule />
            <Team />
            <Partners />
            <Organizations />
            <Footer />
          </>
        )}
        <ScrollToTop />
      </>
    </SmoothScroll>
  );
}
