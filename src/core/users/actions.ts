import type { OrderType } from "@/components/atoms/headerFilterTablet/headerFilterTablet";
import clientAxios from "@/config/axios/clientAxios";
import { toast } from "react-toastify";
import { UserAuth } from "../auth/dto";
import {
  ERROR,
  LOADING,
  GET_LIST_USER,
  ADD_USER,
  SELECT_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./types";

export const handleError = (payload: any, dispatch: any): void => {
  console.error("error", payload);
  setLoading(false, dispatch);
  dispatch({ type: ERROR, payload });

  setTimeout(() => {
    dispatch({ type: ERROR, payload: { error: false, errorMsg: "" } });
  }, 4000);
};
export const setLoading = (loading: boolean, dispatch: any): void => {
  dispatch({ type: LOADING, payload: loading });
};

export const getAllUsers = async (
  {
    limit = 10,
    skip = 1,
    order = "asc",
    search = "",
  }: { limit?: number; skip?: number; order?: OrderType; search?: string },
  dispatch: any
) => {
  try {
    const token = localStorage.getItem("access_token");
    setLoading(true, dispatch);

    const url = !!search.trim()
      ? `users?search=${search}`
      : `users/?limit=${limit}&offset=${skip}&order=${order}`;
    const response = await clientAxios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: GET_LIST_USER,
      payload: response.data,
    });
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};

export const uploadImage = async (file: File, dispatch: any) => {
  try {
    setLoading(true, dispatch);
    const fileData = new FormData();
    fileData.append("file", file);
    const response = await clientAxios.post("images/upload", fileData);
    return response.data.key;
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};

export const getImageUrl = async (filename: string, dispatch: any) => {
  try {
    setLoading(true, dispatch);
    const response = await clientAxios.get(`images/${filename}`);

    return response.data;
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};

interface DataUser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  id?: number;
}

export const createNewUser = async (
  values: DataUser,
  file: File | string,
  dispatch: any
) => {
  try {
    const token = localStorage.getItem("access_token");

    setLoading(true, dispatch);
    let imageUrl = file;

    if (typeof file !== "string") {
      const filename = await uploadImage(file, dispatch);
      imageUrl = await getImageUrl(filename, dispatch);
    }

    const { data } = await clientAxios.post(
      "users",
      { ...values, imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: ADD_USER,
      payload: data,
    });
    toast.success("Se ha creado satisfactoriamente el usuario");
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};
export const updateUser = async (
  values: DataUser,
  file: File | string,
  dispatch: any
) => {
  try {
    const token = localStorage.getItem("access_token");

    setLoading(true, dispatch);
    let imageUrl = file;

    if (typeof file !== "string") {
      const filename = await uploadImage(file, dispatch);
      imageUrl = await getImageUrl(filename, dispatch);
    }

    const { data } = await clientAxios.put(
      `users/${values.id}`,
      { ...values, imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
    toast.success("Se ha creado satisfactoriamente el usuario");
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};

export const selectUser = async (user: UserAuth, dispatch: any) => {
  dispatch({
    type: SELECT_USER,
    payload: user,
  });
};
export const deleteUser = async (id: number, dispatch: any) => {
  try {
    const token = localStorage.getItem("access_token");

    setLoading(true, dispatch);
    await clientAxios.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    setLoading(false, dispatch);
  }
};
