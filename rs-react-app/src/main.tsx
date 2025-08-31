import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/index.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <Suspense
      fallback={
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading data...</p>
        </div>
      }
    >
      <React.Profiler
        id="App"
        onRender={(...args) => console.log('Profiler:', ...args)}
      >
        <App />
      </React.Profiler>
    </Suspense>
  </ErrorBoundary>
);
