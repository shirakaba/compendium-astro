import { createRoot } from 'react-dom/client';

import { DarkModeToggle } from './components/DarkModeToggle.tsx';
import { XcodeWindow } from './components/xcode/window';

import './scratchpad.css';

createRoot(document.getElementById('root')!).render(<App />);

/**
 * The component we want to develop in isolation.
 */
function App() {
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
