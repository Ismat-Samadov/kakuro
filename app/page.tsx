'use client';

import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import { Cell, Puzzle } from '@/types/kakuro';
import { isPuzzleSolved, markErrors, clearGrid } from '@/utils/gameLogic';
import { allPuzzles } from '@/data/puzzles';

export default function Home() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle>(allPuzzles[currentPuzzleIndex]);
  const [showErrors, setShowErrors] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const handlePuzzleChange = (newGrid: Cell[][]) => {
    const updatedPuzzle = { ...puzzle, grid: newGrid };
    setPuzzle(updatedPuzzle);

    if (isPuzzleSolved(updatedPuzzle)) {
      setIsCompleted(true);
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    } else {
      setIsCompleted(false);
    }
  };

  const handleCheckSolution = () => {
    const gridWithErrors = markErrors(puzzle.grid);
    setPuzzle({ ...puzzle, grid: gridWithErrors });
    setShowErrors(true);

    if (isPuzzleSolved({ ...puzzle, grid: gridWithErrors })) {
      setIsCompleted(true);
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  const handleClearGrid = () => {
    const clearedGrid = clearGrid(puzzle.grid);
    setPuzzle({ ...puzzle, grid: clearedGrid });
    setShowErrors(false);
    setIsCompleted(false);
  };

  const handleNewPuzzle = (index: number) => {
    setCurrentPuzzleIndex(index);
    setPuzzle(allPuzzles[index]);
    setShowErrors(false);
    setIsCompleted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kakuro Puzzle
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Fill the grid with numbers 1-9. No repeats in each run!
          </p>
        </div>

        {/* Puzzle Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {puzzle.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Difficulty:{' '}
                <span
                  className={`font-semibold ${
                    puzzle.difficulty === 'easy'
                      ? 'text-green-600 dark:text-green-400'
                      : puzzle.difficulty === 'medium'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}
                </span>
              </p>
            </div>

            {isCompleted && (
              <div className="text-green-600 dark:text-green-400 font-bold text-xl animate-pulse">
                Completed!
              </div>
            )}
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <GameBoard
              puzzle={puzzle}
              onPuzzleChange={handlePuzzleChange}
              showErrors={showErrors}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleCheckSolution}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Check Solution
            </button>
            <button
              onClick={handleClearGrid}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Clear Grid
            </button>
            <button
              onClick={() => setShowErrors(!showErrors)}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                showErrors
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
              }`}
            >
              {showErrors ? 'Hide Errors' : 'Show Errors'}
            </button>
          </div>
        </div>

        {/* Puzzle Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Select Puzzle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allPuzzles.map((p, index) => (
              <button
                key={index}
                onClick={() => handleNewPuzzle(index)}
                className={`p-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                  currentPuzzleIndex === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                }`}
              >
                <div className="text-lg">{p.title}</div>
                <div className="text-sm opacity-80">
                  {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* How to Play */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
            How to Play
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Fill white cells with numbers 1-9</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Numbers in each run must add up to the clue (shown in gray cells)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>No number can be repeated within the same run</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>Use arrow keys to navigate between cells</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-12 py-8 rounded-2xl shadow-2xl animate-bounce">
            <div className="text-4xl font-bold text-center mb-2">Congratulations!</div>
            <div className="text-xl text-center">Puzzle Solved!</div>
          </div>
        </div>
      )}
    </main>
  );
}
