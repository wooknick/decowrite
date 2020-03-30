import React from "react";
import Button from "./Button";

const LogoutButton = ({ width, height }) => {
  const logout = () => {
    Meteor.logout();
  };

  return (
    <Button text="로그아웃" widhth={width} height={height} onClick={logout} />
  );
};

export default LogoutButton;
