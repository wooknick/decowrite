import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const Wrapper = styled.div`
  width: 90%;
  height: 150px;
  background-color: ${props => props.theme.whiteBlue};
  margin-bottom: 25px;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 2px 2px 4px 1px ${props => props.theme.darkBlue};
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 23px;
  font-weight: bold;
`;

const Info = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

const Date = styled.span``;

const Author = styled.span``;

const ListCard = withRouter(({ bookId, title, author, updatedAt, history }) => {
  const onClickHandle = () => {
    history.push(`/read/${bookId}`);
  };

  console.log();
  return (
    <Wrapper onClick={onClickHandle}>
      <Title>{title}</Title>
      <Info>
        <Date>
          {moment(moment(updatedAt).diff(moment.now())).get("date") > 2
            ? moment(updatedAt).format("YYYY.MM.DD")
            : moment(updatedAt).fromNow()}
        </Date>
        <Author>{`${author} 작가`}</Author>
      </Info>
    </Wrapper>
  );
});

export default ListCard;
