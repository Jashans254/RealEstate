import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import {persistReducer} from 'redux-persist';
import storage  from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

//Combine reducers into a root reducer
const rootReducer = combineReducers({user:userReducer});

//Configuration for redux-persist
const persistConfig = {
  key :'root',
  storage,
  version:1,
};

//Create peristed reducer
const persistedReducer = persistReducer(persistConfig, rootReducer );
//Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
    serializableCheck: false,
  }),
});

//Create a persistor for the store
export const persistor = persistStore(store);
