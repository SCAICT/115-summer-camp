import { useEffect } from 'react';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 在支援的瀏覽器上啟用原生平滑滾動
    if (!document.documentElement.style.scrollBehavior) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div
      id="__smooth-scroll-root"
      style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </div>
  );
}