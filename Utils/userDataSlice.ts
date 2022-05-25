import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "./types";

interface InitialStateType {
  userData: UserDataType;
}

const initialState: InitialStateType = {
  userData: {
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
  },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
