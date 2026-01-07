import { createRoot } from 'react-dom/client';
import { Providers } from './providers/index.tsx';

import './styles/global.css';
import './styles/reset.css';
import './styles/responsive.css';

import 'react-loading-skeleton/dist/skeleton.css';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Providers>
    <App />
  </Providers>,
  // </StrictMode>,
);
