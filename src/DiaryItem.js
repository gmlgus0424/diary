//props으로 일기 리스트 받아오기

import React, { useRef, useState, useEffect, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, emotion, id, create_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  //리렌더링
  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
  });

  //값을 수정중인지 아닌지를 보관해서 놓을 isEdit
  const [isEditNow, setIsEditNow] = useState(false);

  //호출이 되는 순간 원래 isEdit이 가지고 있는 값을 반전함
  const toggleIsEditNow = () => setIsEditNow(!isEditNow);

  //수정폼 state로 핸들링
  const [localContent, setLocalContent] = useState(content);
  const localContentRef = useRef(null);

  const handleClickDelete = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  //수정하고 초기화
  const handleQuitEdit = () => {
    setLocalContent(content);
    toggleIsEditNow();
  };

  //수정완료버튼 눌렀을때 처리하는~
  const handleClickEdit = () => {
    if (localContent.length < 5) {
      localContentRef.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEditNow();
    }
  };

  return (
    <div className="DiaryItem_container">
      <div className="info">
        <span className="author_info">
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(create_date).toLocaleDateString()}
        </span>
      </div>

      <div className="content">
        {isEditNow ? (
          <>
            <textarea
              ref={localContentRef}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          content
        )}
      </div>
      {isEditNow ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleClickEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleClickDelete}>삭제하기</button>
          <button onClick={toggleIsEditNow}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
