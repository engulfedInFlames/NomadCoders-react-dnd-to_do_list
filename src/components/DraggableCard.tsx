import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  text-align: center;
  margin: 0 auto;
  margin-bottom: 15px;
  padding-left: 10px;
  box-shadow: 4px 4px 8px hsl(0deg 0% 0% / 0.25);
`;

interface IDragabbleCard {
  toDo: string;
  index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCard) {
  console.log("Rerendered");
  return (
    <Draggable draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
