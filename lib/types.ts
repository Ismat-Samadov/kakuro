export type CellState = 'empty' | 'filled' | 'marked';

export interface Puzzle {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  grid: number[][];
  size: number;
}

export interface GameState {
  puzzle: Puzzle;
  playerGrid: CellState[][];
  selectedCell: { row: number; col: number };
  isComplete: boolean;
  mistakes: number;
}
