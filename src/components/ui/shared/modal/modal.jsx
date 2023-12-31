import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../store";
import { useMediaQuery } from "react-responsive";

export const Modal = () => {
  const modal = useSelector((state) => state.modal);
  const { ModalContent, title, size, footer, ...otherProps } = modal.modalProps;
  const dispatch = useDispatch();
  const sizeClasses = {
    xs: "w-64 h-72",
    s: "w-1/2 h-auto",
    m: "w-3/4 h-2/3",
    l: "w-full h-3/4",
    xl: "w-full h-full max-w-screen-xl max-h-screen-90",
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const chosenSize = isMobile ? "xl" : size;

  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal.isOpen]);

  return (
    <AnimatePresence>
      {modal.isOpen && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`flex flex-col bg-white rounded-lg overflow-hidden ${
              sizeClasses[chosenSize] || sizeClasses.m
            }`}
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
          >
            {title && (
              <div className="px-4 py-2 border-b">
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            )}

            <div className="px-4 py-2 flex-grow overflow-y-auto">
              <ModalContent {...otherProps} />
            </div>

            {footer && <div className="px-4 py-2 border-t">{footer}</div>}

            <button
              onClick={() => dispatch(closeModal())}
              className="absolute top-0 right-0 px-4 py-2 text-lg font-bold"
            >
              X
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
