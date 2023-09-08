import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useCreateUser from "hooks/user/useCreateUser";
import useEmailAuth from "hooks/user/useEmailAuth";
import useEmailAuthValidate from "hooks/user/useEmailAuthValidate";
import EmailSendedDialog from "./EmailSendedDialog";
import UserCreatedDialog from "./UserCreatedDialog";

export default function RegisterVerificationForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const { sendEmailAuth } = useEmailAuth();
  const { emailAuthValidate } = useEmailAuthValidate();
  const { createUser, isLoading: isCreateUserLoading } = useCreateUser();

  const [isTimerStarted, setIsTimerStarted] = useState(false);
  // @TODO 타이머가 완료되었을때 로직 구현한다.
  const [_, setIsTimerExpired] = useState(false);
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);
  const timerId = useRef<NodeJS.Timer>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [isUserCreated, setIsUserCreated] = useState(false);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (isTimerStarted) {
        setMin(parseInt(String(time.current / 60)));
        setSec(time.current % 60);
        time.current -= 1;
      }
    }, 1000);

    return () => clearInterval(timerId.current);
  });

  useEffect(() => {
    if (time.current <= 0) {
      setIsTimerExpired(true);
      setMin(0);
      setSec(0);
      clearInterval(timerId.current);
    }
  }, [sec]);

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Form.Root
        className="mt-30 flex w-full flex-col gap-y-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const { email, code } = Object.fromEntries(
            new FormData(event.currentTarget)
          );

          const { data } = await emailAuthValidate({
            email: email as string,
            code: code as string,
          });

          // 인증 횟수 초과시 로그인 페이지로 이동한다.
          if (data.code === "F001") {
            alert(data.message);
            router.push("/login");
            return;
          }

          // 인증 시간 만료
          if (data.code === "F003") {
            alert(data.message);
            return;
          }

          if (!data.data.valid) {
            alert("인증 코드가 틀렸습니다.");
            return;
          }

          if (data.data.valid) {
            const { data } = await createUser({ email: email as string });
            if (data.data) {
              setIsUserCreated(true);
              setDialogOpen(true);
            }
          }
        }}
        encType="multipart/form-data"
      >
        <Form.Field className="grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-900">
              이메일
            </Form.Label>
            <Form.Message className="text-10" match="valueMissing">
              이메일을 입력해주세요
            </Form.Message>
          </div>
          <div className="flex h-50 w-full items-center gap-x-4 rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500">
            <Form.Control asChild>
              <input
                className="flex h-full w-full items-center focus:outline-none"
                type="email"
                required
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Form.Control>
            <div className="flex h-32 w-82 items-center justify-center rounded-4 bg-gray-200 px-16 py-9">
              <button
                className="text-14 font-semibold text-gray-900"
                onClick={async () => {
                  const errorMsg = getErrorMsg(email);
                  if (errorMsg) {
                    alert(errorMsg);
                    return;
                  }
                  sendEmailAuth({ email });
                  setDialogOpen(true);
                  setIsTimerStarted(true);
                  setMin(5);
                  setSec(0);
                  time.current = 300;
                }}
              >
                보내기
              </button>
            </div>
          </div>
        </Form.Field>
        <Form.Field className="grid" name="code">
          <div className="flex items-baseline justify-between">
            <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-900">
              인증코드
            </Form.Label>
            <Form.Message className="text-10" match="valueMissing">
              인증코드를 입력해주세요
            </Form.Message>
          </div>
          <div className="flex h-50 w-full items-center gap-x-4 rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500">
            <Form.Control asChild>
              <input
                className="flex h-full w-full items-center focus:outline-none"
                required
                placeholder="인증코드를 입력해주세요"
              />
            </Form.Control>
            <span className="text-14 font-semibold text-gray-900">
              {`${String(min).padStart(2, "0")}:${String(sec).padStart(
                2,
                "0"
              )}`}
            </span>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <button
            className="mt-30 flex h-44 w-full items-center justify-center rounded-8 border-1 bg-purple-100"
            disabled={isCreateUserLoading}
          >
            <span className="text-14 font-semibold leading-14 text-white">
              {isCreateUserLoading ? "인증 중 입니다..." : "인증하기"}
            </span>
          </button>
        </Form.Submit>
      </Form.Root>
      <Dialog.Portal>
        {!isUserCreated && <EmailSendedDialog />}
        {isUserCreated && <UserCreatedDialog />}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const getErrorMsg = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.length > 30) {
    return "이메일은 30자 이내로 입력해주세요";
  } else if (!emailRegex.test(email)) {
    return "유효한 이메일을 입력해주세요";
  } else {
    return "";
  }
};
