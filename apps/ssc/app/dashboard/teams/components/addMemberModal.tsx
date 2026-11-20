import React, { useState } from "react";
import { Button, ButtonSize, ButtonVariant, TextField } from "@ssc/ui";
import { HiX, HiPlus } from "react-icons/hi";
import Modal from "~/components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAppDispatch } from "~/core/store/store";
import { addMemberThunk } from "~/core/store/teams/teams.thunk";
import { toast } from "react-toastify";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: () => void;
  teamId: number;
  teamName: string;
}

const emailSchema = z.object({
  email: z.string().email({ message: "یک آدرس ایمیل معتبر وارد کنید" }),
});

type EmailForm = z.infer<typeof emailSchema>;

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onMemberAdded,
  teamId,
  teamName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const currentEmail = watch("email");

  const handleAddMember = async () => {
    const isValid = await trigger("email");
    if (!isValid || !currentEmail) return;

    setIsLoading(true);
    try {
      await dispatch(
        addMemberThunk({
          teamId,
          memberData: { email: currentEmail },
        })
      );

      toast.success("عضو جدید به تیم اضافه شد");
      onMemberAdded?.();
      reset();
      onClose();
    } catch (error) {
      toast.error((error as Error)?.message || "عضو جدید اضافه نشد. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={handleClose} label="افزودن عضو">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-whiteText">افزودن عضو</h3>
        <Button
          variant={ButtonVariant.TEXT}
          className="text-whiteText p-1"
          onClick={handleClose}
          suffixIcon={HiX}
          aria-label="بستن"
        />
      </div>

      <div className="space-y-4">
        <div className="bg-[#43434340] p-3 rounded-lg">
          <p className="text-whiteText text-sm">
            تیم: <span className="font-semibold">{teamName}</span>
          </p>
        </div>

        <div className="space-y-2">
          <TextField
            label="ایمیل عضو جدید"
            id="memberEmail"
            name="email"
            type="email"
            placeholder="ایمیل هم‌تیمی‌تان را وارد کنید"
            errorText={errors.email?.message}
            {...register("email")}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant={ButtonVariant.OUTLINE}
          size={ButtonSize.SMALL}
          label="لغو"
          onClick={handleClose}
          className="flex-1 text-white hover:!bg-mainRed"
          disable={isLoading}
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          label={isLoading ? "در حال افزودن…" : "افزودن عضو"}
          prefixIcon={HiPlus}
          onClick={handleAddMember}
          className="flex-1"
          disable={!currentEmail || !!errors.email || isLoading}
        />
      </div>
    </Modal>
  );
};

export default AddMemberModal;
