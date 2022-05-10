import React, { useState } from "react";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import { AddPosition } from "./AddPosition/AddPosition";
import BasicInput from "./BasicInput";
import {
  accountItems,
  initialInvoiceValues,
  invoiceValidation,
} from "./constants";
import { ReactComponent as PlusIcon } from "assets/img/plus.svg";
import { ReactComponent as MiniPlusIcon } from "assets/img/miniPlus.svg";
import { ReactComponent as TooltipImg } from "assets/img/tooltip.svg";
import CustomSelect from "./CustomSelect";
import ErrorMessage from "./ErrorMessage";

import Tooltip from "./Tooltip";
import "./InvoiceForm.css";

export const InvoiceForm: React.FC = () => {
  const formik = useFormik({
    initialValues: initialInvoiceValues,
    validationSchema: invoiceValidation,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });
  const [positions, setPositions] = useState([{}]);

  return (
    <div className="invoice-form__container">
      <form className="invoice-form__form form" onSubmit={formik.handleSubmit}>
        <div className="form__item">
          <h3 className="form__title">Счёт</h3>
          <div className="form__wrapper form__border-wrapper border-wrapper-radius">
            <div className="form__left">
              <span className="form__item-title">Выберете счёт</span>
            </div>
            <div className="form__right">
              <CustomSelect
                onChange={(value) =>
                  formik.setFieldValue("choiceAccount", value)
                }
                items={accountItems}
              />

              <ErrorMessage
              error={formik.errors.choiceAccount}
              touched={formik.touched.choiceAccount}
              />
            </div>
          </div>
        </div>
      <div className="form__item">
        <h3 className="form__title">Контрагент</h3>
        <div className="form__border-wrapper border-wrapper-radius">
         
          <BasicInput
            name="partnerName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.partnerName}
            title="Данные контрагента"
            placeholder="Укажите ИНН или ФИО"
          />
          {/* <ErrorMessage
            error={formik.errors.partnerName}
            touched={formik.touched.partnerName}
          /> */}
        </div>
      </div>
        <div className="form__item">
          <h3 className="form__title">Позиции</h3>
          {positions.map((_, i) => {
            const errors = formik.errors.positions;
            const touched = formik.touched.positions;

            return (
              <div key={i}>
                <AddPosition
                  values={formik.values.positions[i]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  index={i}
                />
                <ErrorMessage
                  error={errors ? Object.values(errors[i])[0] : ""}
                  touched={touched ? Object.values(touched[i])[0] : false}
                />
              </div>
            );
          })}
          <div className="add-position__btn-box">
            <button
              type="button"
              className="btn-reset add-position__btn"
              onClick={() => setPositions((prev) => [...prev, {}])}
            >
              <MiniPlusIcon />
              <span className="add-position__btn-text">Добавить позицию</span>
            </button>
          </div>
        </div>

        <div className="form__item">
          <h3 className="form__title">Дополнительно</h3>
          <div className="form__border-wrapper top-border-radius">
            <BasicInput
                name="additional.base"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.additional.base}
                title={"Основание"}
                placeholder="Необязательно"
                error={formik.errors.additional?.base}
                touched={formik.touched.additional?.base}
            />

            <div className="form__tooltip">
              <Tooltip message="Укажите документ, на основании которого вы выставляете счёт" position="right" key="tooltip-2">
                <TooltipImg />
              </Tooltip>
            </div>
          </div>
          <div className="form__border-wrapper">
            <BasicInput
              name="additional.name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.additional.name}
              title={"Должность и ФИО заказчика"}
              placeholder="Необязательно"
              error={formik.errors.additional?.name}
              touched={formik.touched.additional?.name}
            />
          </div>
          <div className="form__border-wrapper">
            <BasicInput
              name="additional.priceNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.additional.priceNumber}
              title={"Номер выставляемого счёта"}
              placeholder="Необязательно"
              error={formik.errors.additional?.priceNumber}
              touched={formik.touched.additional?.priceNumber}
            />
          </div>
          <div className="form__wrapper form__border-wrapper">
            <div className="form__left">
              <span className="form__item-title">Дата выставления</span>
            </div>
            <div className="form__right">
              <div className="form__right-box">
                <InputMask
                  className="form__item-input"
                  type="text"
                  placeholder="дд.мм.гггг"
                  mask="99.99.9999"
                  name="additional.dataOfCreation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.additional.dataOfCreation}
                />
              </div>
                <ErrorMessage
                error={formik.errors.additional?.dataOfCreation}
                touched={formik.touched.additional?.dataOfCreation}
                />
              </div>
          </div>
          <div className="form__wrapper form__border-wrapper bottom-border-radius">
            <div className="form__left">
              <span className="form__item-title">Срок оплаты</span>
            </div>
            <div className="form__tooltip">
                <Tooltip
                message="Укажите срок, в течение которого
                контрагент должен оплатить счёт. Если деньги не придут вовремя,
                мы отметим счёт в общем списке. 

                Этот срок будет отражаться только
                в интернет-банке, контрагент его
                не увидит."
                position="right"
                key="tooltip-3">
                  <TooltipImg />
                </Tooltip>
              </div>
            <div className="form__right">
              <div className="form__right-box">
              <InputMask
                className="form__item-input"
                type="text"
                placeholder="дд.мм.гггг"
                mask="99.99.9999"
                name="additional.deadLine"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.additional.deadLine}
              />

              <ErrorMessage
              error={formik.errors.additional?.deadLine}
              touched={formik.touched.additional?.deadLine}
              />
            </div>
          </div>
              </div>
        </div>
        <div className="form__wrapper form__add-sign">
          <span className="form__item-title form__add-title">Добавить подпись или печать</span>
          <input
            className="switch"
            type="checkbox"
            name="withApproved"
            onChange={formik.handleChange}
            value={formik.values.withApproved ? "true" : "false"}
          ></input>
        </div>
        {formik.values.withApproved && (
          <div className="form__add-sign--active add-sign">
            <label className="add-sign__label">
              <div className="add-sign__svg-box">
                <PlusIcon />
              </div>
              <label htmlFor="upload-photo" className="upload-label"></label>
              <input
                id="upload-photo"
                accept="image/png, image/gif, image/jpeg"
                onChange={formik.handleChange}
                name="photo"
                value={formik.values.photo}
                type="file"
                className="uploadPhoto"
              />
              <span className="add-sign--download">
                {formik.values.photo || "Загрузить файл"}
              </span>
              <span className="add-sign--rules">
                JPG, PNG, PDF, TIFF, до 20 Мб
              </span>
            </label>
          </div>
        )}
        <button className="form__btn btn-reset" type="submit">
        Проверить и <span className="media-change">создать</span><span className="media-change-desc">выставить</span>
        </button>

      </form>
    </div>
  );
};
