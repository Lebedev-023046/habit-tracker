import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './providers/index.tsx';
import { router } from './router/index';

import './styles/global.css';
import './styles/reset.css';
import './styles/responsive.css';

import 'react-loading-skeleton/dist/skeleton.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />

      {/* <App /> */}
    </Providers>
  </StrictMode>,
);
