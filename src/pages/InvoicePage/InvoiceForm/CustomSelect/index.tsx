import styles from "./CustomSelect.module.scss";
import { useRef, useState } from "react";
import useOnClickOutside from "hooks/useClickoutside";

interface ICustomSelect {
  items: { value: string; icon: string }[];
  onChange(val: string): void;
}

const CustomSelect = ({ items, onChange }: ICustomSelect) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ value: "", icon: "" });

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div
      ref={ref}
      className={styles["custom_select"]}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div>
        {selected.value ? (
          <div className={styles["cusom_select_item"]}>
            <img src={selected.icon} alt="" /> <div> {selected.value}</div>
          </div>
        ) : (
          "Выберете из списка"
        )}
      </div>
      {open && (
        <div className={styles["custom_items"]}>
          {items.map(({ value, icon }, i) => (
            <div
              key={i}
              className={styles["cusom_select_item"]}
              onClick={() => {
                setSelected({ value, icon });
                onChange(value);
              }}
            >
              <img src={icon} alt="" /> <div> {value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
