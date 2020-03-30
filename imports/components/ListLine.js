import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const STATUS = {
  WAITING: "대기중",
  ONGOING: "분석진행중",
  CANCEL: "취소됨",
  SUCCESS: "게시중",
  DELETED: "삭제됨"
};

const Wrapper = styled.div`
  width: 75%;
  height: 60px;
  background-color: white;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px ${props => props.theme.darkBlue} solid;
`;

const Title = styled.div`
  /* width: 350px; */
  height: 50px;
  font-size: 15px;
  display: flex;
  align-items: flex-end;
  padding-left: 15px;
`;

const Status = styled.div`
  width: 100px;
  height: 50px;
  font-size: 15px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 15px;
`;

const ListLine = withRouter(({ bookId, title, status, history }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Status>{STATUS[status]}</Status>
    </Wrapper>
  );
});

export default ListLine;
