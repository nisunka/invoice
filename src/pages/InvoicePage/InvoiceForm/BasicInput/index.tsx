import { ChangeEvent } from "react";
import ErrorMessage from "../ErrorMessage";

interface IBasicInput {
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onBlur(e: ChangeEvent<HTMLInputElement>): void;
  name: string;
  title: string;
  value: string;
  placeholder: string;
  error?: string;
  touched?: boolean; 
}

const BasicInput = (props: IBasicInput) => {
  const { onChange, onBlur, name, title, value, placeholder, error, touched } = props;

  // const [count, setCount] = useState(0);
  // const maxCount = 210;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange(e);
  //   setCount(e.target.value.length);
  // };

  return (
    <>
      <div className="form__wrapper form__wrapper--add">
        <div className="form__left">
          <span className="form__item-title">{title}</span>
        </div>
        <div className="form__right">
          <input
            // onChange={handleChange}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            className="form__item-input"
            type="text"
            placeholder={placeholder}
          />
          {/* <div className="position__counter">{`${count} / ${maxCount}`}</div> */}
          <ErrorMessage error={error} touched={touched}/>
        </div>
      </div>
    </>
  );
};

export default BasicInput;
