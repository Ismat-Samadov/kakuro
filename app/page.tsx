'use client';

import { useState, useEffect } from 'react';
import { puzzles } from '@/lib/puzzles';
import { CellState, Puzzle } from '@/lib/types';
import { initializePlayerGrid, checkCompletion, countMistakes } from '@/lib/gameLogic';
import NonogramGrid from '@/components/NonogramGrid';

export default function Home() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle>(puzzles[0]);
  const [playerGrid, setPlayerGrid] = useState<CellState[][]>(
    initializePlayerGrid(puzzles[0].size)
  );
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    const newPuzzle = puzzles[currentPuzzleIndex];
    setPuzzle(newPuzzle);
    setPlayerGrid(initializePlayerGrid(newPuzzle.size));
    setSelectedCell({ row: 0, col: 0 });
    setIsComplete(false);
    setShowCongratulations(false);
  }, [currentPuzzleIndex]);

  useEffect(() => {
    const complete = checkCompletion(playerGrid, puzzle.grid);
    setIsComplete(complete);
    if (complete && !showCongratulations) {
      setShowCongratulations(true);
    }
    setMistakes(countMistakes(playerGrid, puzzle.grid));
  }, [playerGrid, puzzle.grid, showCongratulations]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const currentState = playerGrid[row][col];
    const newState: CellState =
      currentState === 'empty'
        ? 'filled'
        : currentState === 'filled'
        ? 'marked'
        : 'empty';
    handleCellChange(row, col, newState);
  };

  const handleCellChange = (row: number, col: number, state: CellState) => {
    const newGrid = playerGrid.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? state : c))
    );
    setPlayerGrid(newGrid);
  };

  const handleReset = () => {
    setPlayerGrid(initializePlayerGrid(puzzle.size));
    setSelectedCell({ row: 0, col: 0 });
    setIsComplete(false);
    setShowCongratulations(false);
  };

  const handleNextPuzzle = () => {
    setCurrentPuzzleIndex((prev) => (prev + 1) % puzzles.length);
  };

  const handlePrevPuzzle = () => {
    setCurrentPuzzleIndex((prev) => (prev - 1 + puzzles.length) % puzzles.length);
  };

  const handleSelectedCellChange = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Nonogram
          </h1>
          <p className="text-slate-400 text-lg">Picross Puzzle Game</p>
        </div>

        {/* Game Info */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {puzzle.name}
              </h2>
              <p className={`text-sm font-semibold uppercase ${getDifficultyColor(puzzle.difficulty)}`}>
                {puzzle.difficulty} • {puzzle.size}×{puzzle.size}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <p className="text-slate-400 text-sm">Mistakes</p>
                <p className={`text-2xl font-bold ${mistakes > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {mistakes}
                </p>
              </div>
              {isComplete && (
                <div className="bg-green-500/20 border-2 border-green-500 rounded-xl px-6 py-3">
                  <p className="text-green-400 font-bold text-lg">✓ Complete!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <NonogramGrid
              puzzle={puzzle}
              playerGrid={playerGrid}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
              onCellChange={handleCellChange}
              onSelectedCellChange={handleSelectedCellChange}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Keyboard Shortcuts */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Keyboard Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Arrow Keys</span>
                  <span className="text-white font-mono">Navigate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Space / Enter</span>
                  <span className="text-white font-mono">Fill / Mark / Clear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">F</span>
                  <span className="text-white font-mono">Toggle Fill</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">X</span>
                  <span className="text-white font-mono">Toggle Mark</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Reset Puzzle
                </button>
                <button
                  onClick={handlePrevPuzzle}
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Puzzle Selector */}
        <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Select Puzzle</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {puzzles.map((p, index) => (
              <button
                key={p.id}
                onClick={() => setCurrentPuzzleIndex(index)}
                className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  index === currentPuzzleIndex
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <div className="text-lg">{p.name}</div>
                <div className="text-xs mt-1 opacity-80">{p.size}×{p.size}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Congratulations Modal */}
      {showCongratulations && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-4 border-green-500 shadow-2xl max-w-md mx-4 transform animate-bounce">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-2">Congratulations!</h2>
              <p className="text-xl text-green-400 mb-2">You solved the puzzle!</p>
              <p className="text-slate-400 mb-6">
                {puzzle.name} • {puzzle.difficulty}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowCongratulations(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
                >
                  Close
                </button>
                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                >
                  Next Puzzle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
