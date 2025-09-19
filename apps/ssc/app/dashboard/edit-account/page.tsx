"use client";

import { Button, ButtonSize, ButtonVariant, TextField } from "@ssc/ui";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { ImageCropModal } from "./components/ImageCropModal";
import { PasswordChangeModal } from "./components/PasswordChangeModal";
import CustomToast from "../../components/CustomToast";
import { clientApi } from "~/core/api/client/clientApi";
import { signOut } from "next-auth/react";

type EditAccountInputs = {
  email: string;
  firstName: string;
  lastName: string;
  oldPassword?: string;
  newPassword?: string;
};

const editAccountSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "ایمیل الزامی است" })
      .email({ message: "فرمت ایمیل صحیح نیست" }),
    firstName: z
      .string()
      .min(1, { message: "نام الزامی است" })
      .min(2, { message: "نام باید حداقل 2 کاراکتر باشد" })
      .max(150, { message: "نام باید حداکثر 150 کاراکتر باشد" }),
    lastName: z
      .string()
      .min(1, { message: "نام خانوادگی الزامی است" })
      .min(2, { message: "نام خانوادگی باید حداقل 2 کاراکتر باشد" })
      .max(150, { message: "نام خانوادگی باید حداکثر 150 کاراکتر باشد" }),
    oldPassword: z.string().optional().or(z.literal("")),
    newPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.oldPassword && data.oldPassword.length > 0;
      }
      return true;
    },
    {
      message: "برای تغییر رمز عبور، رمز فعلی را وارد کنید",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.oldPassword && data.oldPassword.length > 0) {
        return data.newPassword && data.newPassword.length > 0;
      }
      return true;
    },
    {
      message: "برای تغییر رمز عبور، رمز جدید را وارد کنید",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword.length >= 6;
      }
      return true;
    },
    {
      message: "رمز عبور جدید باید حداقل 6 کاراکتر باشد",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (
        data.oldPassword &&
        data.newPassword &&
        data.oldPassword.length > 0 &&
        data.newPassword.length > 0
      ) {
        return data.oldPassword !== data.newPassword;
      }
      return true;
    },
    {
      message: "رمز عبور جدید نمی‌تواند مثل رمز عبور فعلی باشد",
      path: ["newPassword"],
    }
  );

