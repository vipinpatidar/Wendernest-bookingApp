import React from "react";

const Input = ({
  type,
  name,
  id,
  placeholder,
  className,
  value,
  onChangeHandler,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default Input;
