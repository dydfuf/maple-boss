import { zodResolver } from "@hookform/resolvers/zod";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";
import { z } from "zod";
import Button from "components/common/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "components/common/Form";
import Input from "components/common/Input";
import PopupContent from "components/common/PopupContent";
import PopupButtonGroup from "components/common/PopupContent/PopupButtonGroup";
import PopupTitle from "components/common/PopupContent/PopupTitle";
import Text from "components/common/Text";
import useCreateUser from "hooks/user/useCreateUser";
import useEmailAuth from "hooks/user/useEmailAuth";
import useEmailAuthValidate from "hooks/user/useEmailAuthValidate";

const emailSchema = z
  .string()
  .email({ message: "유효한 이메일을 입력해주세요" })
  .max(30, { message: "이메일은 30자 이내로 입력해주세요" });
const codeSchema = z.string().min(1, { message: "인증코드를 입력해주세요" });

const emailFormSchema = z.object({
  email: emailSchema,
});

const codeFormSchema = z.object({
  code: codeSchema,
});

export default function RegisterVerificationForm() {
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const [authSendedEmail, setAuthSendedEmail] = useState("");
  const authSended = authSendedEmail !== "";

  const [authSendedAlertOpen, setAuthSendedAlertOpen] = useState(false);

  const { sendEmailAuth } = useEmailAuth();

  const { minutes, seconds, restart } = useTimer({
    expiryTimestamp: new Date(),
  });

  const { emailAuthValidate } = useEmailAuthValidate();
  const { createUser, isLoading: isCreateUserLoading } = useCreateUser();

  const [userCreatedAlertOpen, setUserCreatedAlertOpen] = useState(false);

  const onEmailFormSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    const { email } = values;
    setAuthSendedEmail(email);
    setAuthSendedAlertOpen(true);

    const time = new Date();
    time.setSeconds(time.getSeconds() + 60 * 5);
    restart(time);

    await sendEmailAuth({ email });
  };

  const router = useRouter();

  const onCodeFormSubmit = async (values: z.infer<typeof codeFormSchema>) => {
    const { code } = values;

    const { data } = await emailAuthValidate({
      email: authSendedEmail,
      code,
    });

    // 인증 횟수 초과시 로그인 페이지로 이동한다.
    if (data.code === "F001") {
      alert(data.message);
      router.push("/login");
      return;
    }

    if (data.code === "F003") {
      alert(data.message);
      return;
    }

    if (!data.data.valid) {
      alert("인증 코드가 틀렸습니다.");
      return;
    }

    if (data.data.valid) {
      const { data } = await createUser({ email: authSendedEmail });

      // 이미 가입된 이메일일 경우 로그인 페이지로 이동한다.
      if (data.code === "F004") {
        alert(data.message);
        router.push("/login");
        return;
      }

      if (data.data) {
        setUserCreatedAlertOpen(true);
      }
    }
  };

  return (
    <>
      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(onEmailFormSubmit)}
          className="mt-40 w-full space-y-12"
        >
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    roundSize="full"
                    placeholder="이메일을 입력해주세요"
                    className="text-gray4"
                    wrapperClassName="!py-10 !pr-10"
                    {...field}
                    readOnly={authSended}
                    innerButton={
                      <Button
                        type="submit"
                        textSize={1}
                        roundSize="full"
                        label="보내기"
                        className="flex !h-30 !w-auto shrink-0 !px-10 !py-4"
                        disabled={authSended}
                      />
                    }
                  />
                </FormControl>
                <FormMessage className="ml-20" />
              </FormItem>
            )}
          />
        </form>
        <Form {...codeForm}>
          <form
            onSubmit={codeForm.handleSubmit(onCodeFormSubmit)}
            className="mt-12 w-full space-y-12"
          >
            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      roundSize="full"
                      placeholder="인증코드를 입력해주세요"
                      className="text-gray4"
                      {...field}
                      innerButton={
                        <Text
                          className="text-error"
                          size={3}
                        >{`${minutes}:${seconds
                          .toString()
                          .padStart(2, "0")}`}</Text>
                      }
                    />
                  </FormControl>
                  <FormMessage className="ml-20" />
                </FormItem>
              )}
            />
            <Button
              roundSize="full"
              type="submit"
              label={`${
                isCreateUserLoading ? "인증 중 입니다..." : "회원가입"
              }`}
              disabled={!authSended || isCreateUserLoading}
            />
          </form>
        </Form>
      </Form>
      <AlertDialog.Root
        open={authSendedAlertOpen}
        onOpenChange={setAuthSendedAlertOpen}
      >
        <PopupContent>
          <PopupTitle
            title={`인증코드가 발송되었습니다.\n이메일을 확인해주세요.`}
            titleClassName="whitespace-pre text-center"
          />
          <div className="mt-20">
            <PopupButtonGroup />
          </div>
        </PopupContent>
      </AlertDialog.Root>
      <AlertDialog.Root
        open={userCreatedAlertOpen}
        onOpenChange={setUserCreatedAlertOpen}
      >
        <PopupContent>
          <PopupTitle
            title={`임시 비밀번호가 발송되었습니다.\n이메일을 확인해주세요.`}
            titleClassName="whitespace-pre text-center"
          />
          <div className="mt-20">
            <PopupButtonGroup
              onActionClick={() => {
                router.push("/login");
              }}
            />
          </div>
        </PopupContent>
      </AlertDialog.Root>
    </>
  );
}
