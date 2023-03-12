import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";
import toDoStorage from "./toDoStorage";

interface IDragabbleCard {
  toDoId: number;
  toDoText: string;
  index: number;
}

const Card = styled.div<{ isDragging: Boolean }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  word-wrap: normal;
  white-space: nowrap;
  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.isDragging
      ? "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
      : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"};
`;

const DeleteBtn = styled.button<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}>`
  all: unset;
  position: absolute;
  right: 15px;
  font-size: 20px;
  padding: 6px 2px;
  border-radius: 4px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCard) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: any) => {
    // toDoStorage
    // setToDos((allBoards) => {
    //   return {
    //     ...allBoards,
    //     [boardId]: [task, ...allBoards[boardId]],
    //   };
    // });
    console.log(event.target);
  };
  return (
    <Draggable draggableId={String(toDoId)} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <DeleteBtn onClick={onClick}>❌</DeleteBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
