import { Cell, Position, Puzzle } from '@/types/kakuro';

/**
 * Get all cells in a horizontal run starting from a clue cell
 */
export function getHorizontalRun(grid: Cell[][], row: number, col: number): Position[] {
  const cells: Position[] = [];

  for (let c = col + 1; c < grid[0].length; c++) {
    if (grid[row][c].type === 'playable') {
      cells.push({ row, col: c });
    } else {
      break;
    }
  }

  return cells;
}

/**
 * Get all cells in a vertical run starting from a clue cell
 */
export function getVerticalRun(grid: Cell[][], row: number, col: number): Position[] {
  const cells: Position[] = [];

  for (let r = row + 1; r < grid.length; r++) {
    if (grid[r][col].type === 'playable') {
      cells.push({ row: r, col });
    } else {
      break;
    }
  }

  return cells;
}

/**
 * Get the clue cell that controls a playable cell (looking left for horizontal, up for vertical)
 */
export function getClueForCell(grid: Cell[][], pos: Position, direction: 'horizontal' | 'vertical'): Position | null {
  if (direction === 'horizontal') {
    for (let c = pos.col - 1; c >= 0; c--) {
      if (grid[pos.row][c].type === 'clue' && grid[pos.row][c].clue?.across !== undefined) {
        return { row: pos.row, col: c };
      }
      if (grid[pos.row][c].type !== 'playable') {
        break;
      }
    }
  } else {
    for (let r = pos.row - 1; r >= 0; r--) {
      if (grid[r][pos.col].type === 'clue' && grid[r][pos.col].clue?.down !== undefined) {
        return { row: r, col: pos.col };
      }
      if (grid[r][pos.col].type !== 'playable') {
        break;
      }
    }
  }

  return null;
}

/**
 * Get all cells in the same run as the given position
 */
export function getCellsInRun(grid: Cell[][], pos: Position, direction: 'horizontal' | 'vertical'): Position[] {
  const cluePos = getClueForCell(grid, pos, direction);
  if (!cluePos) return [];

  if (direction === 'horizontal') {
    return getHorizontalRun(grid, cluePos.row, cluePos.col);
  } else {
    return getVerticalRun(grid, cluePos.row, cluePos.col);
  }
}

/**
 * Validate a run of cells (check sum and uniqueness)
 */
export function validateRun(grid: Cell[][], positions: Position[], targetSum: number): {
  isValid: boolean;
  hasDuplicates: boolean;
  isComplete: boolean;
  currentSum: number;
} {
  const values: number[] = [];
  const valueSet = new Set<number>();
  let currentSum = 0;
  let isComplete = true;

  for (const pos of positions) {
    const value = grid[pos.row][pos.col].value;
    if (value === undefined || value === 0) {
      isComplete = false;
    } else {
      values.push(value);
      valueSet.add(value);
      currentSum += value;
    }
  }

  const hasDuplicates = values.length !== valueSet.size;
  const isValid = isComplete && !hasDuplicates && currentSum === targetSum;

  return { isValid, hasDuplicates, isComplete, currentSum };
}

/**
 * Check if the entire puzzle is solved correctly
 */
export function isPuzzleSolved(puzzle: Puzzle): boolean {
  const { grid } = puzzle;

  // Check all clue cells
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const cell = grid[row][col];

      if (cell.type === 'clue') {
        // Check horizontal run
        if (cell.clue?.across !== undefined) {
          const hRun = getHorizontalRun(grid, row, col);
          const validation = validateRun(grid, hRun, cell.clue.across);
          if (!validation.isValid) return false;
        }

        // Check vertical run
        if (cell.clue?.down !== undefined) {
          const vRun = getVerticalRun(grid, row, col);
          const validation = validateRun(grid, vRun, cell.clue.down);
          if (!validation.isValid) return false;
        }
      }
    }
  }

  return true;
}

/**
 * Mark error cells in the grid
 */
export function markErrors(grid: Cell[][]): Cell[][] {
  const newGrid = grid.map(row => row.map(cell => ({ ...cell, isError: false })));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const cell = grid[row][col];

      if (cell.type === 'clue') {
        // Check horizontal run
        if (cell.clue?.across !== undefined) {
          const hRun = getHorizontalRun(grid, row, col);
          const validation = validateRun(grid, hRun, cell.clue.across);
          if (validation.hasDuplicates || (validation.isComplete && !validation.isValid)) {
            hRun.forEach(pos => {
              newGrid[pos.row][pos.col].isError = true;
            });
          }
        }

        // Check vertical run
        if (cell.clue?.down !== undefined) {
          const vRun = getVerticalRun(grid, row, col);
          const validation = validateRun(grid, vRun, cell.clue.down);
          if (validation.hasDuplicates || (validation.isComplete && !validation.isValid)) {
            vRun.forEach(pos => {
              newGrid[pos.row][pos.col].isError = true;
            });
          }
        }
      }
    }
  }

  return newGrid;
}

/**
 * Clear all user inputs from the grid
 */
export function clearGrid(grid: Cell[][]): Cell[][] {
  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      value: cell.isLocked ? cell.value : undefined,
      isError: false
    }))
  );
}
