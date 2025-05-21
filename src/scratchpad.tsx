import { createRoot } from 'react-dom/client';

import './scratchpad.css';
import { ScratchpadApp } from './scratchpadApp.tsx';

createRoot(document.getElementById('root')!).render(<ScratchpadApp />);
