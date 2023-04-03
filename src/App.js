import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";

// 더미리스트 렌더링 예시
/*  const dummyList = [
  {
    id: 1,
    author: "희진",
    content: "하이",
    emotion: 3,
    create_Date: new Date().getTime(),
    weather: "맑음",
  },
  {
    id: 2,
    author: "길동",
    content: "하이2",
    emotion: 1,
    create_Date: new Date().getTime(),
    weather: "흐림",
  },
  {
    id: 3,
    author: "아무개",
    content: "하이3",
    emotion: 4,
    create_Date: new Date().getTime(),
    weather: "비",
  },
];
*/

function App() {
  const [data, SetData] = useState([]);

  const dataId = useRef(0);

  //일기 추가되는 부분
  const onCreate = (author, content, emotion, weather) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      weather,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    SetData([newItem, ...data]);
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;