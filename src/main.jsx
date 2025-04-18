import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { JournalApp } from './JournalApp.jsx';
import './styles.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>      
		    <HashRouter>
          <JournalApp />
        </HashRouter>
    </Provider>
  </StrictMode>,
)
