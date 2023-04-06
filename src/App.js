import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useEffect, useRef, useState } from "react";

function App() {
  const [data, SetData] = useState([]);

  const dataId = useRef(0);

  //json데이터 가져오기
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //json으로 가져온 데이터 사용하기
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        weather: "Sunny",
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    SetData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  //리스트 삭제
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    SetData(newDiaryList);
  };

  // 수정 기능
  const onEdit = (targetId, newContent) => {
    SetData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  //기분이 좋은지 안좋은지에 대한 비율 뽑는 함수
  const getDiaryAnalysis = () => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    const goodWeather = data.filter((it) => it.weather === "맑음").length;
    const badWeather = data.length - goodWeather;

    return { goodCount, badCount, goodRatio, goodWeather, badWeather };
  };

  const { goodCount, badCount, goodRatio, goodWeather, badWeather } =
    getDiaryAnalysis();

  //렌더링
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <div>날씨 좋은 일기 개수 : {goodWeather}</div>
      <div>날씨 안좋은 일기 개수 : {badWeather}</div>

      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    </div>
  );
}

export default App;
