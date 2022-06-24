import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "./types";

interface InitialStateType {
  data: UserDataType;
}

const initialState: InitialStateType = {
  data: {
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    loggedIn: false,
  },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setIsLoggedIn(state, action) { 
      state.data.loggedIn = action.payload; 
    },
  },
});

export const { setUserData, setIsLoggedIn } = userDataSlice.actions;

export default userDataSlice.reducer;
