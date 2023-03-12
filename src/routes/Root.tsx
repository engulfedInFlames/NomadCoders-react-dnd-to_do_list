import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IToDoState, toDoState } from "../atoms";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableBoard from "../components/DroppableBoard";
import toDoStorage from "../components/toDoStorage";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

/*
Code Challenge
1. Form 디자인하기 ✅
2. LocalStorage 만들어서 toDos 저장하기 ✅
3. 삭제 버튼 만들기
4. Board 바깥으로 드롭하면 삭제되는 기능 추가하기
5. Board의 순서도 바꿀 수 있는 기능 추가하기
6. Board 만들기 기능 추가하기
*/

const GlobalStyle = createGlobalStyle`
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

type IStorageKey = string;

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
  const initialBoards = ["To do", "Doing", "Done"];

  useEffect(() => {
    setToDos((_) => {
      const newBoards: IToDoState = {};

      // Board가 하나도 없을 때는 initial boards를 보여준다.
      if (!toDoStorage.length) {
        initialBoards.forEach((title) => {
          console.log("Executed");
          toDoStorage.setItem(title, "[]");
        });
      }

      for (let i = 0; i < toDoStorage.length; i++) {
        const key = toDoStorage.key(i) as IStorageKey;
        const tasks = JSON.parse(toDoStorage.getItem(key) || "[]"); // JSON.parse에 arg로 string만 올 수 있기 때문에, null이나 undefined가 오지 않게 해야 한다.
        newBoards[key] = tasks;
      }
      return newBoards;
    });
  }, []);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;

    setToDos((oldBoards) => {
      const srcDroppableId = source.droppableId;
      const destDroppableId = destination.droppableId;
      const task = oldBoards[srcDroppableId][source.index];
      const newBoards: IToDoState = {};
      Object.keys(oldBoards).forEach((key) => {
        newBoards[key] = [...oldBoards[key]]; // 깊은 복사
      });

      // Boards 수정 및 Session storage 수정
      const newSrcBoard = newBoards[srcDroppableId].splice(source.index, 1);
      newBoards[destDroppableId].splice(destination.index, 0, { ...task });
      const newDestBoard = [...newBoards[destDroppableId]]; // splice는 아무 것도 제거하지 않으면 빈 배열을 반환한다.

      // Session storage 수정
      toDoStorage[srcDroppableId] = JSON.stringify([...newSrcBoard]);
      toDoStorage[destDroppableId] = JSON.stringify([...newDestBoard]);
      return newBoards;
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
