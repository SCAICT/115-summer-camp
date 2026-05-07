import { useEffect, useState } from 'react';
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
import Footer from './components/Footer';
import CourseDetailPage from './components/CourseDetailPage';
import TeamDetailPage from './components/TeamDetailPage';

function getRouteFromHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));

  if (hash === '/course') return { page: 'course' };
  if (hash === '/team') return { page: 'team' };
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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useHashRoute();

  useEffect(() => {
    if (route.page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.setTimeout(() => {
      if (!route.section) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      document.getElementById(route.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
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
        ) : (
          <>
            <Hero />
            <AboutSCAICT />
            <Course />
            <Schedule />
            <Team />
            <Partners />
            <Footer />
          </>
        )}
        <ScrollToTop />
      </>
    </SmoothScroll>
  );
}
