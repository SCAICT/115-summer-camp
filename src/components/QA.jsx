import { useState } from 'react';
import SectionLabel from './SectionLabel';
import { faqItems } from '../data/siteData';

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-paper/10">
      <button
        className="flex w-full touch-manipulation items-center justify-between gap-6 py-5 sm:py-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="font-serifjp text-[17px] leading-snug tracking-wide text-paper/90 sm:text-[19px]">
          {item.q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-base transition-all duration-300 ${
            isOpen
              ? 'border-amber/50 bg-amber/10 text-amber rotate-45'
              : 'border-paper/20 text-paper/55 hover:border-paper/40'
          }`}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.42s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p className="pb-7 text-[15px] leading-8 text-paper/60 sm:text-[16px]">{item.a}</p>
      </div>
    </div>
  );
}

export default function QA() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="section-unified-bg relative py-14 sm:py-40">
      <div className="absolute -top-40 left-[20%] h-[380px] w-[560px] bg-[radial-gradient(ellipse,rgba(139,111,158,0.12),transparent_70%)] blur-[90px]" />
      <div className="section-shell">
        <SectionLabel no="09" en="FAQ" zh="常 見 問 題" colorClass="text-mist-purple" />

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="fluid-section-title font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">
            有任何問題？
            <br />
            <span className="text-mist-pink">我們幫你解答。</span>
          </h2>
          <p className="max-w-[380px] text-[14px] leading-7 text-paper/55 sm:text-[15px] lg:text-right">
            如果你的問題沒有在這裡找到答案，
            <br className="hidden sm:block" />
            歡迎透過 Instagram 或 Email 聯繫我們。
          </p>
        </div>

        <div className="mx-auto max-w-3xl border-t border-paper/10">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
