import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import Button from "../components/Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 667px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.darkBlue};
`;

const Header = styled.div`
  width: 80%;
  height: 40px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Home = styled.div`
  width: 15%;
  height: 30px;
  flex-basis: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const Form = styled.div`
  width: 80%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 100%;
      margin-top: 20px;
    }
    input:nth-last-child(2) {
      margin-bottom: 20px;
    }
  }
`;

const StatusMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const SignIn = withRouter(({ history }) => {
  const id = useInput("");
  const pw = useInput("");
  const [loginMessage, setLoginMessage] = useState("");

  const onSubmit = e => {
    Meteor.loginWithPassword({ username: id.value }, pw.value, (err, res) => {
      if (err) {
        console.debug(err);
        if (err.reason === "User not found") {
          setLoginMessage("사용자가 없습니다.");
        } else if (err.reason === "Incorrect password") {
          setLoginMessage("잘못된 비밀번호입니다.");
        }
        return;
      } else {
        history.push("/lists");
        return;
      }
    });
    return;
  };

  return (
    <Wrapper>
      <Header>
        <Link to="/">
          <Home>
            <i className="fas fa-angle-left"></i>
          </Home>
        </Link>
        <Title>작가 로그인</Title>
      </Header>
      <Form>
        <form onSubmit={onSubmit}>
          <Input placeholder={"아이디를 입력해주세요."} {...id} />
          <Input
            placeholder={"비밀번호를 입력해주세요."}
            type="password"
            autoComplete="current-password"
            {...pw}
          />
          <Button
            bgColor={props => props.theme.blue}
            text={"→"}
            width={"100%"}
            disabled={!(id.value && pw.value)}
          />
        </form>
      </Form>
      <StatusMessage>{loginMessage}</StatusMessage>
    </Wrapper>
  );
});

export default SignIn;
