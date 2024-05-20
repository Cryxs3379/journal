import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Proporciona el store de Redux a la aplicación */}
      <BrowserRouter> {/* Envoltorio para las rutas de React Router */}
        <JournalApp /> {/* Componente principal de la aplicación */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
