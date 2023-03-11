import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: Boolean }>`
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  text-align: center;
  word-wrap: normal;
  white-space: nowrap;
  padding-left: 10px;
  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.isDragging
      ? "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
      : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"};
`;

interface IDragabbleCard {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCard) {
  console.log("Rerendered");
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
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
