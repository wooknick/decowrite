import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import Button from "../components/Button";
import useDebounce from "../hooks/useDebounce";

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
  height: 350px;
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

const ValueCheck = styled.span`
  align-self: flex-end;
  font-size: 12px;
  color: ${props => (props.check ? "blue" : "red")};
  padding-right: 10px;
  margin-top: 5px;
`;

const SignUp = withRouter(({ history }) => {
  const id = useInput("");
  const pw = useInput("");
  const pw_check = useInput("");
  const nickname = useInput("");
  const [idConfirm, setIdConfirm] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  const debouncedId = useDebounce(id.value, 500);

  useEffect(() => {
    if (pw.value !== "" && pw.value === pw_check.value) {
      setPwConfirm(true);
    } else {
      setPwConfirm(false);
    }
  }, [pw_check.value]);

  useEffect(() => {
    if (debouncedId) {
      Meteor.call(
        "users.isExistUser",
        { username: debouncedId },
        (error, res) => {
          if (error) {
            console.debug(error);
          } else {
            if (res === false) {
              setIdConfirm(true);
            } else {
              setIdConfirm(false);
            }
          }
        }
      );
    }
  }, [debouncedId]);

  const onSubmit = e => {
    Accounts.createUser(
      {
        username: id.value,
        password: pw.value,
        profile: { nickname: nickname.value }
      },
      err => {
        if (err) {
          console.debug(err);
        } else {
          history.push("/lists");
        }
      }
    );
  };
  return (
    <Wrapper>
      <Header>
        <Link to="/">
          <Home>
            <i className="fas fa-angle-left"></i>
          </Home>
        </Link>
        <Title>작가 가입하기</Title>
      </Header>
      <Form>
        <form onSubmit={onSubmit}>
          <Input placeholder={"아이디를 입력해주세요."} {...id} />
          {id.value === "" ? (
            ""
          ) : idConfirm ? (
            <ValueCheck check={idConfirm}>사용가능한 아이디입니다.</ValueCheck>
          ) : (
            <ValueCheck check={idConfirm}>이미 가입된 아이디입니다.</ValueCheck>
          )}
          <Input
            placeholder={"비밀번호를 입력해주세요."}
            type="password"
            {...pw}
          />
          <Input
            placeholder={"비밀번호를 한 번 더 입력해주세요."}
            type="password"
            {...pw_check}
          />
          {pw_check.value === "" ? (
            ""
          ) : pwConfirm ? (
            <ValueCheck check={pwConfirm}>
              사용가능한 비밀번호입니다.
            </ValueCheck>
          ) : (
            <ValueCheck check={pwConfirm}>
              비밀번호를 다시 확인해주세요.
            </ValueCheck>
          )}
          <Input placeholder={"활동할 필명을 입력해주세요."} {...nickname} />
          <Button
            bgColor={props => props.theme.blue}
            text={"→"}
            width={"100%"}
            disabled={!pwConfirm || !idConfirm}
          />
        </form>
      </Form>
    </Wrapper>
  );
});

export default SignUp;
