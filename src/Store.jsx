import { configureStore } from "@reduxjs/toolkit";
import { locationReducer, checkInReducer, checkOutReducer,arrayReducer ,guestReducer} from './slices/SearchSlice';
import {userNavReducer,switchReducer,userProfileReducer} from "./slices/UserSlice";
import {addPropertyReducer,addPropertyNavReducer} from './slices/AddPropertySlice';
import {allPropertyListReducer} from './slices/PropertiesSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";
import expPropertyReducer from './slices/ExpPropertySlice';
import { addExperienceReducer, addExperienceNavReducer } from "./slices/AddExperienceSlice";



import testReducer from './slices/TestSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  test: testReducer,
  location: locationReducer,
  checkIn: checkInReducer,
  checkOut: checkOutReducer,
  guests: guestReducer,
  arrayData: arrayReducer,
  userNav: userNavReducer,
  switchItem : switchReducer,
  userProfile:userProfileReducer,
  addProperty:addPropertyReducer,
  addPropertyNav:addPropertyNavReducer,
  propertyList:allPropertyListReducer,
  expPropertyList: expPropertyReducer,
  addExperience: addExperienceReducer,
  addExperienceNav: addExperienceNavReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
