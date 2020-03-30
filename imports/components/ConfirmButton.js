import React, { useContext } from "react";
import styled, { keyframes, css } from "styled-components";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.theme.blue};
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const ConfirmButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <i className="fas fa-check"></i>
    </Wrapper>
  );
};

export default ConfirmButton;
