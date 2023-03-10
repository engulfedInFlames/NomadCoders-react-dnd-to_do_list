import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import reset from "styled-reset";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "../atoms";
import DroppableBoard from "../components/DroppableBoard";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    width:100vw;
    height:100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((prev) => {
      const copyBoards: IToDoState = {};
      Object.keys(prev).forEach((key) => {
        copyBoards[key] = [...prev[key]]; // 깊은 복사로 참조하지 않게 한다.
      });
      copyBoards[source.droppableId].splice(source.index, 1);
      copyBoards[destination.droppableId].splice(
        destination.index,
        0,
        draggableId
      );
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
