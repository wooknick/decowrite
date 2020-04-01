import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 400px;
  max-width: 100vw;
  height: 100%;
  min-height: 480px;
  display: flex;
  align-items: center;
  padding: 0px 40px;
`;

const DefaultCell = styled.div`
  span {
    font-size: 17px;
    line-height: 160%;
    word-break: keep-all;
  }
`;

const CoverCell = styled.div`
  width: 100%;
  height: 100%;
  span {
    font-size: 32px;
    font-weight: bold;
  }
`;

const IndexCell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    &:first-child {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    &:not(:first-child) {
      margin-bottom: 20px;
    }
  }
`;

const ChapCover = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    &:first-child {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:not(:first-child) {
      font-size: 20px;
    }
  }
`;

const ContentCell = ({ text, type = "default", chap_num }) => {
  // default: 기본 셀, cover: 표지, index: 목차, chapCover: 챕터표지
  if (type === "default") {
    return (
      <Wrapper>
        <DefaultCell>
          <span>{text}</span>
        </DefaultCell>
      </Wrapper>
    );
  } else if (type === "cover") {
    return (
      <Wrapper>
        <CoverCell>
          <span>{text}</span>
        </CoverCell>
      </Wrapper>
    );
  } else if (type === "index") {
    return (
      <Wrapper>
        <IndexCell>
          <span>INDEX</span>
          {text.map((item, i) => {
            return <span key={i}>{item}</span>;
          })}
        </IndexCell>
      </Wrapper>
    );
  } else if (type === "chapCover") {
    return (
      <Wrapper>
        <ChapCover>
          <span>Chap {chap_num}</span>
          <span>{text}</span>
        </ChapCover>
      </Wrapper>
    );
  }
};

export default ContentCell;
