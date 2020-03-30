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
  background-color: white;
  box-shadow: 2px 2px 3px 1px ${props => props.theme.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  ${littleMove};
  &:hover {
    cursor: pointer;
  }
`;

const WriterButton = () => {
  return (
    <Wrapper>
      <i className="fas fa-pen"></i>
    </Wrapper>
  );
};

export default WriterButton;
