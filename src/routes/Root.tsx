import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import reset from "styled-reset";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import DragabbleCard from "../components/DraggableCard";
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
    // setToDos((cur) => {
    //   if (!destination) return cur;
    //   let copy = [...cur];
    //   copy.splice(source.index, 1);
    //   copy.splice(destination?.index, 0, draggableId);
    //   return copy;
    // });
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
