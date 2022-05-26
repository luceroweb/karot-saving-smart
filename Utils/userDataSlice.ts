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
  },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
