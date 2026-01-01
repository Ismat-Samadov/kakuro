# Kakuro Puzzle Game

A beautiful, interactive Kakuro number crossword puzzle game built with Next.js and TypeScript.

## About Kakuro

Kakuro is a logic puzzle that combines elements of Sudoku and crosswords. Players fill a grid with numbers 1-9, ensuring that:
- Numbers in each run add up to the clue shown in the diagonal cells
- No number repeats within the same run
- All runs must use unique numbers

## Features

- **Three Difficulty Levels**: Easy, Medium, and Hard puzzles to challenge all skill levels
- **Interactive Gameplay**: Click cells and type numbers with instant feedback
- **Keyboard Navigation**: Use arrow keys to move between cells effortlessly
- **Real-time Validation**: Check your solution and see errors highlighted
- **Smart Error Detection**: Automatically detects duplicate numbers and incorrect sums
- **Clear Grid**: Reset the puzzle at any time
- **Toggle Errors**: Show/hide error highlighting as you prefer
- **Responsive Design**: Beautiful gradient UI with full dark mode support
- **Smooth Animations**: Polished transitions and congratulations effects
- **Custom Favicon**: Kakuro-themed icon for browser tabs

## Screenshots

The game features:
- Clean, modern interface with gradient backgrounds
- Clear visual distinction between clue cells and playable cells
- Intuitive controls and helpful instructions
- Celebration animation when puzzles are solved

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kakuro
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## How to Play

1. **Select a Puzzle**: Choose from Easy, Medium, or Hard difficulty levels
2. **Click a Cell**: Click any white cell to select it
3. **Enter Numbers**: Type numbers 1-9 to fill the selected cell
4. **Navigate**: Use arrow keys to move between cells
5. **Check Your Work**: Click "Check Solution" to validate your answers
6. **Show/Hide Errors**: Toggle error highlighting to help you solve
7. **Clear Grid**: Reset the puzzle if you want to start over

### Rules

- Fill all white cells with numbers 1-9
- Numbers in each horizontal or vertical run must add up to the clue number shown in the gray diagonal cell
- No number can be repeated within the same run (horizontal or vertical)
- Each run is independent - the same number can appear in different runs

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: Modern React with hooks

## Project Structure

```
kakuro/
├── app/
│   ├── favicon.ico          # App favicon
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main game page
├── components/
│   ├── ClueCell.tsx         # Clue cell component (diagonal cells)
│   ├── GameBoard.tsx        # Main game board component
│   └── PlayableCell.tsx     # Playable cell component
├── data/
│   └── puzzles.ts           # Sample puzzles for each difficulty
├── types/
│   └── kakuro.ts            # TypeScript type definitions
├── utils/
│   └── gameLogic.ts         # Puzzle validation and game logic
└── public/
    └── icon.svg             # App icon
```

## Game Logic

The game includes sophisticated validation:
- **Run Detection**: Automatically identifies horizontal and vertical runs
- **Sum Validation**: Ensures runs add up to the correct clue values
- **Duplicate Detection**: Highlights repeated numbers in the same run
- **Completion Check**: Automatically detects when puzzles are solved

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Puzzles

To add new puzzles, edit `data/puzzles.ts`:

```typescript
export const newPuzzle: Puzzle = {
  title: 'My Puzzle',
  difficulty: 'medium',
  grid: [
    // Define your grid here
  ],
};
```

Each cell can be:
- `{ type: 'empty' }` - Black corner cells
- `{ type: 'clue', clue: { down: 10, across: 15 } }` - Clue cells
- `{ type: 'playable', solution: 5 }` - Playable cells

## Future Enhancements

- [ ] More puzzle variations and levels
- [ ] Hint system
- [ ] Timer and scoring
- [ ] Puzzle generator
- [ ] Save/load game state
- [ ] Undo/redo functionality
- [ ] Mobile touch gestures
- [ ] Multiplayer mode

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made with ❤️ using Next.js and TypeScript
