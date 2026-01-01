export type CellType = 'empty' | 'clue' | 'playable';

export interface Clue {
  down?: number;  // Sum for vertical (down) clue
  across?: number; // Sum for horizontal (across) clue
}

export interface Cell {
  type: CellType;
  clue?: Clue;
  value?: number; // User's input (1-9) for playable cells
  solution?: number; // Correct answer for playable cells
  isError?: boolean; // Flag for validation errors
  isLocked?: boolean; // Flag for pre-filled cells
}

export interface Position {
  row: number;
  col: number;
}

export interface Puzzle {
  grid: Cell[][];
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameState {
  puzzle: Puzzle;
  selectedCell: Position | null;
  history: Cell[][][]; // For undo functionality
  isComplete: boolean;
  showErrors: boolean;
}
