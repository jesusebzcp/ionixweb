import clientAxios from "@/config/axios/clientAxios";
import { toast } from "react-toastify";
import { Credentials } from "./dto";
import { ERROR, LOADING, SET_USER } from "./types";

export const handleError = (payload: any, dispatch: any): void => {
  setLoading(false, dispatch);
  dispatch({ type: ERROR, payload });

  setTimeout(() => {
    dispatch({ type: ERROR, payload: { error: false, errorMsg: "" } });
  }, 4000);
};
export const setLoading = (loading: boolean, dispatch: any): void => {
  dispatch({ type: LOADING, payload: loading });
};

export const loginDispatch = async (creds: Credentials, dispatch: any) => {
  try {
    setLoading(true, dispatch);

    const { data } = await clientAxios.post("auth/login", {
      ...creds,
    });
    console.log("response", data);
    if (data.status === 404) {
      return toast.error("El usuario no existe");
    }

    const token = data.access_token;
    localStorage.setItem("access_token", token);
    getProfileDispatch(dispatch);
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};

export const getProfileDispatch = async (dispatch: any) => {
  try {
    setLoading(true, dispatch);
    const token = localStorage.getItem("access_token");
    const response = await clientAxios.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: SET_USER,
      payload: response.data,
    });
  } catch (error: any) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};
