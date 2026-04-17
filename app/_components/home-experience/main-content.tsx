import type { AnimationPhase } from "./animation-phase";
import { ContainerShell } from "./container-shell";
import { TopNavbar } from "./top-navbar";
import { AboutSection } from "./sections/about-section";
import { AiDemoSection } from "./sections/ai-demo-section";
import { FaqSection } from "./sections/faq-section";
import { HeroSection } from "./sections/hero-section";
import { ScheduleSection } from "./sections/schedule-section";
import { SponsorsSection } from "./sections/sponsors-section";
import { StaffSection } from "./sections/staff-section";

type MainContentProps = {
  currentPhase: AnimationPhase;
};

export function MainContent({ currentPhase }: MainContentProps) {
  /*
   * [護身符 V1 - 佛系經典]
   *                    _ooOoo_
   *                   o8888888o
   *                   88" . "88
   *                   (| -_- |)
   *                   O\  =  /O
   *                ____/`---'\____
   *              .'  \\|     |//  `.
   *             /  \\|||  :  |||//  \
   *            /  _||||| -:- |||||-  \
   *            |   | \\\  -  /// |   |
   *            | \_|  ''\---/''  |   |
   *            \  .-\__  `-`  ___/-. /
   *          ___`. .'  /--.--\  `. . __
   *       ."" '<  `.___\_<|>_/___.'  >'"".
   *      | | :  `- \`.;`\ _ /`;.`/ - ` : | |
   *      \  \ `-.   \_ __\ /__ _/   .-` /  /
   * ======`-.____`-.___\_____/___.-`____.-'======
   *                    `=---='
   *          佛祖保佑，編譯一次過，永無 BUG。
   *
   * [護身符 V4 - 需求結界版]
   *            ┌─────────────────────────┐
   *            │  需求已凍結  Scope 固定  │
   *            │  時程正常   溝通清晰      │
   *            │  無臨時加單 無神祕改稿    │
   *            └─────────────────────────┘
   *          怪需求退散，奇怪人事物繞道，專注寫好程式。
   */

  return (
    <>
      <TopNavbar currentPhase={currentPhase} />

      <main
        className="camp-main"
        aria-hidden={currentPhase === "loading"}
      >
        <div className="camp-page">
          <div className="camp-sections">
            {/* Hero — uses existing camp-hero layout, no ContainerShell wrapper */}
            <HeroSection />

            <ContainerShell id="about-section" label="about-section" delay={0}>
              <AboutSection />
            </ContainerShell>

            <ContainerShell id="schedule-section" label="schedule-section" delay={0}>
              <ScheduleSection />
            </ContainerShell>

            <ContainerShell id="staff-section" label="staff-section" delay={0}>
              <StaffSection />
            </ContainerShell>

            <ContainerShell id="ai-demo-section" label="ai-demo-section" delay={0}>
              <AiDemoSection />
            </ContainerShell>

            <ContainerShell id="sponsors-section" label="sponsors-section" delay={0}>
              <SponsorsSection />
            </ContainerShell>

            <ContainerShell id="faq-section" label="faq-section" delay={0}>
              <FaqSection />
            </ContainerShell>
          </div>

          <footer className="camp-footer">
            <div className="camp-footer-inner">
              <p className="camp-footer-copy">
                © 2026 SCAICT · 聯合暑訓籌備組 · All rights reserved
              </p>
              <nav className="camp-footer-links" aria-label="頁尾連結">
                <a href="mailto:contact@scaict.org" className="camp-footer-link">
                  Contact
                </a>
                <a
                  href="https://github.com/scaict"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="camp-footer-link"
                >
                  GitHub
                </a>
                <a href="#" className="camp-footer-link">
                  Privacy
                </a>
              </nav>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
