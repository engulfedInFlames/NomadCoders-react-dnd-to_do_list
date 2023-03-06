import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { minutesState, secondsSelector } from "../atoms";
import React from "react";

const Input = styled.input`
  font-size: 24px;
`;

function Root() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [seconds, setSeconds] = useRecoilState(secondsSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(event.currentTarget.value);
  };
  const onSecondsChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSeconds(event.currentTarget.value);
  };
  const onFocus = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };
  return (
    <>
      <Input
        onChange={onMinutesChange}
        onFocus={onFocus}
        value={minutes}
        type="text"
        placeholder="Minutes"
      />
      <Input
        onChange={onSecondsChange}
        onFocus={onFocus}
        value={seconds}
        type="text"
        placeholder="Seconds"
      />
    </>
  );
}

export default Root;
