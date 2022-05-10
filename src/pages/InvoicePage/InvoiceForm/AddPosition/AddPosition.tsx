import { ChangeEvent, useState } from "react";
import Tooltip from "../Tooltip";
import { ReactComponent as TooltipImg } from "assets/img/tooltip.svg";
import "./AddPosition.css";
import { measureItems, ndsItems } from "./constants";
interface IAddPosition {
  values: {
    title: string;
    count: number;
    what: string;
    price: string;
    nds: number;
    total: number;
  };
  index: number;
  onChange(e: ChangeEvent<HTMLElement>): void;
  onBlur(e: ChangeEvent<HTMLElement>): void;
}

export const AddPosition = (props: IAddPosition) => {
  const { values, index, onChange, onBlur } = props;

  const [count, setCount] = useState(0);
  const maxCount = 500;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setCount(e.target.value.length);
  };

  // console.log(count, "count");
  
  return (
    <div className="add-position">
      <div className="position">
        <div className="position__top">
          <input
            className="position__top-input"
            type="text"
            placeholder="Название товара или услуги"
            name={`positions[${index}].title`}
            value={values?.title}
            onChange={handleChange}
            onBlur={onBlur}
          />
          <div className="position__counter">{`${count} / ${maxCount}`}</div>
        </div>

        <div className="position__bottom">
          <label className="position__item">
            <span className="position__item-name">Количество</span>
            <input
              className="position__item-value position__item--left"
              type="number"
              name={`positions[${index}].count`}
              value={values?.count}
              onChange={onChange}
              onBlur={onBlur}
            />
          </label>

          <label className="position__item">
            <span className="position__item-name">Ед. измер.</span>
            <select
              className="position__item-value"
              name={`positions[${index}].what`}
              value={values?.what}
              onChange={onChange}
              onBlur={onBlur}
            >
              {measureItems.map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="position__item">
            <span className="position__item-name">Цена</span>
            <input
              className="position__item-value"
              type="number"
              name={`positions[${index}].price`}
              value={values?.price}
              onChange={onChange}
              onBlur={onBlur}
              placeholder='0 ₽'
            />
            <div className="form__tooltip tooltip-price">
              <Tooltip
              message="Укажите цену с учётом НДС. Без НДС,
              если платите налоги по УСН. 
              Если у вас ОСНО и вы продаёте товары или услуги, освобождённые от уплаты НДС, выберите НДС 0%."
              position="right"
              key="tooltip-1">
                <TooltipImg />
              </Tooltip>
            </div>
          </label>

          <label className="position__item">
            <span className="position__item-name">НДС</span>
            <select
              className="position__item-value"
              name={`positions[${index}].nds`}
              value={values?.nds}
              onChange={onChange}
              onBlur={onBlur}
            >
              {ndsItems.map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="position__item">
            <span className="position__item-name position__item--last">
              Итого
            </span>
            <input
              className="position__item-value position__item--last position__item--right"
              type="number"
              name={`positions[${index}].total`}
              value={values?.total}
              onChange={onChange}
              onBlur={onBlur}
            />
          </label>
        </div>
      </div>
    </div>
  );
};


