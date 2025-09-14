"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ItemType, PresentationOverview } from "@ssc/core";
import PresentersAvatar from "../presentersAvatar/PresentersAvatar";
import { use, useEffect, useMemo, useState } from "react";
import {
  IoCloseOutline,
  IoTimeOutline,
  IoCartOutline,
  IoLocationOutline,
  IoLinkOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { Button, ButtonVariant, ButtonSize } from "@ssc/ui";
import { createPortal } from "react-dom";
import { useFormatter } from "lib/hooks/useFormatter";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import {
  cartLoadingSelector,
  itemInCartSelector,
} from "lib/store/cart/cart.selectors";
import clsx from "clsx";
import { MdDeleteOutline } from "react-icons/md";
import {
  addItemToCartThunk,
  removeItemFromCartThunk,
} from "lib/store/cart/cart.thunk";
import { toast } from "react-toastify";
import { useAuth } from "lib/hooks/useAuth";

interface WorkshopCardProps {
  workshopImage?: string;
  presentation: PresentationOverview;
}

// simple RTL detection (Persian/Arabic Unicode ranges)
const isRTL = (text?: string) =>
  !!text && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);

export function WorkshopCard({
  presentation,
  workshopImage,
}: WorkshopCardProps) {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  const { formatNumberToMoney } = useFormatter();
  const dispatch = useAppDispatch();
  const itemInCart = useAppSelector(
    itemInCartSelector(presentation.id, ItemType.PRESENTATION)
  );
  const buttonShouldBeDisabled = useAppSelector(cartLoadingSelector);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const isSelected = useMemo(() => {
    return itemInCart !== undefined;
  }, [itemInCart]);

  // Color palette
  const colorStripes = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddToCart = () => {
    if (buttonShouldBeDisabled) {
      if (!isAuthenticated) {
        toast.error("لطفا وارد حساب خود شوید");
      }
      return;
    }
    setButtonLoading(true);
    dispatch(
      addItemToCartThunk({
        item_type: ItemType.PRESENTATION,
        item_id: presentation.id,
      })
    )
      .unwrap()
      .catch()
      .finally(() => setButtonLoading(false));
  };

  const removeFromCart = () => {
    if (buttonShouldBeDisabled) return;
    setButtonLoading(true);
    dispatch(removeItemFromCartThunk(itemInCart.id))
      .unwrap()
      .catch()
      .finally(() => setButtonLoading(false));
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const titleIsRTL = isRTL(presentation.title);
  const descriptionIsRTL = isRTL(presentation.description);

  return (
    <>
      {/* Workshop Card */}
      <div className="w-full min-w-[250px] max-w-full bg-antd-bg-base dark:bg-antd-dark-bg-container rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Header Image with Stripes */}
        <div className="relative pt-[56.25%]">
          {/* Workshop Image */}
          <Image
            src={workshopImage || "/placeholder-workshop.jpg"}
            alt="workshop"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Colored Stripes */}
          <div className="absolute top-0 left-0 right-0 flex z-10">
            {colorStripes.map((color, index) => (
              <div
                key={index}
                className="h-1 flex-1"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* View Details Button */}
          <div className="absolute bottom-4 right-4">
            <Button
              onClick={() => setShowModal(true)}
              label="جزئیات بیشتر"
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.SMALL}
              prefixIcon={IoEyeOutline}
              className="!rounded-full !min-w-fit !leading-3 !pb-2.5 !h-fit bg-black/70 hover:bg-black/90 text-white border-none"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-3">
          {/* Title */}
          <h3
            dir={titleIsRTL ? "rtl" : "ltr"}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            className="text-lg font-semibold text-antd-text dark:text-antd-dark-text leading-6 overflow-hidden"
          >
            {presentation.title}
          </h3>

          {/* Description */}
          <p
            dir={descriptionIsRTL ? "rtl" : "ltr"}
            className="text-antd-text-secondary dark:text-antd-dark-text-secondary text-sm leading-6 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {presentation.description}
          </p>

          {/* Date and Time */}
          <div className="mt-auto flex items-center gap-2 text-antd-text-secondary dark:text-antd-dark-text-secondary">
            <IoTimeOutline size={16} className="text-antd-primary" />
            <span className="text-sm">
              {formatDateTime(presentation.start_time)}
            </span>
          </div>

          {/* Location/Link */}
          {presentation.location && !presentation.is_online && (
            <div className="flex items-center gap-2 text-antd-text-secondary dark:text-antd-dark-text-secondary">
              <IoLocationOutline size={16} className="text-antd-success" />
              <span className="text-sm">{presentation.location}</span>
            </div>
          )}
          {presentation.online_link && presentation.is_online && (
            <div className="flex items-center gap-2 text-antd-text-secondary dark:text-antd-dark-text-secondary">
              <IoLinkOutline size={16} className="text-antd-primary" />
              <span className="text-sm">{t("workshop.onlineLink")}</span>
            </div>
          )}

          {/* Presenters Label */}
          <p className="text-antd-text-secondary dark:text-antd-dark-text-secondary text-sm opacity-70">
            {t("workshop.presenters")}:
          </p>

          {/* Presenters */}
          <PresentersAvatar presenters={presentation.presenters_details} />

          {/* Price and Add to Cart */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-lg font-semibold text-antd-text dark:text-antd-dark-text">
              {presentation.is_paid
                ? `${formatNumberToMoney(presentation.price)} ${t(
                    "common.currency"
                  )}`
                : t("workshop.free")}
            </div>
            <Button
              onClick={isSelected ? removeFromCart : handleAddToCart}
              disable={!presentation.is_active || buttonShouldBeDisabled}
              variant={
                presentation.is_active
                  ? ButtonVariant.PRIMARY
                  : ButtonVariant.SECONDARY
              }
              size={ButtonSize.SMALL}
              prefixIcon={isSelected ? MdDeleteOutline : IoCartOutline}
              label={
                isSelected
                  ? t("workshop.removeFromCart")
                  : t("workshop.addToCart")
              }
              loading={buttonLoading}
              className={clsx("border-none", {
                "bg-antd-primary hover:bg-antd-primary-hover text-white":
                  presentation.is_active && !buttonShouldBeDisabled,
                "bg-gray-300 dark:bg-gray-600 text-white":
                  !presentation.is_active && !buttonShouldBeDisabled,
                "bg-red-500 text-white": isSelected && !buttonShouldBeDisabled,
              })}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999999] p-4">
            <div className="bg-antd-bg-elevated dark:bg-antd-dark-bg-elevated rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-antd-bg-elevated dark:bg-antd-dark-bg-elevated border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-start">
                <h2
                  dir={titleIsRTL ? "rtl" : "ltr"}
                  className="text-2xl font-bold text-antd-text dark:text-antd-dark-text pr-8"
                >
                  {presentation.title}
                </h2>
                <IoCloseOutline
                  onClick={() => setShowModal(false)}
                  size={36}
                  className="cursor-pointer text-antd-text-secondary dark:text-antd-dark-text-secondary hover:text-antd-text dark:hover:text-antd-dark-text !p-1 !min-w-fit"
                />
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Workshop Image */}
                {workshopImage && (
                  <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={workshopImage}
                      alt="workshop"
                      fill
                      className="object-cover"
                    />
                    {/* Colored Stripes */}
                    <div className="absolute top-0 left-0 right-0 flex">
                      {colorStripes.map((color, index) => (
                        <div
                          key={index}
                          className="h-1 flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Workshop Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-antd-text dark:text-antd-dark-text mb-3">
                        {t("workshop.description")}
                      </h3>
                      <p
                        dir={descriptionIsRTL ? "rtl" : "ltr"}
                        className="text-antd-text-secondary dark:text-antd-dark-text-secondary leading-7 whitespace-pre-line"
                      >
                        {presentation.description}
                      </p>
                    </div>

                    {/* Date and Time */}
                    <div>
                      <h3 className="text-lg font-semibold text-antd-text dark:text-antd-dark-text mb-3">
                        {t("workshop.schedule")}
                      </h3>
                      <div className="flex items-center gap-3 text-antd-text-secondary dark:text-antd-dark-text-secondary">
                        <IoTimeOutline
                          size={20}
                          className="text-antd-primary"
                        />
                        <span>{formatDateTime(presentation.start_time)}</span>
                      </div>
                    </div>

                    {/* Location */}
                    {presentation.location !== null && (
                      <div>
                        <h3 className="text-lg font-semibold text-antd-text dark:text-antd-dark-text mb-3">
                          Location
                        </h3>
                        {presentation.location && !presentation.is_online && (
                          <div className="flex items-center gap-3 text-antd-text-secondary dark:text-antd-dark-text-secondary">
                            <IoLocationOutline
                              size={20}
                              className="text-antd-success"
                            />
                            <span>{presentation.location}</span>
                          </div>
                        )}
                        {presentation.online_link && presentation.is_online && (
                          <div className="flex items-center gap-3 text-antd-text-secondary dark:text-antd-dark-text-secondary">
                            <IoLinkOutline
                              size={20}
                              className="text-antd-primary"
                            />
                            <span>{t("workshop.onlineLink")}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Presenters */}
                    <div>
                      <h3 className="text-lg font-semibold text-antd-text dark:text-antd-dark-text mb-3">
                        {t("workshop.presenters")}
                      </h3>
                      <PresentersAvatar
                        presenters={presentation.presenters_details}
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <h3 className="text-lg font-semibold text-antd-text dark:text-antd-dark-text mb-3">
                        {t("workshop.price")}
                      </h3>
                      <div className="text-2xl font-bold text-antd-text dark:text-antd-dark-text">
                        {presentation.is_paid
                          ? `${formatNumberToMoney(presentation.price)} ${t(
                              "common.currency"
                            )}`
                          : t("workshop.free")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-antd-bg-elevated dark:bg-antd-dark-bg-elevated border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
                <Button
                  onClick={() => {
                    handleAddToCart();
                    setShowModal(false);
                  }}
                  disable={!presentation.is_active}
                  variant={
                    presentation.is_active
                      ? ButtonVariant.PRIMARY
                      : ButtonVariant.SECONDARY
                  }
                  size={ButtonSize.MEDIUM}
                  prefixIcon={IoCartOutline}
                  label={
                    presentation.is_paid
                      ? t("workshop.addToCart")
                      : t("workshop.enroll")
                  }
                  className={`
                  ${
                    presentation.is_active
                      ? "bg-antd-primary hover:bg-antd-primary-hover text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                  }
                `}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
