import { DarkModeToggle } from './components/DarkModeToggle.tsx';
import { XcodeWindow } from './components/xcode/window';
import './scratchpad.css';

/**
 * The component we want to develop in isolation.
 */
export function ScratchpadApp() {
  return (
    <div>
      <header>
        <DarkModeToggle />
      </header>

      <main>
        <XcodeWindow />
      </main>
    </div>
  );
}
