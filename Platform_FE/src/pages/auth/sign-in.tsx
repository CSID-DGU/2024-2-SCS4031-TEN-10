/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classes from "./css/SignIn.module.css";
import { useRouter } from "next/router";
import customAxios from "@/utils/customAxios";
import { showErrorToast } from "@/hooks/useCustomToast";
import AuthInput from "@/components/auth/AuthInput";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeLoginButton, setActiveLoginButton] = useState(false);

  useEffect(() => {
    if (email != "" && password != "") {
      setActiveLoginButton(true);
    } else {
      setActiveLoginButton(false);
    }
  }, [email, password]);

  function onClickLogin() {
    if (!activeLoginButton) return;

    const postData = {
      user_email: email,
      user_password: password,
    };

    customAxios({
      method: "POST",
      url: `/users/sign-in`,
      data: postData,
    })
      .then(async (res: any) => {
        if (res.data.result) {
          router.push("/main");
        }
      })
      .catch((err: any) => {
        const errorData = err?.response?.data;

        if (errorData.message && !Array.isArray(errorData.message)) {
          showErrorToast(errorData.message);
        } else {
          showErrorToast(
            "로그인 중 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      });
  }

  return (
    <>
      <div className={classes["background_img"]}>
        <img src="/image/login-bg.jpg" />
      </div>
      <div className={classes["wrapper"]}>
        <div className={classes["title"]}>지역 축제 정보 통합 플랫폼</div>

        <div className={classes["input_div__wrapper"]}>
          <AuthInput
            title="이메일"
            onInput={(e: any) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder={"이메일을 입력하세요"}
          />
          <AuthInput
            title="비밀번호"
            type={"password"}
            onInput={(e: any) => setPassword(e.target.value)}
            value={password}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div className={classes["button_div"]}>
          <button
            className={`primary_button ${!activeLoginButton && "disable"}`}
            disabled={!activeLoginButton}
            onClick={onClickLogin}
          >
            로그인
          </button>
          <button
            className={"underline_button"}
            onClick={() => router.push("/auth/sign-up")}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
}
