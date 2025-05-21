import { createRoot } from 'react-dom/client';

import './scratchpad.css';
import { ScratchpadApp } from './scratchpad-app.tsx';

createRoot(document.getElementById('root')!).render(<ScratchpadApp />);
