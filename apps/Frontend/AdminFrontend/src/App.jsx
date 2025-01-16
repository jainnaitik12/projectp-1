import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { store } from './store';

import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <AppRoutes />
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;