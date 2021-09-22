import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

import './index.css';
import './theme/theme.css';
import { themeMui } from './theme/material-ui.theme';
import { store, persistor } from './reducers';
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={themeMui}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <Toaster position="top-center" />
              <App />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </StylesProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
