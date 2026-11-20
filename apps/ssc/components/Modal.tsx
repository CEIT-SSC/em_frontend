"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClose: () => void;
  label: string;
}

export default function Modal({ className, children, onClose, label }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog ref={dialog} aria-label={label} onCancel={event => { event.preventDefault(); event.stopPropagation(); onClose(); }} className={clsx("fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-foreground backdrop:bg-black/70", className)}>
      {children}
    </dialog>
  );
}
