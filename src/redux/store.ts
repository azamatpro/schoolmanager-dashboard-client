import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import layoutReducer from './layout/layoutSlice';
import popupReducer from './popup/popupSlice';
import schoolsReducer from './school/SchoolSlice';
import { createTransform } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
    layout: layoutReducer,
    popup: popupReducer,
    school: schoolsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Create a transform to blacklist the popup slice
const popupTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        if (key === 'popup') {
            return undefined; // Exclude popup state from being persisted
        }
        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => outboundState,
    // configuration options
    { whitelist: ['popup'] }
);

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    transforms: [popupTransform], // Add the transform to the persist config
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
