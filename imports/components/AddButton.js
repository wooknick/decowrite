import React, { useContext } from "react";
import styled, { keyframes, css } from "styled-components";

const littleMoveFrames = keyframes`
    0%{
    }
    50%{
        transform: translateY(10px);
    }
    100%{
    }
`;

const littleMove = css`
  animation: ${littleMoveFrames} 1.5s ease-in-out infinite;
`;

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
  ${littleMove};
  &:hover {
    cursor: pointer;
  }
`;

const AddButton = () => {
  return (
    <Wrapper>
      <i className="fas fa-plus"></i>
    </Wrapper>
  );
};

export default AddButton;
