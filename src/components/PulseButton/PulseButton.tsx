import { FC } from "react";

import "./pulse-button.style.scss";

interface PulseButtonProps {
  onClick: () => void;
}

export const PulseButton: FC<PulseButtonProps> = ({ onClick }) => {
  return (
    <button className="pulse-button" onClick={onClick}>
      +
    </button>
  );
};
