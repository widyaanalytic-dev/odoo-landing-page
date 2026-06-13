import { LangProvider } from './LangProvider';
import { ScrollProvider } from './ScrollContext';
import { HeaderNav } from './HeaderNav';
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
        <main id="scroll-container" className="scroll-container relative z-10 h-dvh overflow-hidden">
          <div id="scroll-content">
            <Slides />
          </div>
        </main>
      </ScrollProvider>
    </LangProvider>
  );
}
