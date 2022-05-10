import styles from "./ErrorMessage.module.scss";

interface IErrorMessage {
  error?: string;
  touched?: boolean;
}

const ErrorMessage = ({ error, touched }: IErrorMessage) => (
  <div className={styles["error_message"]}>{error && touched && error}</div>
);

export default ErrorMessage;
