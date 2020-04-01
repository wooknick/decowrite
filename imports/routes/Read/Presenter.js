import React, { useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Slider from "react-slick";
import ContentCell from "../../components/ContentCell";

const emotionColor = [
  ["rgba(242, 216, 179, 0.2)", "rgba(242, 216, 179, 0.4)"],
  ["rgba(38, 0, 38, 0.15)", "rgba(38, 0, 38, 0.3)"]
];

const breatheColorFrames = emotion => keyframes`
    0%{
      /* background-color: rgba(242,216,179,0.3); */
      background-color: ${emotionColor[emotion][0]};
    }
    50%{
      background-color: ${emotionColor[emotion][1]};
      /* background-color: rgba(242,216,179,0.5); */
    }
    100%{
      background-color: ${emotionColor[emotion][0]};
      /* background-color: rgba(242,216,179,0.3); */
    }
`;

const breatheColor = props => css`
  animation: ${breatheColorFrames(props.emotion)} 3s linear infinite;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${props => props.emotion > -1 && breatheColor}
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
`;

const ELink = styled(Link)`
  flex: 0.2;
  display: flex;
  justify-content: center;
`;

const Back = styled.div`
  width: 50px;
  height: 50px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

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

const Title = styled.div`
  width: 200px;
  height: 50px;
  font-size: 20px;
  flex: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.active && fadeIn}
`;

const Content = styled.div`
  width: 100%;
  height: 60%;
  min-height: 480px;
`;

const ESlider = styled(Slider)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
`;

const Pages = styled.div`
  display: flex;
  justify-content: center;
`;

const PageMoveTo = styled.div`
  width: 80px;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const Presenter = ({
  history,
  title,
  contents,
  index,
  emotions: getEmotions
}) => {
  const sliderRef = useRef();
  const [page, setPage] = useState(0);
  const [emotion, setEmotion] = useState(-1);
  const emotions = index.length === 0 ? getEmotions : [-1, ...getEmotions];

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: true,
    initialSlide: 0,
    swipeToSlide: true,
    touchThreshold: 5,
    afterChange: index => {
      setPage(index);
      setEmotion(emotions[index]);
    }
  };

  return (
    <Wrapper emotion={emotion}>
      <Header>
        <ELink to="/lists">
          <Back>
            <i className="fas fa-caret-left"></i>
          </Back>
        </ELink>
        <Title active={page > 0}>{page > 0 && <span>{title}</span>}</Title>
      </Header>
      <Content>
        <ESlider ref={sliderRef} {...settings}>
          <ContentCell text={title} type={"cover"} />
          {index.length > 0 && <ContentCell text={index} type={"index"} />}
          {contents &&
            contents.map((content, i) => {
              if (content.isChapterCover) {
                return (
                  <ContentCell
                    key={i * 100}
                    text={content.text}
                    type="chapCover"
                    chap_num={content.chapter_num}
                  />
                );
              }
              return <ContentCell key={i} text={content.text} />;
            })}
        </ESlider>
      </Content>
      <Footer>
        <PageMoveTo
          onClick={() => {
            sliderRef.current.slickPrev();
          }}
        />
        <Pages>
          {page > 0 && (
            <span>
              {page} / {contents.length + 1}
            </span>
          )}
        </Pages>
        <PageMoveTo
          onClick={() => {
            sliderRef.current.slickNext();
          }}
        />
      </Footer>
    </Wrapper>
  );
};

export default Presenter;
