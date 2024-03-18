import { createContext, useState } from "react";

export const GameContext = createContext();

export default function GameContextProvider({ children }) {
  const [row, setRow] = useState(20);
  const [col, setCol] = useState(20);

  const [rate, setRate] = useState(0.5);

  const [cellState, setCellState] = useState(() => {
    const initialGrid = Array.from({ length: row }, () =>
      Array.from({ length: col }, () => ({
        lastAlive: 0,
        status: Math.random() <= rate,
      }))
    );
    const count = initialGrid.reduce((total, row) => {
      return (
        total +
        row.reduce((rowTotal, cell) => {
          return rowTotal + (cell.status ? 1 : 0);
        }, 0)
      );
    }, 0);

    return {
      aliveCount: count,
      cellGrid: initialGrid,
    };
  });

  const resetGrid = (rows, cols) => {
    const initialGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        lastAlive: 0,
        status: Math.random() <= rate,
      }))
    );
    const count = initialGrid.reduce((total, row) => {
      return (
        total +
        row.reduce((rowTotal, cell) => {
          return rowTotal + (cell.status ? 1 : 0);
        }, 0)
      );
    }, 0);

    setCellState({
      aliveCount: count,
      cellGrid: initialGrid,
    });
  };

  const contextValue = {
    cellState,
    setCellState,
    resetGrid,
    setRow,
    setCol,
  };

  return (
    <GameContext.Provider value={{ contextValue }}>
      {children}
    </GameContext.Provider>
  );
}
