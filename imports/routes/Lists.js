import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import WriterButton from "../components/WriterButton";
import AppContext from "../components/AppContext";
import LogoutButton from "../components/LogoutButton";
import ListCard from "../components/ListCard";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.div`
  width: 100vw;
  max-width: 550px;
  height: ${props => (props.isLoggedIn ? "130px" : "100px")};
  background-color: white;
  position: fixed;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const LoginInfo = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListCards = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${props => (props.isLoggedIn ? "130px" : "100px")};
  overflow-y: scroll;
`;

const MyLink = styled(Link)`
  position: absolute;
  bottom: 50px;
  margin: 0;
  padding: 0;
`;

const FlatLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.darkBlue};
`;

const Lists = withRouter(({ history }) => {
  const { user, userId, isLoggedIn, nickname } = useContext(AppContext);
  const [datum, setDatum] = useState([]);

  useEffect(() => {
    Meteor.call("file.getAllBooks", (err, res) => {
      if (err) {
        console.log(err);
        return;
      } else {
        setDatum(res.data);
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        <Header isLoggedIn={isLoggedIn}>
          <FlatLink to="/">
            <Title> 지금 읽기 좋은 이야기 </Title>
          </FlatLink>
          {isLoggedIn && nickname && (
            <LoginInfo>
              <div>{`환영합니다. ${nickname} 님!`}</div>
              <LogoutButton height={"30px"} width={"90px"} />
            </LoginInfo>
          )}
        </Header>
        <ListCards isLoggedIn={isLoggedIn}>
          {datum.map(data => {
            const { _id: bookId, title, author, updatedAt } = data;
            return (
              <ListCard
                key={bookId._str}
                bookId={bookId._str}
                title={title}
                author={author}
                updatedAt={updatedAt}
              />
            );
          })}
        </ListCards>
      </Wrapper>

      {isLoggedIn && (
        <MyLink to="/mypage">
          <WriterButton />
        </MyLink>
      )}
    </>
  );
});

export default Lists;
