import { CellState, Puzzle } from './types';

export function getRowHints(grid: number[][], rowIndex: number): number[] {
  const row = grid[rowIndex];
  const hints: number[] = [];
  let count = 0;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === 1) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }

  if (count > 0) {
    hints.push(count);
  }

  return hints.length > 0 ? hints : [0];
}

export function getColHints(grid: number[][], colIndex: number): number[] {
  const hints: number[] = [];
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i][colIndex] === 1) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }

  if (count > 0) {
    hints.push(count);
  }

  return hints.length > 0 ? hints : [0];
}

export function initializePlayerGrid(size: number): CellState[][] {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill('empty'));
}

export function checkCompletion(
  playerGrid: CellState[][],
  solution: number[][]
): boolean {
  for (let i = 0; i < playerGrid.length; i++) {
    for (let j = 0; j < playerGrid[i].length; j++) {
      const shouldBeFilled = solution[i][j] === 1;
      const isFilled = playerGrid[i][j] === 'filled';

      if (shouldBeFilled !== isFilled) {
        return false;
      }
    }
  }
  return true;
}

export function countMistakes(
  playerGrid: CellState[][],
  solution: number[][]
): number {
  let mistakes = 0;
  for (let i = 0; i < playerGrid.length; i++) {
    for (let j = 0; j < playerGrid[i].length; j++) {
      const shouldBeFilled = solution[i][j] === 1;
      const isFilled = playerGrid[i][j] === 'filled';
      const isMarked = playerGrid[i][j] === 'marked';

      // Count mistakes: filled when should be empty, or marked when should be filled
      if ((isFilled && !shouldBeFilled) || (isMarked && shouldBeFilled)) {
        mistakes++;
      }
    }
  }
  return mistakes;
}

export function getAllRowHints(puzzle: Puzzle): number[][] {
  return Array(puzzle.size)
    .fill(null)
    .map((_, i) => getRowHints(puzzle.grid, i));
}

export function getAllColHints(puzzle: Puzzle): number[][] {
  return Array(puzzle.size)
    .fill(null)
    .map((_, i) => getColHints(puzzle.grid, i));
}
