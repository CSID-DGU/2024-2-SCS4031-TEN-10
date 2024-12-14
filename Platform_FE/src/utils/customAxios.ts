import axios from "axios";
import { NotLogIn, SignOut } from "./auth";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

customAxios.interceptors.request.use(
  async function (config: any) {
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response: any) {
    return response;
  },
  async function (error: any) {
    if (!error) return Promise.reject();

    const config = error.config;
    const status = error.response.status;
    const msg = error.response.data.message;

    // 액세스 토큰 만료 시
    if (status == 401 && msg == "Expired Access Token") {
      try {
        // 새 액세스 토큰 요청
        const refreshResult = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/refresh_token`,
          {},
          {
            withCredentials: true,
          }
        );

        if (refreshResult.data.result === false) {
          throw new Error("Failed Refresh Token");
        }

        // API 재요청
        const refreshAPI = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        return refreshAPI(config);
      } catch (refreshError) {
        // 액세스 토큰 받지 못했을 경우 로그아웃
        await SignOut();
        return Promise.reject();
      }
    }
    // 미로그인 상태 시
    else if (status == 401 && msg == "Not Logged In") {
      // 로그인 페이지로 이동
      NotLogIn();
      return Promise.reject();
    }
    // 그 외 오류 발생 시
    else if (error.response && error.response.data.statusCode) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default customAxios;
