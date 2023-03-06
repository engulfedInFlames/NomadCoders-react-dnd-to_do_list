import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

const Board = styled.ul`
  max-width: 450px;
  min-height: 40%;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 60px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.boardColor};
  color: white;
  font-size: 24px;
  padding: 15px 0;
  box-shadow: 4px 16px 16px hsl(0deg 0% 0% / 0.25);
  list-style-type: none;
`;

interface IDroppableBoard {
  toDos: string[];
  boardId: string;
}

function DroppableBoard({ toDos, boardId }: IDroppableBoard) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index} />
          ))}
          {magic.placeholder}
        </Board>
      )}
    </Droppable>
  );
}

export default DroppableBoard;
