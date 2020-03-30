import React, { useRef, useContext, useState } from "react";
import styled from "styled-components";
import ConfirmButton from "./ConfirmButton";
import CancelButton from "./CancelButton";
import Input from "./Input";
import useInput from "../hooks/useInput";
import AppContext from "./AppContext";

const Wrapper = styled.div`
  width: 95%;
  max-width: 495px;
  height: 80%;
  min-height: 600px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0px;
  color: ${props => props.theme.darkBlue};
`;

const Title = styled.div`
  height: 40px;
  font-size: 25px;
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 30px;
`;

const Contents = styled.div`
  width: 90%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30px;
  form {
    width: 100%;
    input {
      width: 100%;
    }
    input[type="file"] {
      visibility: hidden;
    }
  }
`;

const Line = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const LineTitle = styled.div`
  height: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const UploadButton = styled.label`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background-color: ${props => props.theme.blue};
  color: white;
  display: flex;
  font-weight: bold;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const FunctionLine = styled.div`
  width: 140px;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const BookUpload = ({ setUploadModal, onClick }) => {
  const title = useInput("");
  const fileName = useInput("");
  const fileRef = useRef();
  const { user, userId, isLoggedIn, nickname } = useContext(AppContext);

  const handleCancel = () => {
    setUploadModal(v => !v);
  };

  const handleUpload = e => {
    if (e.target.files.length > 0) {
      const name = e.target.files[0].name;
      fileName.setValue(name);
    } else {
      fileName.setValue("");
    }
  };

  const handleSubmit = e => {
    if (title.value === "" || fileRef.current.value === "") {
      alert("모든 필드를 입력하셔야 합니다.");
      return;
    }
    const file = fileRef.current.files[0];
    var reader = new FileReader();
    reader.onload = e => {
      Meteor.call(
        "file.upload",
        {
          title: title.value,
          author: nickname,
          userId,
          fileData: e.target.result
        },
        (err, res) => {
          if (err) {
            console.log(err);
            return;
          } else {
            // console.log(res); // upload book's ObjectID
            setUploadModal(v => !v);
          }
        }
      );
    };
    reader.readAsText(file);
  };

  return (
    <Wrapper onClick={onClick}>
      <Title>소설 업로드</Title>
      <Contents>
        <form>
          <Line>
            <LineTitle>제목</LineTitle>
            <Input placeholder="제목을 입력해주세요." {...title} />
          </Line>
          <Line>
            <LineTitle>파일</LineTitle>
            <Input
              placeholder="아래 버튼을 눌러 파일을 업로드해주세요."
              disabled={true}
              {...fileName}
            />
          </Line>
          <UploadButton htmlFor="file">파일 업로드</UploadButton>
          <input type="file" id="file" onChange={handleUpload} ref={fileRef} />
        </form>
      </Contents>

      <FunctionLine>
        <ConfirmButton onClick={handleSubmit} />
        <CancelButton onClick={handleCancel} />
      </FunctionLine>
    </Wrapper>
  );
};

export default BookUpload;
