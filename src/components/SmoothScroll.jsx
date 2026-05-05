import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const rafId = useRef(null);
  const targetY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    // 自定義順滑滾動實現
    const smoothScroll = () => {
      const diff = targetY.current - currentY.current;
      const ease = diff * 0.12; // 增加順滑度 (從 0.08 調到 0.12)

      if (Math.abs(diff) > 0.1) { // 降低閾值以獲得更精確的停止
        currentY.current += ease;
        window.scrollTo(0, currentY.current);
        rafId.current = requestAnimationFrame(smoothScroll);
      } else {
        rafId.current = null; // 清除 rafId 當動畫完成時
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();

      targetY.current += e.deltaY;
      targetY.current = Math.max(0, Math.min(
        targetY.current,
        document.documentElement.scrollHeight - window.innerHeight
      ));

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(smoothScroll);
      }
    };

    const handleScroll = () => {
      // 同步當前滾動位置
      currentY.current = window.scrollY;
      targetY.current = window.scrollY;
    };

    // 添加事件監聽
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      id="__smooth-scroll-root"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  );
}
