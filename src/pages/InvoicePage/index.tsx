import React from "react";
import { InvoiceForm } from "./InvoiceForm";
import { ReactComponent as BackIcon } from "assets/img/arrowLeft.svg";
import { ReactComponent as CancelIcon } from "assets/img/cancel.svg";
import styles from "./InvoicePage.module.scss";

const InvoicePage: React.FC = () => {
  return (
    <div className={styles["invoice-page__container"]}>
      <div className={styles["invoice-page__header"]}>
        <button className={styles["invioce-page__btn"]}>
          <BackIcon />
        </button>
        <h2 className={styles["invoice-page__title"]}>Выставление счёта</h2>
        <button className={styles["invioce-page__btn"]}>
          <CancelIcon />
        </button>
      </div>
      <InvoiceForm />
    </div>
  );
};

export default InvoicePage;
