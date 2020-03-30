import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Button from "../components/Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const BackButton = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Read = withRouter(({ history, match }) => {
  const bookId = match.params.bookId;
  const [data, setData] = useState([]);

  useEffect(() => {
    Meteor.call("file.getOneBook", { _id: bookId }, (err, res) => {
      if (err) {
        console.log(err);
        return;
      } else {
        setData(res.data);
      }
    });
  }, []);

  return (
    <Wrapper>
      <Contents>{`Read (제목 : ${data.title})`}</Contents>
      <Link to="/lists">
        <Button text={"돌아가기"} />
      </Link>
    </Wrapper>
  );
});

export default Read;
