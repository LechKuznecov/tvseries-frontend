import React, { useState } from "react";
import * as S from "./TextField.style";

function TextField({
  value,
  labelText,
  placeholder,
  handleChange,
  type,
  minLength,
  maxLength,
}) {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <S.Label htmlFor={value} displayLabel={display}>
        {labelText}
      </S.Label>
      <S.Input
        type={type}
        id={value}
        minLength={minLength}
        maxLength={maxLength}
        required
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setDisplay(true)}
        onBlur={() => setDisplay(false)}
      ></S.Input>
    </>
  );
}

export default TextField;
