import React, { FC, PropsWithChildren } from "react";
import styles from "./Label.module.css";

type LabelHTMLProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

const Label: FC<PropsWithChildren<LabelHTMLProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
