import React, { useEffect, useState } from "react";
import styles from "components/atoms/Select/Select.module.scss";

interface SelectProps {
  name: string;
  options: string[];
  label?: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  initialValue?: string;
}

const Select = ({
  name,
  label,
  options,
  placeholder = "Select",
  onChange,
  initialValue = "",
}: SelectProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}:</label>}
      <select
        value={value}
        className="select"
        name={name}
        id={name}
        onChange={handleChange}
      >
        <option value={""} hidden disabled>
          {initialValue || placeholder}
        </option>
        {options.map((option) => (
          <option defaultValue={option} key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
