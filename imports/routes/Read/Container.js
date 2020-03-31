import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Presenter from "./Presenter";

const Container = withRouter(({ history, match }) => {
  const bookId = match.params.bookId;
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [index, setIndex] = useState([]);
  const [emotions, setEmotions] = useState([-1]);

  const makeContents = chapters => {
    let ret = [];
    chapters.map(chapter => {
      // 챕터 커버
      if (chapter.chapter_name !== "none") {
        ret.push({
          isChapterCover: true,
          chapter_num: chapter.chapter_num,
          text: chapter.chapter_name,
          emotion: -1
        });
        setIndex(v => [...v, chapter.chapter_name]);
        setEmotions(v => [...v, -1]);
      }
      chapter.chapter_contents.map(item =>
        setEmotions(v => [...v, item.emotion])
      );
      ret = [...ret, ...chapter.chapter_contents];
    });
    setContents(ret);
    if (index.length === 0) {
      setEmotions(v => [-1, ...v]);
    }
  };

  useEffect(() => {
    Meteor.call("file.getOneBook", { _id: bookId }, (err, res) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const data = res.data;
        setTitle(data.title);
        makeContents(data.analysis.data);
      }
    });
  }, []);

  return (
    <Presenter
      history={history}
      title={title}
      contents={contents}
      index={index}
      emotions={emotions}
    />
  );
});

export default Container;
