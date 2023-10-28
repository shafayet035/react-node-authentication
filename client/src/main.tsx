import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Layout/App.tsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <App />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
