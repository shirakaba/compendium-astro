import PlayArrow from '@material-design-icons/svg/round/play_arrow.svg?react';

import { DarkModeToggle } from './components/DarkModeToggle.tsx';
// import { IconButton } from './components/xcode/icon-button.tsx';
// import { XcodeWindow } from './components/xcode/window';
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
        {/* <XcodeWindow /> */}

        {/* <IconButton SVG={PlayArrow} className="size-5 bg-orange-300" /> */}

        <PlayArrow className="size-[1em] fill-current text-amber-600 text-[40px]" />
        <PlayArrow className="size-5 fill-current text-amber-600" />
      </main>
    </div>
  );
}
