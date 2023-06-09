import React, { useEffect, useRef, useState, useContext, memo } from "react";
import { DiaryDispatchContext } from "./App";

//저장하기 버튼을 눌렀을때 데이터 아이템 추가해주는 ~
const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  useEffect(() => {
    console.log("다이어리 렌더");
  });

  const [diary, setDiary] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  //이벤트 합치기
  const handleChangeDiary = (e) => {
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddButtonClick = () => {
    alert("일기가 추가되었어요!");
    return;
    console.log("추가될 일기 : ", diary);

    if (diary.author.length < 1) {
      //focus
      authorRef.current.focus();
      return;
    }

    if (diary.content.length < 5) {
      //focus
      contentRef.current.focus();
    }

    //초기화
    onCreate(diary.author, diary.content, diary.emotion, diary.weather);

    alert("일기가 성공적으로 추가되었습니다");

    setDiary({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  const authorRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <div className="DiaryEditor_container">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorRef}
          name="author"
          value={diary.author}
          onChange={handleChangeDiary}
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentRef}
          name="content"
          value={diary.content}
          onChange={handleChangeDiary}
          placeholder="일기"
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={diary.emotion}
          onChange={handleChangeDiary}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleAddButtonClick}>일기 저장하기 </button>
      </div>
    </div>
  );
};
export default memo(DiaryEditor);

//select 부분 감정점수
