import { Puzzle } from '@/types/kakuro';

export const easyPuzzle: Puzzle = {
  title: 'Easy Kakuro',
  difficulty: 'easy',
  grid: [
    [
      { type: 'empty' },
      { type: 'empty' },
      { type: 'clue', clue: { down: 4 } },
      { type: 'clue', clue: { down: 3 } },
    ],
    [
      { type: 'empty' },
      { type: 'clue', clue: { across: 3 } },
      { type: 'playable', solution: 1 },
      { type: 'playable', solution: 2 },
    ],
    [
      { type: 'clue', clue: { down: 4 } },
      { type: 'clue', clue: { across: 4, down: 3 } },
      { type: 'playable', solution: 3 },
      { type: 'playable', solution: 1 },
    ],
    [
      { type: 'clue', clue: { down: 3 } },
      { type: 'clue', clue: { across: 3 } },
      { type: 'playable', solution: 1 },
      { type: 'playable', solution: 2 },
    ],
  ],
};

export const mediumPuzzle: Puzzle = {
  title: 'Medium Kakuro',
  difficulty: 'medium',
  grid: [
    [
      { type: 'empty' },
      { type: 'empty' },
      { type: 'clue', clue: { down: 16 } },
      { type: 'clue', clue: { down: 15 } },
      { type: 'empty' },
    ],
    [
      { type: 'empty' },
      { type: 'clue', clue: { across: 23 } },
      { type: 'playable', solution: 9 },
      { type: 'playable', solution: 7 },
      { type: 'playable', solution: 7 },
    ],
    [
      { type: 'clue', clue: { down: 11 } },
      { type: 'clue', clue: { across: 16 } },
      { type: 'playable', solution: 8 },
      { type: 'playable', solution: 6 },
      { type: 'empty' },
    ],
    [
      { type: 'clue', clue: { down: 6 } },
      { type: 'clue', clue: { across: 10 } },
      { type: 'playable', solution: 4 },
      { type: 'playable', solution: 2 },
      { type: 'playable', solution: 4 },
    ],
    [
      { type: 'empty' },
      { type: 'empty' },
      { type: 'playable', solution: 5 },
      { type: 'playable', solution: 1 },
      { type: 'empty' },
    ],
  ],
};

export const hardPuzzle: Puzzle = {
  title: 'Hard Kakuro',
  difficulty: 'hard',
  grid: [
    [
      { type: 'empty' },
      { type: 'empty' },
      { type: 'clue', clue: { down: 23 } },
      { type: 'clue', clue: { down: 30 } },
      { type: 'empty' },
      { type: 'clue', clue: { down: 27 } },
      { type: 'clue', clue: { down: 12 } },
      { type: 'clue', clue: { down: 16 } },
    ],
    [
      { type: 'empty' },
      { type: 'clue', clue: { across: 16 } },
      { type: 'playable', solution: 9 },
      { type: 'playable', solution: 7 },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
    ],
    [
      { type: 'clue', clue: { down: 17 } },
      { type: 'clue', clue: { across: 24 } },
      { type: 'playable', solution: 8 },
      { type: 'playable', solution: 9 },
      { type: 'playable', solution: 7 },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
    ],
    [
      { type: 'clue', clue: { down: 35 } },
      { type: 'clue', clue: { across: 29 } },
      { type: 'playable', solution: 6 },
      { type: 'playable', solution: 8 },
      { type: 'playable', solution: 9 },
      { type: 'playable', solution: 6 },
      { type: 'empty' },
      { type: 'empty' },
    ],
    [
      { type: 'empty' },
      { type: 'clue', clue: { across: 7 } },
      { type: 'empty' },
      { type: 'playable', solution: 6 },
      { type: 'playable', solution: 1 },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
    ],
    [
      { type: 'empty' },
      { type: 'clue', clue: { across: 8 } },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'playable', solution: 3 },
      { type: 'playable', solution: 2 },
      { type: 'playable', solution: 3 },
      { type: 'empty' },
    ],
    [
      { type: 'empty' },
      { type: 'clue', clue: { across: 20 } },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'playable', solution: 9 },
      { type: 'playable', solution: 8 },
      { type: 'playable', solution: 3 },
      { type: 'empty' },
    ],
  ],
};

export const allPuzzles = [easyPuzzle, mediumPuzzle, hardPuzzle];
