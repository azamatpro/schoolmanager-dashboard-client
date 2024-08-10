import { createRoot } from 'react-dom/client'; // Update import
import './i18n';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
    // Create a root
    const root = createRoot(rootElement);

    // Render the app
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
