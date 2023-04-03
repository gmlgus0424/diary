import { useRef, useState } from "react";

//위에 글씨적으면 아래 고정 코드
const DiaryEditor = () => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
    weather: "",
  });

  //이벤트 합치기
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //focus
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      //focus
      contentInput.current.focus();
    }
    console.log(state);

    alert("저장 성공!");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
          placeholder="일기"
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <span>오늘의 날씨 : </span>
        <select
          name="weather"
          value={state.weather}
          onChange={handleChangeState}
        >
          <option value={1}>맑음</option>
          <option value={2}>흐림</option>
          <option value={3}>비</option>
          <option value={4}>구름 많음</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기 </button>
      </div>
    </div>
  );
};
export default DiaryEditor;

//select 부분 감정점수
