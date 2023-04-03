//props으로 일기 리스트 받아오기

const DiaryItem = ({ author, content, emotion, id, create_Date, weather }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          <br />
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(create_Date).toLocaleDateString()}
        </span>
        <span className="weather"> | 날씨 : {weather}</span>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;
