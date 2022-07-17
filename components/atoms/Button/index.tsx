import React, { PropsWithChildren } from "react";
import styles from "components/atoms/Button/Button.module.scss";

type ButtonProps = PropsWithChildren<{
  // ? "primary" | "secondary"
  type: "tertiary";
  onClick: () => void;
}>;

const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
