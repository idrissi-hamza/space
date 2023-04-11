'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryActionLabel,
  secondaryAction,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose(), 300;
    });
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          bg-neutral-800/70 md:flex items-center  "
      >
        <div className=" relative w-full max-w-2xl mx-auto h-full md:h-auto rounded-lg ">
          <div
            className={`translate duration-300 h-full w-full
        ${
          showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
          >
            <div
              className="  translate h-full border-0  rounded-lg 
              shadow-lg relative flex flex-col w-full    bg-white  "
            >
              {/* HEADER */}
              <div
                className=" flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]"
              >
                <button
                  onClick={handleClose}
                  className="  p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6 ">
                <div className="flex items-center self-start gap-4 now-full  ">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      Icon={IoMdClose}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    Icon={IoMdClose}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
