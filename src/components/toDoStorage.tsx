// localStorage는 브라우저나 탭을 닫아도 데이터가 유지되나, sessionStorage는 브라우저나 탭을 닫으면 데이터가 사라진다.
const toDoStorage = window.sessionStorage;
// storage[0]에는 keys를 저장
// default keys로 "To do", "Doing", "Done"

export default toDoStorage;
