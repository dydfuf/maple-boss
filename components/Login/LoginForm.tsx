import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력해주세요" })
    .max(30, { message: "이메일은 30자 이내로 입력해주세요" }),
  password: z
    .string()
    .max(100, { message: "패스워드는 100자 이내로 입력해주세요" }),
});

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { callbackUrl } = router.query;
  const _callbackUrl = (callbackUrl as string) || "/boss";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const { email, password } = values;

    const response = await signIn("Credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push(_callbackUrl);
      return;
    }

    form.setError("email", {
      message: "아이디 혹은 비밀번호를 확인해주세요.",
    });
    form.setError("password", {
      message: "아이디 혹은 비밀번호를 확인해주세요.",
    });
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-40 w-full space-y-12"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  roundSize="full"
                  placeholder="이메일 입력"
                  className="text-gray4"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="ml-20" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  roundSize="full"
                  placeholder="비밀번호 입력"
                  className="text-gray4"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="ml-20" />
            </FormItem>
          )}
        />
        <Button
          roundSize="full"
          type="submit"
          label={isLoading ? "로그인 중..." : "로그인"}
          disabled={isLoading}
        />
      </form>
    </Form>
  );
}
