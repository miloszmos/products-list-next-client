import { PropsWithChildren } from "react";
import styles from "components/atoms/Card/Card.module.scss";

const Card = ({ children }: PropsWithChildren) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
