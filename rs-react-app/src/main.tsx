import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/[locale]/App.tsx';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound.tsx';
import { ThemeProvider } from './context/ThemeContex.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import DetailsCard from './components/DetailsCard/DetailsCard.tsx';
import About from './components/About/About.tsx';
import './index.css';
import { ABOUT_URL, START_URL } from './constants.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={START_URL} />} />
            <Route path="/catalog/:pageNumber" element={<App />}>
              <Route path=":id?" element={<DetailsCard />} />
            </Route>
            <Route path={ABOUT_URL} element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
