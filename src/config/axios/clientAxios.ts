import { URL_BASE } from "@/constants/keys";
import axios from "axios";

const clientAxios = axios.create({
  baseURL: URL_BASE,
});

export default clientAxios;
