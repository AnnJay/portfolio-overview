import { FC, ReactNode } from "react";
import "./modal.style.scss";

interface SimpleModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const SimpleModal: FC<SimpleModalProps> = ({
  isModalOpen,
  onClose,
  children,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
