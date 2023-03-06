import { atom, selector } from "recoil";

export const minutesState = atom({
  key: "minutes",
  default: "",
});

export const secondsSelector = selector({
  key: "seconds",
  get: ({ get }) => {
    const value = Number(get(minutesState));
    const m = value === 0 ? "" : String(value * 60);

    return m;
  },
  set: ({ set }, newValue) => {
    const result = Number(newValue) / 60;
    const m = result === 0 ? "" : String(result);
    set(minutesState, m);
  },
});
