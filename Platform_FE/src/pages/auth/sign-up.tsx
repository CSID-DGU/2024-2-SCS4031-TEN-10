/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classes from "./css/SignUp.module.css";
import { useRouter } from "next/router";
import AuthInput from "@/components/auth/AuthInput";
import AlertModal from "@/components/common/modal/AlertModal";
import customAxios from "@/utils/customAxios";
import { showErrorToast } from "@/hooks/useCustomToast";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState<boolean | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [activeEmailError, setActiveEmailError] = useState(false);
  const [activePasswordError, setActivePasswordError] = useState(false);
  const [activeCheckPasswordError, setActiveCheckPasswordError] =
    useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");

  const [activeModal, setActiveModal] = useState(false);
  const [activeSignupButton, setActiveSignupButton] = useState(false);

  // 이메일 중복 검사
  useEffect(() => {
    if (!email.trim()) {
      setEmailError("이메일을 입력해 주세요.");
    } else if (isDuplicatedEmail == null) {
      setEmailError("이메일 중복 검사를 진행해 주세요.");
    } else if (isDuplicatedEmail == true) {
      setEmailError("이미 가입된 이메일입니다.");
    } else {
      setEmailError("");
    }
  }, [email, isDuplicatedEmail]);

  // 비밀번호 검사
  useEffect(() => {
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.");
    } else {
      setPasswordError("");
    }
  }, [password]);

  // 비밀번호 확인 검사
  useEffect(() => {
    if (!checkPassword.trim()) {
      setCheckPasswordError("비밀번호를 입력해 주세요.");
    } else if (checkPassword != password) {
      setCheckPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPasswordError("");
    }
  }, [checkPassword, password]);

  // 버튼 활성화 결정
  useEffect(() => {
    if (emailError == "" && passwordError == "" && checkPasswordError == "") {
      setActiveSignupButton(true);
    } else {
      setActiveSignupButton(false);
    }
  }, [emailError, passwordError, checkPasswordError]);

  // 이메일 중복 검사
  function onClickCheckDuplicate() {
    if (!email.trim()) return;

    customAxios({
      method: "POST",
      url: `/users/duplicate/email`,
      data: { user_email: email },
    })
      .then(async (res: any) => {
        if (res.data.result == true) {
          setIsDuplicatedEmail(false);
        }
      })
      .catch((err: any) => {
        const errorData = err?.response?.data;

        if (errorData.message == "이미 사용 중인 이메일입니다.") {
          setIsDuplicatedEmail(true);
        } else if (errorData.message && !Array.isArray(errorData.message)) {
          showErrorToast(errorData.message);
          setIsDuplicatedEmail(null);
        } else {
          showErrorToast("문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
          setIsDuplicatedEmail(null);
        }
      });
  }

  // 회원가입 버튼 클릭 이벤트
  function onClickSignUp() {
    if (!activeSignupButton) return;

    const postData = {
      user_email: email,
      user_password: password,
    };

    customAxios({
      method: "POST",
      url: `/users/sign-up`,
      data: postData,
    })
      .then(async (res: any) => {
        if (res.data.result) {
          setActiveModal(true);
        }
      })
      .catch((err: any) => {
        const errorData = err?.response?.data;

        if (errorData.message && !Array.isArray(errorData.message)) {
          showErrorToast(errorData.message);
        } else {
          showErrorToast(
            "회원가입 중 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      });
  }

  return (
    <>
      {activeModal && (
        <AlertModal
          content={`회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.`}
          onClickCancel={() => router.push("/auth/sign-in")}
          cancelText="확인"
        />
      )}
      <div className={classes["wrapper"]}>
        <div className={classes["title"]}>회원가입</div>

        <div className={classes["input_div__wrapper"]}>
          <AuthInput
            title={"이메일"}
            onInput={(e: any) => {
              setActiveEmailError(true);
              setEmail(e.target.value);
            }}
            onChange={() => {
              setIsDuplicatedEmail(null);
            }}
            value={email}
            placeholder={"이메일을 입력하세요"}
            onClickButton={onClickCheckDuplicate}
            activeMessage={activeEmailError}
            errorMessage={emailError}
            okMessage={
              isDuplicatedEmail == false && "사용 가능한 이메일입니다."
            }
          />

          <AuthInput
            title={"비밀번호"}
            type={"password"}
            onInput={(e: any) => {
              setActivePasswordError(true);
              setPassword(e.target.value);
            }}
            value={password}
            placeholder={"비밀번호를 입력하세요"}
            activeMessage={activePasswordError}
            errorMessage={passwordError}
          />

          <AuthInput
            title={"비밀번호 확인"}
            type={"password"}
            onInput={(e: any) => {
              setActiveCheckPasswordError(true);
              setCheckPassword(e.target.value);
            }}
            value={checkPassword}
            placeholder={"비밀번호를 입력하세요"}
            activeMessage={activeCheckPasswordError}
            errorMessage={checkPasswordError}
          />
        </div>

        <button
          className={`primary_button ${!activeSignupButton && "disable"}`}
          disabled={!activeSignupButton}
          onClick={onClickSignUp}
        >
          회원가입
        </button>
      </div>
    </>
  );
}
