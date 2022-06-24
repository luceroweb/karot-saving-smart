import { createSlice } from '@reduxjs/toolkit'; 
import { AppDataType } from './types';

const initialState: AppDataType = { 
  appReady: false, 
}; 

export const appSlice = createSlice(
  { 
    name: 'data', 
    initialState, 
    reducers: { 
      setAppReady(state, action) { 
        state.appReady = action.payload; 
      }, 
  }, 
  }
); 
// Action creators are generated for each case reducer function 

export const { setAppReady } = appSlice.actions; 

export default appSlice.reducer; 