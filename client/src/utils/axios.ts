import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "constants/token";
import {
  baseUrl,
  loginUserUrl,
  refreshAccessTokenUrl,
  registerUserUrl,
} from "constants/urls";

const customFetch = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // this is necessary
});

customFetch.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!config || !config.headers || !config.url) {
    console.error("Fetching data error");
    return;
  }

  const accessToken = await getToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else if (
    !accessToken &&
    config.url !== registerUserUrl &&
    config.url !== loginUserUrl
  ) {
    const response = await axios.get(
      `${baseUrl}${refreshAccessTokenUrl}`,
      { withCredentials: true } // important
    );

    const newAccessToken = response.data.accessToken;

    config.headers.Authorization = `Bearer ${newAccessToken}`;
  }

  /* 
  No further validation is needed here because
  everything gets handled by the toast errors
  in the other pages/components.
  */

  return config;
});

export default customFetch;
