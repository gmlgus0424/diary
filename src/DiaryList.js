import DiaryItem from "./DiaryItem.js";

const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>

      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} /> //스프레드 연산자로 보여주기
        ))}
      </div>
    </div>
  );
};

//props 지정 안해줘도 기본값으로 전달
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;