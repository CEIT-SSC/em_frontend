import React, { useState } from "react";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { HiX, HiTrash, HiExclamation } from "react-icons/hi";
import Modal from "~/components/Modal";
import { useAppDispatch } from "~/core/store/store";
import { deleteTeamThunk } from "~/core/store/teams/teams.thunk";
import { toast } from "react-toastify";

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamDeleted?: () => void;
  teamId: number;
  teamName: string;
}

const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({
  isOpen,
  onClose,
  onTeamDeleted,
  teamId,
  teamName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteTeamThunk(teamId));

      toast.success("تیم با موفقیت حذف شد");
      onTeamDeleted?.();
      onClose();
    } catch (error) {
      toast.error((error as Error)?.message || "خطا در حذف تیم");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-whiteText">حذف تیم</h3>
        <Button
          variant={ButtonVariant.TEXT}
          className="text-whiteText p-1"
          onClick={onClose}
          suffixIcon={HiX}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex-shrink-0">
            <HiExclamation className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-red-400 font-semibold mb-1">هشدار حذف</h4>
            <p className="text-whiteText text-sm">
              آیا مطمئن هستید که می‌خواهید تیم{" "}
              <span className="font-semibold">&quot;{teamName}&quot;</span> را
              حذف کنید؟
            </p>
            <p className="text-gray-400 text-xs mt-2">
              این عملیات قابل بازگشت نیست و تمام اطلاعات تیم از سابقه تیم خواهد
              بود
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant={ButtonVariant.OUTLINE}
          size={ButtonSize.SMALL}
          label="لغو"
          onClick={onClose}
          className="flex-1 text-white hover:!bg-gray-600"
          disable={isLoading}
        />
        <Button
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          label={isLoading ? "در حال حذف..." : "حذف تیم"}
          prefixIcon={HiTrash}
          onClick={handleDelete}
          className="flex-1 !bg-red-500 hover:!bg-red-700"
          disable={isLoading}
        />
      </div>
    </Modal>
  );
};

export default DeleteTeamModal;
