'use client';

import { useState, useCallback, useEffect } from 'react';
import { Cell, Position, Puzzle } from '@/types/kakuro';
import { markErrors } from '@/utils/gameLogic';
import ClueCell from './ClueCell';
import PlayableCell from './PlayableCell';

interface GameBoardProps {
  puzzle: Puzzle;
  onPuzzleChange: (grid: Cell[][]) => void;
  showErrors: boolean;
}

export default function GameBoard({ puzzle, onPuzzleChange, showErrors }: GameBoardProps) {
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  const [grid, setGrid] = useState<Cell[][]>(puzzle.grid);

  useEffect(() => {
    setGrid(puzzle.grid);
  }, [puzzle]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (grid[row][col].type === 'playable') {
      setSelectedCell({ row, col });
    }
  }, [grid]);

  const handleCellChange = useCallback((row: number, col: number, value: number | undefined) => {
    if (grid[row][col].isLocked) return;

    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, value };
        }
        return cell;
      })
    );

    const updatedGrid = showErrors ? markErrors(newGrid) : newGrid;
    setGrid(updatedGrid);
    onPuzzleChange(updatedGrid);
  }, [grid, showErrors, onPuzzleChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          e.preventDefault();
          break;
        case 'ArrowDown':
          newRow = Math.min(grid.length - 1, row + 1);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          e.preventDefault();
          break;
        case 'ArrowRight':
          newCol = Math.min(grid[0].length - 1, col + 1);
          e.preventDefault();
          break;
        default:
          return;
      }

      // Find next playable cell in the direction
      while ((newRow !== row || newCol !== col) && grid[newRow][newCol].type !== 'playable') {
        if (e.key === 'ArrowUp' && newRow > 0) newRow--;
        else if (e.key === 'ArrowDown' && newRow < grid.length - 1) newRow++;
        else if (e.key === 'ArrowLeft' && newCol > 0) newCol--;
        else if (e.key === 'ArrowRight' && newCol < grid[0].length - 1) newCol++;
        else break;
      }

      if (grid[newRow][newCol].type === 'playable') {
        setSelectedCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, grid]);

  return (
    <div className="inline-block">
      <div className="grid gap-0 border-2 border-gray-800 dark:border-gray-600 shadow-2xl">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              if (cell.type === 'empty') {
                return (
                  <div
                    key={colIndex}
                    className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  />
                );
              } else if (cell.type === 'clue') {
                return <ClueCell key={colIndex} clue={cell.clue!} />;
              } else {
                return (
                  <PlayableCell
                    key={colIndex}
                    value={cell.value}
                    isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                    isError={showErrors && (cell.isError || false)}
                    isLocked={cell.isLocked || false}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