const Page = () => {
  const session = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [pendingFormData, setPendingFormData] =
    useState<EditAccountInputs | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = session.data?.user;

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    watch,
  } = useForm<EditAccountInputs>({
    resolver: zodResolver(editAccountSchema),
    mode: "onBlur",
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      oldPassword: "",
      newPassword: "",
    },
  });

  const oldPassword = watch("oldPassword");

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
    if (user?.firstName) {
      setValue("firstName", user.firstName);
    }
    if (user?.lastName) {
      setValue("lastName", user.lastName);
    }
    if (user?.image && !profileImage) {
      setProfileImage(user.image);
    }
  }, [user, setValue, profileImage]);

  if (session.status !== "authenticated") {
    return <div>Loading...</div>;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(
          <CustomToast
            title="خطا"
            message="حجم فایل نباید از 5 مگابایت بیشتر باشد"
          />
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setTempImageSrc(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setProfileImage(croppedImageUrl);
    toast.error(<CustomToast title="خطا" message="خطا هنگام آپلود عکس" />);
    // toast.success(<CustomToast title="موفق" message="عکس پروفایل آپدیت شد" />);
  };

  const onSubmit: SubmitHandler<EditAccountInputs> = async (data) => {
    // Check if user is trying to change password
    if (data.oldPassword && data.newPassword) {
      // Show confirmation modal before proceeding
      setPendingFormData(data);
      setIsPasswordChangeModalOpen(true);
      return;
    }

    // If no password change, proceed directly
    await processFormSubmission(data);
  };

  const processFormSubmission = async (data: EditAccountInputs) => {
    setIsSubmitting(true);

    try {
      const _updateData = {
        email: data.email.trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        oldPassword: data.oldPassword || undefined,
        newPassword: data.newPassword || undefined,
        profileImage: profileImage !== user?.image ? profileImage : undefined,
      };

      await clientApi.profile.editProfile(
        _updateData.firstName,
        _updateData.lastName,
        _updateData.email
      );

      if (_updateData.oldPassword && _updateData.newPassword) {
        await clientApi.auth.changePassword(
          _updateData.oldPassword,
          _updateData.newPassword
        );

        // Sign out user after password change
        toast.success(
          <CustomToast
            title="موفق"
            message="رمز عبور با موفقیت تغییر یافت. در حال خروج از حساب کاربری..."
          />
        );

        // Wait a bit for the toast to show, then sign out
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 2000);

        return;
      }

      toast.success(
        <CustomToast
          title="موفق"
          message="اطلاعات حساب کاربری با موفقیت آپدیت شد"
        />
      );

      setValue("oldPassword", "");
      setValue("newPassword", "");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        <CustomToast
          title="خطا"
          message="خطا در آپدیت اطلاعات. لطفا دوباره تلاش کنید"
        />
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChangeConfirm = async () => {
    if (pendingFormData) {
      setIsPasswordChangeModalOpen(false);
      await processFormSubmission(pendingFormData);
      setPendingFormData(null);
    }
  };

  const handlePasswordChangeCancel = () => {
    setIsPasswordChangeModalOpen(false);
    setPendingFormData(null);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-5xl font-bold">ویرایش حساب کاربری</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 py-8 md:px-4"
        noValidate
      >
        <div className="flex flex-col items-center gap-2.5">
          <Image
            width={128}
            height={128}
            src={profileImage || user?.image || "/default-profile.png"}
            alt="profile photo"
            className="w-32 h-32 rounded-full object-cover"
          />
          <Button
            size={ButtonSize.SMALL}
            className="border rounded-full"
            label="ویرایش عکس"
            onClick={() => fileInputRef.current?.click()}
            disable={isSubmitting}
            type="button"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <TextField
          id="email"
          name="email"
          type="email"
          dir={dirtyFields.email ? "ltr" : "rtl"}
          label="ایمیل"
          placeholder="ایمیل خود را وارد کنید"
          errorText={errors.email?.message}
          disabled={isSubmitting}
          required
          {...register("email")}
        />

        <div className="flex flex-col md:flex-row w-full gap-3">
          <TextField
            id="firstName"
            name="firstName"
            type="text"
            label="نام"
            placeholder="نام خود را وارد کنید"
            errorText={errors.firstName?.message}
            disabled={isSubmitting}
            required
            {...register("firstName")}
          />
          <TextField
            id="lastName"
            name="lastName"
            type="text"
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
            errorText={errors.lastName?.message}
            disabled={isSubmitting}
            required
            {...register("lastName")}
          />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-3">
          <TextField
            id="old-password"
            name="oldPassword"
            type="password"
            label="رمز فعلی"
            dir={dirtyFields.oldPassword ? "ltr" : "rtl"}
            placeholder="برای تغییر رمز وارد کنید"
            errorText={errors.oldPassword?.message}
            disabled={isSubmitting}
            {...register("oldPassword")}
          />
          <TextField
            id="new-password"
            name="newPassword"
            type="password"
            label="رمز جدید"
            dir={dirtyFields.newPassword ? "ltr" : "rtl"}
            placeholder="رمز جدید (حداقل 6 کاراکتر)"
            errorText={errors.newPassword?.message}
            disabled={isSubmitting || !oldPassword || oldPassword.length === 0}
            className={clsx({
              "opacity-40 text-gray-400 cursor-not-allowed":
                !oldPassword || oldPassword.length === 0,
            })}
            {...register("newPassword")}
          />
        </div>

        <div className="flex justify-center py-6 md:px-32">
          <Button
            className=" w-full"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.PRIMARY}
            label={isSubmitting ? "در حال آپدیت..." : "ویرایش اطلاعات"}
            type="submit"
            disable={isSubmitting}
            loading={isSubmitting}
          />
        </div>
      </form>

      <ImageCropModal
        isOpen={isCropModalOpen}
        imageSrc={tempImageSrc}
        onClose={() => setIsCropModalOpen(false)}
        onCropComplete={handleCropComplete}
      />

      <PasswordChangeModal
        isOpen={isPasswordChangeModalOpen}
        onClose={handlePasswordChangeCancel}
        onConfirm={handlePasswordChangeConfirm}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Page;
