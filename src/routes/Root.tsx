import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import reset from "styled-reset";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "../atoms";
import DroppableBoard from "../components/DroppableBoard";

/*
Code Challenge
1. Form 디자인하기 ✅
2. LocalStorage 만들어서 toDos 저장하기
3. 삭제 버튼 만들기
4. Board 바깥으로 드롭하면 삭제되는 기능 추가하기
5. Board의 순서도 바꿀 수 있는 기능 추가하기
6. Board 만들기 기능 추가하기

*/

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    width:100vw;
    height:100vh;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  align-items: center;
  gap: 30px;
  margin: 0 auto;
`;

function Root() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (dragInfo: DropResult) => {
    const { draggableId, destination, source } = dragInfo;
    if (!destination) return;
    setToDos((prev) => {
      const copyBoards: IToDoState = {};
      Object.keys(prev).forEach((key) => {
        copyBoards[key] = [...prev[key]]; // 깊은 복사로 원래 것을 참조하지 않게 한다.
      });
      const obj = copyBoards[source.droppableId][source.index];
      copyBoards[source.droppableId].splice(source.index, 1);
      copyBoards[destination.droppableId].splice(destination.index, 0, obj);
      return copyBoards;
    });

    // else if (destination.droppableId === source.droppableId) {
    //   setToDos((prev) => {
    //     const boardCopy = [...prev[destination.droppableId]];
    //     boardCopy.splice(source.index, 1);
    //     boardCopy.splice(destination.index, 0, draggableId);
    //     return {
    //       ...prev,
    //       [destination.droppableId]: boardCopy,
    //       // Key 값에 변수를 넣을려면 Square Bracket을 사용해야 한다.
    //       // 객체 안에서 중복된 키값은 마지막에 선언된 것을 기준으로 한다.
    //     };
    //   });
    // } else {
    //   setToDos((prev) => {
    //     const srcBoard = [...prev[source.droppableId]];
    //     const destBoard = [...prev[destination.droppableId]];
    //     srcBoard.splice(source.index, 1);
    //     destBoard.splice(destination.index, 0, draggableId);
    //     return {
    //       ...prev,
    //       [source.droppableId]: srcBoard,
    //       [destination.droppableId]: destBoard,
    //     };
    //   });
    // }
  };
  return (
    <Container>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(toDos).map((boardId) => (
          <DroppableBoard
            key={boardId}
            toDos={toDos[boardId]}
            boardId={boardId}
          />
        ))}
      </DragDropContext>
    </Container>
  );
}

export default Root;
