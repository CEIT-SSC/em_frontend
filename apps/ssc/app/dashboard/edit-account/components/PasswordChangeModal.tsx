"use client";

import React from "react";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { HiX, HiExclamation } from "react-icons/hi";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="bg-[--MainGray] rounded-xl p-6 w-full max-w-md mx-4 bg-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-whiteText">تغییر رمز عبور</h3>
          <Button
            variant={ButtonVariant.TEXT}
            className="text-whiteText p-1"
            onClick={onClose}
            suffixIcon={HiX}
            disable={isLoading}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              <HiExclamation className="text-yellow-500 text-3xl" />
            </div>
            <div>
              <p className="text-whiteText text-lg font-medium mb-2">هشدار</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                بعد از تغییر رمز، از حسابتان خارج می‌شوید. برای ورود دوباره از
                رمز جدید استفاده کنید.
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            رمز عبورتان را تغییر دهیم؟
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            label="لغو"
            onClick={onClose}
            className="flex-1 text-white"
            disable={isLoading}
          />
          <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            label="تغییر رمز عبور"
            onClick={onConfirm}
            className="flex-1"
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
