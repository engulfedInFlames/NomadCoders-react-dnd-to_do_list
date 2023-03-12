import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import toDoStorage from "./toDoStorage";
import styled from "styled-components";

interface IDroppableBoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IBoardProps {
  boardId: string;
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IForm {
  toDo: string;
}

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
  padding: 32px 0;
  box-shadow: 4px 16px 16px hsl(0deg 0% 0% / 0.25);
  list-style-type: none;
`;

const Title = styled.span`
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  width: 70%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  input {
    width: 100%;
    height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const Board = styled.div<IBoardProps>`
  width: 80%;
  min-height: 30vh;
  flex-grow: 1;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 60px;
  background-color: ${(props) =>
    props.boardId === "To do"
      ? props.isDraggingOver
        ? "#0984e3"
        : props.isDraggingFromThis
        ? "#74b9ff"
        : props.theme.boardColor
      : props.boardId === "Doing"
      ? props.isDraggingOver
        ? "#f39c12"
        : props.isDraggingFromThis
        ? "#ffeaa7"
        : props.theme.boardColor
      : props.isDraggingOver
      ? "#2ecc71"
      : props.isDraggingFromThis
      ? "#c1fad3"
      : props.theme.boardColor};
  border-radius: 8px;
  padding: 24px 0;
  transition: background-color 0.2s ease-in-out;
`;

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onSubmit = ({ toDo }: IForm) => {
    const task = {
      id: Date.now(),
      text: toDo,
    };

    // 세션 스토리지에 task 저장
    if (toDoStorage.getItem(boardId)) {
      const tasks = [task, ...JSON.parse(toDoStorage.getItem(boardId)!)];
      const filteredTasks = tasks.filter(
        (task) => Object.keys(task).length !== 0
      );
      toDoStorage.setItem(boardId, JSON.stringify(filteredTasks));
    } else {
      toDoStorage.setItem(boardId, JSON.stringify([task]));
    }
    // 입력 받은 task를 board에 저장
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [task, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const inputPlaceholder =
    boardId === "To do"
      ? "What should I do?"
      : boardId === "Doing"
      ? "What am I doing?"
      : "What did I finish?";

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={inputPlaceholder}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Board
            boardId={boardId}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
