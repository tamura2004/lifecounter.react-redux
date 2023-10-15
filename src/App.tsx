import React from "react";
import styled from "styled-components";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

const Box = styled.div`
  border: solid gray 1px;
  border-radius: 0.5em;
  margin: 8px;
  padding: 8px;
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  background-color: dodgerblue;
`;

const TextBox = styled.div`
  font-size: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1 / 3;
  grid-row: 1;
  color: white;
`;

const Button = styled.button<{ col: string }>`
  border: 0;
  background-color: black;
  grid-column: ${p => p.col};
  grid-row: 1;
  opacity: 0;
  &:active {
    opacity: 0.3;
  }
`;

type Life = {
  life: number
}

const initialState: Life = {
  life: 20
}

const lifeSlice = createSlice({
  name: "life",
  initialState,
  reducers: {
    increment(state) { state.life++ },
    decrement(state) { state.life-- },
  }
});

const store = configureStore({ reducer: lifeSlice.reducer });

export const LifeCounter = () => {
  const life = useSelector((state: Life) => state.life);
  const dispatch = useDispatch();
  return (
    <Box>
      <TextBox>{life}</TextBox>
      <Button col="1" onClick={() => dispatch(lifeSlice.actions.decrement())}></Button>
      <Button col="2" onClick={() => dispatch(lifeSlice.actions.increment())}></Button>
    </Box>
  )
}

export const App = () => {
  return (
    <Provider store={store}>
      <LifeCounter />
    </Provider>
  );
};
