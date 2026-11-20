"use client";

import { Button, ButtonSize, ButtonVariant, TextField } from "@ssc/ui";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "react-toastify";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "@bprogress/next";
import { signIn, getSession, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import CustomToast from "~/app/components/CustomToast";

type Inputs = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().email({ message: "یک آدرس ایمیل معتبر وارد کنید" }),
  password: z.string().min(1, { message: "رمز عبورتان را وارد کنید" }),
});

const LoginContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (params.get("error")) {
      toast.error("ورود انجام نشد. دوباره تلاش کنید.");
    }
  }, [params]);

  const Authenticated = async () => {
    const session = await getSession();
    if (session.handshakeToken !== undefined) {
      router.push(`/redirecting?${params ? params.toString() : ""}`);
    } else {
      router.push("/");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signIn("github", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.ok) {
        // Get the session to access the tokens
        const session = await getSession();
        if (session?.user) {
          toast.success("با حساب گیت‌هاب وارد شدید. خوش آمدید!");
          router.push("/");
        }
      } else if (result?.error) {
        toast.error("ورود با گیت‌هاب انجام نشد. دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("github sign-in error:", error);
      toast.error("ورود با گیت‌هاب انجام نشد. دوباره تلاش کنید.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const clientId = params.get("client_id");
      const codeChallenge = params.get("code_challenge");
      const redirectUri = params.get("redirect_uri");

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        client_id: clientId,
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
        callbackUrl: "/",
      });
      if (res.status === 200) {
        toast.success("خوش آمدید!");
        Authenticated();
      } else if (res.status === 401) {
        toast.error("ایمیل یا رمز عبور درست نیست. هر دو را بررسی کنید.");
      } else {
        toast.error("ورود انجام نشد. دوباره تلاش کنید.");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("ورود انجام نشد. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      if (session.status === "authenticated") {
        const redirectUri = params.get("redirect_uri");
        if (redirectUri && redirectUri !== "null") {
          try {
            const response = await fetch("/api/auth/authorize-refresh", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              const data = await response.json();
              if (data.success) {
                router.push(
                  `/redirecting?${
                    params ? params.toString() : ""
                  }&handshake_token=${data.handshakeToken}`
                );
              } else {
                toast.error("تأیید هویت انجام نشد. دوباره وارد شوید.");
              }
            } else {
              toast.error("تأیید هویت انجام نشد. دوباره وارد شوید.");
            }
          } catch (error) {
            console.error("Error handling OAuth redirect:", error);
            toast.error("تأیید هویت انجام نشد. دوباره وارد شوید.");
          }
        }
      }
    };

    handleOAuthRedirect();
  }, [session, params, router]);

  return (
    <>
      <div className="w-full flex justify-end">
        <Button
          className="mb-6 text-whiteText"
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          label="صفحه اصلی"
          suffixIcon={MdArrowBack}
          onClick={() => router.push("/")}
        />
      </div>
      <form className="flex flex-col gap-5 h-max" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">ورود</h1>
          <p className="text-sm leading-7 text-muted">
            حساب کاربری ندارید؟{" "}
            <Link
              href={{
                pathname: "/register",
                query: Object.fromEntries(params.entries()),
              }}
              className="ssc-inline-link"
            >
              ثبت‌نام کنید
            </Link>
          </p>
        </div>

        <TextField
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          label="ایمیل"
          placeholder="ایمیلتان را وارد کنید"
          errorText={errors.email?.message}
          disabled={isLoading}
          required
          {...register("email")}
        />

        <TextField
          name="password"
          id="password"
          type="password"
          autoComplete="current-password"
          label="رمز عبور"
          placeholder="رمز عبورتان را وارد کنید"
          errorText={errors.password?.message}
          disabled={isLoading}
          required
          {...register("password")}
        />
        <div className="flex flex-col gap-5 pt-2">
          <p className="text-whiteText">
            رمزتان را فراموش کرده‌اید؟{" "}
            <Link
              className="ssc-inline-link"
              href="/forget-password"
            >
              بازیابی رمز عبور
            </Link>
          </p>
          <div className="w-full flex flex-col gap-4">
            <Button
              className="w-full"
              variant={ButtonVariant.PRIMARY}
              label="ورود"
              loading={isLoading}
              type="submit"
            />
            <div className="w-full flex gap-3.5">
              {/* <Button
                className="w-full bg-secondary-background text-whiteText bg-secondary-background text-whiteText"
                variant={ButtonVariant.OUTLINE}
                label="ورود با گیت‌هاب"
                onClick={handleGithubSignIn}
              /> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center h-64">
          <div className="text-center text-whiteText">در حال بارگذاری...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
};

export default Page;
