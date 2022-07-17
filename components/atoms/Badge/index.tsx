import { PropsWithChildren } from "react";
import styles from "components/atoms/Badge/Badge.module.scss";

const Badge = ({ children }: PropsWithChildren) => {
  return <div className={`${styles.badge} badge`}>{children}</div>;
};

export default Badge;
