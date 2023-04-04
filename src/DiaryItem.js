//props으로 일기 리스트 받아오기

import { useRef, useState } from "react";

const DiaryItem = ({
  onRemove,
  author,
  content,
  emotion,
  id,
  create_date,
  weather,
  onEdit,
}) => {
  //값을 수정중인지 아닌지를 보관해서 놓을 isEdit
  const [isEdit, setIsEdit] = useState(false);

  //호출이 되는 순간 원래 isEdit이 가지고 있는 값을 반전함
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //수정폼 state로 핸들링
  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  //수정하고 초기화
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  //수정완료버튼 눌렀을때 처리하는~
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          <br />
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(create_date).toLocaleDateString()}
        </span>
        <span className="weather"> | 날씨 : {weather}</span>
      </div>

      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
