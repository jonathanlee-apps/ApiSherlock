import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearStoreActionType,
  loginUserActionType,
  registerUserActionType,
  updateUserActionType,
  userSliceName,
} from "constants/actionTypes";
import { loginUserUrl, registerUserUrl, updateUserUrl } from "constants/urls";
import { clearAllApisState } from "features/allApis/allApisSlice";
import { clearValues } from "features/api/apiSlice";
import { logoutUser } from "features/user/userSlice";
import { ValidationErrors } from "interfaces/errors";
import {
  AuthUserResponse,
  LoginUserData,
  RegisterUserData,
  UpdateUserData,
} from "interfaces/users";
import customFetch from "utils/axios";
import { checkPermissions } from "utils/checkPermissions";
import { removeUserFromLocalStorage } from "utils/localStorage";

const registerUser = createAsyncThunk<
  // Return type of the payload creator
  AuthUserResponse,
  // First argument to the payload creator
  RegisterUserData,
  // Types for ThunkAPI
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${registerUserActionType}`, async (newUser, thunkAPI) => {
  try {
    const resp = await customFetch.post(`${registerUserUrl}`, newUser);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const loginUser = createAsyncThunk<
  AuthUserResponse,
  LoginUserData,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${loginUserActionType}`, async (loginUser, thunkAPI) => {
  try {
    const resp = await customFetch.post(`${loginUserUrl}`, loginUser);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const updateUser = createAsyncThunk<
  AuthUserResponse,
  UpdateUserData,
  {
    rejectValue: Partial<ValidationErrors> & { error: string };
  }
>(`${userSliceName}${updateUserActionType}`, async (updatingUser, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`${updateUserUrl}`, updatingUser);
    return resp.data;
  } catch (error) {
    checkPermissions(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const clearStore = createAsyncThunk<
  Promise<any>,
  void,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${clearStoreActionType}`, async (_, thunkAPI) => {
  try {
    removeUserFromLocalStorage();
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearAllApisState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
    return Promise.reject();
  }
});

export { registerUser, loginUser, updateUser, clearStore };