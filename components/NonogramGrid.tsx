'use client';

import { useEffect, useCallback } from 'react';
import { CellState, Puzzle } from '@/lib/types';
import { getAllRowHints, getAllColHints } from '@/lib/gameLogic';
import Cell from './Cell';
import HintDisplay from './HintDisplay';

interface NonogramGridProps {
  puzzle: Puzzle;
  playerGrid: CellState[][];
  selectedCell: { row: number; col: number };
  onCellClick: (row: number, col: number) => void;
  onCellChange: (row: number, col: number, state: CellState) => void;
  onSelectedCellChange: (row: number, col: number) => void;
}

export default function NonogramGrid({
  puzzle,
  playerGrid,
  selectedCell,
  onCellClick,
  onCellChange,
  onSelectedCellChange,
}: NonogramGridProps) {
  const rowHints = getAllRowHints(puzzle);
  const colHints = getAllColHints(puzzle);

  const maxRowHintLength = Math.max(...rowHints.map((h) => h.length));
  const maxColHintLength = Math.max(...colHints.map((h) => h.length));

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { row, col } = selectedCell;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (row > 0) onSelectedCellChange(row - 1, col);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (row < puzzle.size - 1) onSelectedCellChange(row + 1, col);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (col > 0) onSelectedCellChange(row, col - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (col < puzzle.size - 1) onSelectedCellChange(row, col + 1);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          const currentState = playerGrid[row][col];
          const newState: CellState =
            currentState === 'empty'
              ? 'filled'
              : currentState === 'filled'
              ? 'marked'
              : 'empty';
          onCellChange(row, col, newState);
          break;
        case 'x':
        case 'X':
          e.preventDefault();
          onCellChange(
            row,
            col,
            playerGrid[row][col] === 'marked' ? 'empty' : 'marked'
          );
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          onCellChange(
            row,
            col,
            playerGrid[row][col] === 'filled' ? 'empty' : 'filled'
          );
          break;
      }
    },
    [selectedCell, puzzle.size, playerGrid, onSelectedCellChange, onCellChange]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const cellSize = puzzle.size <= 7 ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <div className="inline-block">
      <div className="flex">
        {/* Top-left corner spacer */}
        <div
          style={{
            width: `${maxRowHintLength * 3}rem`,
            height: `${maxColHintLength * 1.75}rem`,
          }}
        />

        {/* Column hints */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}>
          {colHints.map((hints, colIndex) => (
            <div key={colIndex} className={cellSize}>
              <HintDisplay hints={hints} orientation="col" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Row hints */}
        <div className="flex flex-col">
          {rowHints.map((hints, rowIndex) => (
            <div
              key={rowIndex}
              className={cellSize}
              style={{ width: `${maxRowHintLength * 3}rem` }}
            >
              <HintDisplay hints={hints} orientation="row" />
            </div>
          ))}
        </div>

        {/* Game grid */}
        <div
          className="grid gap-0.5 bg-slate-700 p-0.5 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${puzzle.size}, ${
              puzzle.size <= 7 ? '3rem' : '2.5rem'
            })`,
          }}
        >
          {playerGrid.map((row, rowIndex) =>
            row.map((cellState, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                state={cellState}
                isSelected={
                  selectedCell.row === rowIndex && selectedCell.col === colIndex
                }
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
