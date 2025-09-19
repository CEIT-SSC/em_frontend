"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { HiX } from "react-icons/hi";

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      }
    }, "image/jpeg");
  });
};

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteHandler = useCallback(
    (croppedArea: Area, croppedAreaPixels: PixelCrop) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
        onClose();
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="bg-[--MainGray] rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-whiteText">
            ویرایش عکس پروفایل
          </h3>
          <Button
            variant={ButtonVariant.TEXT}
            className="text-whiteText p-1"
            onClick={onClose}
            suffixIcon={HiX}
          />
        </div>

        <div className="relative w-full h-64 mb-4 bg-black rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={onZoomChange}
            showGrid={false}
            cropShape="round"
          />
        </div>

        <div className="mb-4">
          <label className="block text-whiteText text-sm mb-2">زوم</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gradient-to-r 
                       [&::-webkit-slider-thumb]:from-[#ff715b] [&::-webkit-slider-thumb]:to-[#cb48b7] 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-gradient-to-r 
                       [&::-moz-range-thumb]:from-[#ff715b] [&::-moz-range-thumb]:to-[#cb48b7] 
                       [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full 
                       [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            label="لغو"
            onClick={onClose}
            className="flex-1 text-white"
          />
          <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            label="ذخیره"
            onClick={showCroppedImage}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
