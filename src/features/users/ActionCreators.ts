import { AppDispatch } from "../../app/store";
import {
  userLoginPending,
  userLoginFulfilled,
  userLoginRejected,
  userNameEditPending,
  userNameEditFulfilled,
  userNameEditRejected,
} from "./usersSlice";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface LoginData {
  email: string;
  password: string;
}

interface EditData {
  userName: string;
  token: string;
}

interface Token {
  email: string;
  exp: number;
  iat: number;
  id: number;
  password: string;
  userName: string;
}

export const login = (data: LoginData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userLoginPending());
    const response = await axios.post("http://localhost:8000/login", data);

    dispatch(userLoginFulfilled(response.data));
  } catch (e) {
    // @ts-ignore
    dispatch(userLoginRejected(e.message));
  }
};

export const userNameEdit =
  ({ userName, token }: EditData) =>
  async (dispatch: AppDispatch) => {
    try {
      const { id }: Token = jwtDecode(token);
      dispatch(userNameEditPending());
      await axios.patch(
        `http://localhost:8000/edit/${id}`,
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(userNameEditFulfilled(userName));
    } catch (e) {
      // @ts-ignore
      dispatch(userNameEditRejected(e.message));
    }
  };
