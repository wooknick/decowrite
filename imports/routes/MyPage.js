import React, { useContext, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../components/AppContext";
import LogoutButton from "../components/LogoutButton";
import ListLine from "../components/ListLine";
import AddButton from "../components/AddButton";
import BookUpload from "../components/BookUpload";
import PythonShell from "../components/PythonShell";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.theme.darkBlue};
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

const ListLines = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${props => (props.isLoggedIn ? "130px" : "100px")};
  overflow-y: scroll;
`;

const ExtraFunction = styled.div`
  position: absolute;
  bottom: 50px;
  margin: 0;
  padding: 0;
`;

const PopOver = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.transparentBlack};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlatLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.darkBlue};
  width: 100%;
`;

const MyPage = withRouter(({ history }) => {
  const { user, userId, isLoggedIn, nickname } = useContext(AppContext);
  const [uploadModal, setUploadModal] = useState(false);
  const [datum, setDatum] = useState([]);

  useEffect(() => {
    Meteor.call("file.getMyBooks", { userId }, (err, res) => {
      if (err) {
        console.log(err);
        return;
      } else {
        setDatum(res.data);
      }
    });
  }, []);

  const handleUpload = () => {
    setUploadModal(v => !v);
  };
  const handlePopOver = () => {
    setUploadModal(v => !v);
  };

  return (
    <>
      <Wrapper>
        <Header isLoggedIn={isLoggedIn}>
          <FlatLink to="/lists">
            <Title> 내 소설 관리 </Title>
          </FlatLink>
          {isLoggedIn && nickname && (
            <LoginInfo>
              <div>{`환영합니다. ${nickname} 님!`}</div>
              <LogoutButton height={"30px"} width={"90px"} />
            </LoginInfo>
          )}
        </Header>
        <ListLines isLoggedIn={isLoggedIn}>
          {datum.map(data => {
            const { _id: bookId, title, status } = data;
            return (
              <ListLine
                key={bookId._str}
                bookId={bookId._str}
                title={title}
                status={status}
              />
            );
          })}
        </ListLines>
      </Wrapper>

      {isLoggedIn && (
        <ExtraFunction onClick={handleUpload}>
          <AddButton />
        </ExtraFunction>
      )}

      {uploadModal && (
        <PopOver onClick={handlePopOver}>
          <BookUpload
            onClick={e => {
              e.stopPropagation();
            }}
            setUploadModal={setUploadModal}
          />
        </PopOver>
      )}
    </>
  );
});

export default MyPage;
