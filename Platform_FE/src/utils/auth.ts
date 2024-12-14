import Router from "next/router";
import { showErrorToast } from "@/hooks/useCustomToast";
import axios from "axios";

// 로그아웃
export async function SignOut() {
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/sign-out`,
      {},
      {
        withCredentials: true,
      }
    )
    .then(async (res) => {
      if (res.data.result) {
        Router.push("/auth/sign-in");
        showErrorToast("세션이 만료되었습니다. 다시 로그인해주세요.");
      }
    })
    .catch((error) => {
      const errorStatus = error.response?.data?.statusCode;
      if (errorStatus && errorStatus == 401) {
        NotLogIn();
        return Promise.resolve();
      } else {
        throw error;
      }
    });
}

// 미로그인 상태
export function NotLogIn() {
  Router.push("/auth/sign-in");
  showErrorToast("세션이 만료되었습니다. 다시 로그인해주세요.");
}
