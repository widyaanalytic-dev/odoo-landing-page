import { LangProvider } from './LangProvider';
import { ScrollProvider } from './ScrollContext';
import { HeaderNav } from './HeaderNav';
import { SlideNavArrows } from './SlideNavArrows';
import { Slides } from './Slides';
import { AmbientBackground } from './atmosphere/AmbientBackground';
import { NarrativeSpine } from './atmosphere/NarrativeSpine';

export default function App() {
  return (
    <LangProvider>
      <ScrollProvider>
        <AmbientBackground />
        <NarrativeSpine />
        <HeaderNav />
        <SlideNavArrows />
        <main
          id="scroll-container"
          className="scroll-container relative z-10 h-dvh max-w-full overflow-x-hidden overflow-y-auto overscroll-y-contain overscroll-x-none lg:overflow-hidden"
        >
          <div id="scroll-content">
            <Slides />
          </div>
        </main>
      </ScrollProvider>
    </LangProvider>
  );
}
