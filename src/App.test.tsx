import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

test("renders app without crashing", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test("renders game board", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByTestId("board")).toBeInTheDocument();
});

test("player can make a move", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const cells = screen.getAllByTestId("cell");
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toBe("X");
});

test("players take turns", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const cells = screen.getAllByTestId("cell");
  fireEvent.click(cells[0]);
  fireEvent.click(cells[7]);
  expect(cells[0].textContent).toBe("X");
  expect(cells[7].textContent).toBe("O");
});

test("can't click occupied cell", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const cells = screen.getAllByTestId("cell");
  fireEvent.click(cells[0]);
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toBe("X");
});

test("declares a winner", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const cells = screen.getAllByTestId("cell");

  fireEvent.click(cells[0]);
  fireEvent.click(cells[7]);
  fireEvent.click(cells[1]);
  fireEvent.click(cells[8]);
  fireEvent.click(cells[2]);

  await new Promise((resolve) => setTimeout(resolve, 4500));

  console.log(screen);
  expect(screen.getByText(/Wins - 1/i)).toBeInTheDocument();
});

test("declares a draw", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const cells = screen.getAllByTestId("cell");

  const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
  drawMoves.forEach((index, move) => {
    fireEvent.click(cells[index]);
  });

  expect(screen.getByText(/Games played: 3/i)).toBeInTheDocument();
});

test("resets the game", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const cells = screen.getAllByTestId("cell");
  fireEvent.click(cells[0]);

  fireEvent.click(screen.getByText("New Game"));
  expect(cells[0].textContent).toBe("");
});
