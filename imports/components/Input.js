import React from "react";
import styled from "styled-components";

const Container = styled.input`
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: white;
  height: 45px;
  font-size: 12px;
  padding: 0px 15px;
  color: ${props => props.theme.darkBlue};
  /* -webkit-appearance: none; */
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  autoComplete = "off",
  disabled = false
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    autoComplete={autoComplete}
    disabled={disabled}
  />
);

export default Input;
