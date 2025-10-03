import React, { useState } from "react";
import {
  Button,
  ButtonSize,
  ButtonVariant,
  TextField,
  Breadcrumb,
} from "@ssc/ui";
import { HiX, HiPlus, HiTrash, HiChevronLeft } from "react-icons/hi";
import Modal from "~/components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAppDispatch } from "~/core/store/store";
import { createTeamThunk } from "~/core/store/teams/teams.thunk";
import { toast } from "react-toastify";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamCreated?: () => void;
  teamNames: string[];
}

const emailSchema = z.object({
  email: z.string().email({ message: "ایمیل وارد شده معتبر نیست" }),
});

type EmailForm = z.infer<typeof emailSchema>;

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
  onTeamCreated,
  teamNames,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [teamMembers] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  });

  const currentEmail = watch("email");

  const handleAddInvite = async () => {
    const isValid = await trigger("email");
    if (isValid && currentEmail && !invitedEmails.includes(currentEmail)) {
      setInvitedEmails([...invitedEmails, currentEmail]);
      reset(); // Clear the form
    }
  };

  const handleRemoveInvite = (email: string) => {
    setInvitedEmails(invitedEmails.filter((e) => e !== email));
  };

  const handleNext = () => {
    if (currentStep === 1 && teamName.trim()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async () => {
    if (invitedEmails.length === 0) {
      toast.error("لطفا حداقل یک عضو برای تیم دعوت کنید");
      return;
    }
    if (teamName.trim()) {
      try {
        await dispatch(
          createTeamThunk({
            team_name: teamName,
            member_emails: invitedEmails,
          })
        ).unwrap();

        toast.success("گروه با موفقیت ساخته شده");
        onTeamCreated();
        handleClose();
      } catch (error) {
        if (error.status === 400) {
          console.log(error);
          if (teamNames?.includes(teamName))
            toast.error("تیم با این نام قبلا ایجاد شده است");
          else
            toast.error(
              "همه ی اعضا با ایمیل وارد شده باید در سایت انجمن اکانت داشته باشند"
            );
          return;
        }
        toast.error(error.response.data?.message || "خطا در ایجاد تیم");
      }
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setTeamName("");
    setInvitedEmails([]);
    reset(); // Reset the form
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-whiteText">ایجاد تیم جدید</h3>
          <Button
            variant={ButtonVariant.TEXT}
            className="text-whiteText p-1"
            onClick={handleClose}
            suffixIcon={HiX}
          />
        </div>

        <Breadcrumb
          steps={[
            {
              label: "اطلاعات تیم",
              isCompleted: currentStep > 1,
              isActive: currentStep === 1,
            },
            {
              label: "دعوت اعضا",
              isActive: currentStep === 2,
            },
          ]}
          className="mb-8"
          size="sm"
          activeStepClassName="ring-4 ring-purple-500/20 shadow-xl"
          completedStepClassName="ring-2 ring-green-500/30"
          connectorClassName="bg-gradient mb-6"
        />

        {currentStep === 1 && (
          <div className="space-y-4">
            <TextField
              label="نام تیم"
              id="teamName"
              name="teamName"
              type="text"
              value={teamName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTeamName(e.target.value)
              }
              placeholder="نام تیم خود را وارد کنید"
              required
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="bg-[#43434340] p-3 rounded-lg">
              <p className="text-whiteText text-sm">
                نام تیم: <span className="font-semibold">{teamName}</span>
              </p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 rounded p-2 mb-2 text-sm">
              توجه: پس از ایجاد تیم، امکان افزودن عضو جدید وجود ندارد.
            </div>

            <div className="space-y-2">
              <h4 className="text-whiteText font-semibold">دعوت اعضا</h4>
              <div className="flex gap-2">
                <TextField
                  label="ایمیل"
                  id="inviteEmail"
                  name="email"
                  type="email"
                  placeholder="ایمیل کاربر را وارد کنید"
                  errorText={errors.email?.message}
                  className="flex-1"
                  {...register("email")}
                />
                <Button
                  variant={ButtonVariant.SECONDARY}
                  size={ButtonSize.SMALL}
                  label="افزودن"
                  prefixIcon={HiPlus}
                  onClick={handleAddInvite}
                  className="mt-6"
                />
              </div>
              {invitedEmails.length > 0 && (
                <div className="space-y-1">
                  <p className="text-whiteText text-sm">کاربران دعوت شده:</p>
                  {invitedEmails.map((email) => (
                    <div
                      key={email}
                      className="flex justify-between items-center bg-[#43434340] p-2 rounded"
                    >
                      <span className="text-whiteText text-sm">{email}</span>
                      <Button
                        variant={ButtonVariant.TEXT}
                        className="text-red-400 p-1"
                        onClick={() => handleRemoveInvite(email)}
                        suffixIcon={HiTrash}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {teamMembers.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-whiteText font-semibold">اعضای تیم</h4>
                {teamMembers.map((member) => (
                  <div key={member} className="bg-[#43434340] p-2 rounded">
                    <span className="text-whiteText text-sm">{member}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {currentStep === 1 && (
            <>
              <Button
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SMALL}
                label="لغو"
                onClick={handleClose}
                className="flex-1 text-white hover:!bg-mainRed"
              />
              <Button
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.SMALL}
                label="مرحله بعدی"
                suffixIcon={HiChevronLeft}
                onClick={handleNext}
                className="flex-1"
                disable={!teamName.trim()}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <Button
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SMALL}
                label="مرحله قبلی"
                prefixIcon={HiChevronLeft}
                onClick={handleBack}
                className="flex-1 text-white"
              />
              <Button
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.SMALL}
                label="ایجاد تیم"
                disable={invitedEmails.length === 0}
                onClick={handleSubmit}
                className="flex-1"
              />
            </>
          )}
        </div>
      </>
    </Modal>
  );
};

export default CreateTeamModal;
