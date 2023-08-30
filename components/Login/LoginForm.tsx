import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { RefObject, useRef, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { callbackUrl } = router.query;
  const _callbackUrl = (callbackUrl as string) || "/";
  
  return (
    <Form.Root
      className="mt-30 flex w-full flex-col gap-y-8"
      onSubmit={async (event) => {
        event.preventDefault();

        const { email, password } = Object.fromEntries(
          new FormData(event.currentTarget)
        );
        const errorMsg = getErrorMsg(email, password);
        
        if (errorMsg) {
          alert(errorMsg);
          return;
        }
        

        const response = await signIn("Credentials", {
          email,
          password,
          redirect: false,
        });
        
        if (response?.ok) {
          router.push(_callbackUrl);
        }

        if (!response?.ok) {
          setIsError(true);
        }
      }}
      encType="multipart/form-data"
    >
      <Form.Field className="mb-10 grid" name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-900">
            이메일
          </Form.Label>
          <Form.Message className="text-10" match="valueMissing">
            이메일을 입력해주세요
          </Form.Message>
          {isError && (
            <Form.Message className="text-10 text-red-100">
              유효하지 않은 이메일 또는 비밀번호 입니다.
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <input
            ref={emailRef}
            className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500 focus:outline-none"
            type="email"
            required
            placeholder="이메일을 입력해주세요"
            onChange={() => setIsError(false)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-10 grid" name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-900">
            비밀번호
          </Form.Label>
          <Form.Message className="text-10" match="valueMissing">
            비밀번호를 입력해주세요
          </Form.Message>
          {isError && (
            <Form.Message className="text-10 text-red-100">
              유효하지 않은 이메일 또는 비밀번호 입니다.
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <input
            ref={passwordRef}
            className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500 focus:outline-none"
            type="password"
            required
            placeholder="비밀번호를 입력해주세요"
            onChange={() => setIsError(false)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="mt-30 flex h-44 w-full items-center justify-center rounded-8 border-1 bg-purple-100">
          <span className="text-14 font-semibold leading-14 text-white">
            로그인
          </span>
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

const getErrorMsg = (email: FormDataEntryValue, password: FormDataEntryValue) => {
  if (email.length > 30) {
    return '이메일은 30자 이내로 입력해주세요';
  } else if (password.length > 30) {
    return '패스워드는 100자 이내로 입력해주세요';
  } else {
    return '';
  }
};
