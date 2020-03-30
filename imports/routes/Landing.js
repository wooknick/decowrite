import React, { useState, useEffect, useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import AppContext from "../components/AppContext";
import LogoutButton from "../components/LogoutButton";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 667px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 25vh;
  padding-bottom: 50px;
  color: ${props => props.theme.darkBlue};
`;

const Logo = styled.div`
  width: 70%;
  height: 120px;
  display: flex;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: auto;
  max-height: 100%;
`;

const AuthorMenu = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const GuideText = styled.div`
  width: fit-content;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const fadeInFrames = keyframes`
    0%{
        opacity: 0;
        transform: translateY(10px);
        
    }
    100%{
        opacity: 1;
        transform: translateY(0px);
    }
`;

const fadeIn = props =>
  css`
    animation: ${fadeInFrames} 0.3s linear;
  `;

const MenuItems = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${props => props.active && fadeIn}
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.darkBlue};
  border: none;
`;

const Gate = styled.div`
  width: 120px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${fadeIn}
  &:hover {
    cursor: pointer;
  }
`;

const Landing = () => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const { user, userId, isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    const t = setTimeout(() => {
      setGateOpen(true);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const onClickHandle = () => {
    if (!isAuthor) {
      setIsAuthor(true);
    }
  };

  return (
    <Wrapper>
      <Logo>
        <LogoImg src="images/logo.png"></LogoImg>
      </Logo>
      {gateOpen && (
        <MyLink to={"/lists"}>
          <Gate>ENTER</Gate>
        </MyLink>
      )}
      {isLoggedIn ? (
        <LogoutButton />
      ) : (
        <AuthorMenu>
          <GuideText onClick={onClickHandle}>혹시 작가이신가요?</GuideText>
          {isAuthor && (
            <MenuItems active={isAuthor}>
              <MyLink to={"/signin"}>
                <Button text="로그인" />
              </MyLink>
              <MyLink to={"/signup"}>
                <Button text="가입하기" />
              </MyLink>
            </MenuItems>
          )}
        </AuthorMenu>
      )}
    </Wrapper>
  );
};

export default Landing;
