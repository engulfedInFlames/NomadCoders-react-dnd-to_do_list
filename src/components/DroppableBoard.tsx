import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

interface IDroppableBoardProps {
  toDos: string[];
  boardId: string;
}
interface IBoardProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Board = styled.div<IBoardProps>`
  width: 80%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#a4b0be"
      : props.isDraggingFromThis
      ? "#dfe4ea"
      : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;

const Title = styled.span`
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  max-width: 450px;
  min-height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.theme.boardColor};
  color: white;
  font-size: 24px;
  padding: 15px 0;
  box-shadow: 4px 16px 16px hsl(0deg 0% 0% / 0.25);
  list-style-type: none;
`;

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
