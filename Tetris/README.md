# Tetris for Bahaa Nofal Portfolio

Windows XP styled Tetris playable inside the portfolio.

## Files
- `TetrisGame.vue` — Vue 3 SFC, main component (board 10x20, 7 tetrominoes, rotation, lines, score, next preview)
- `engine.js` — pure JS engine extracted for reuse / testing (no Vue)
- `styles.css` — XP sunken panel styles

## Controls
- ← / → : Move
- ↓ : Soft drop (+1)
- ↑ : Rotate (with wall-kick)
- Space : Hard drop (+2 per cell)
- P : Pause / Resume

## Scoring
- 100/300/500/800 per 1/2/3/4 lines × level
- Level = floor(lines/10)+1, speed increases each level

## Integration
Imported in `src/App.vue` as `<TetrisGame />` inside `win-tetris` DraggableWindow. XP sounds via `src/utils/xpSounds.js` (Web Audio).
