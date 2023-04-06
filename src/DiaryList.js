import DiaryItem from "./DiaryItem.js";

const DiaryList = ({ onEdit, onRemove, diaryList }) => {
  const weatherList = ["맑음", "흐림", "비", "눈"];

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>

      <div>
        {diaryList.map((it) => {
          const weatherIndex = Math.floor(Math.random() * weatherList.length);
          const weather = weatherList[weatherIndex];

          return (
            <DiaryItem
              key={it.id}
              {...it}
              onEdit={onEdit}
              onRemove={onRemove}
              weather={weather}
            />
          );
        })}
      </div>
    </div>
  );
};

//props 지정 안해줘도 기본값으로 전달
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
