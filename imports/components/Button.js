import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.bgColor};
  color: ${props =>
    props.bgColor === "white" ? props.theme.darkBlue : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  box-shadow: 2px 2px 4px 1px #00000029;
  &:hover {
    cursor: ${props => (props.disabled ? "default" : "pointer")};
  }
`;

const Button = ({
  width = "110px",
  height = "40px",
  text,
  onClick,
  bgColor = "white",
  disabled
}) => (
  <Container
    width={width}
    height={height}
    onClick={onClick}
    bgColor={disabled ? "grey" : bgColor}
    disabled={disabled}
  >
    {text}
  </Container>
);

export default Button;
