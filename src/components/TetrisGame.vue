<template>
  <div class="tetris-wrap" tabindex="0" ref="wrap" @keydown="handleKey">
    <div class="tetris-top">
      <div class="score-box">
        <div class="score-label"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> Score: <b>{{ score }}</b></div>
        <div class="score-label">Lines: <b>{{ lines }}</b> &nbsp; Level: <b>{{ level }}</b></div>
      </div>
      <div class="next-box">
        <div class="next-label">Next</div>
        <div class="next-grid">
          <div v-for="(cell,i) in nextCells" :key="i" class="cell" :class="cell ? 'filled ' + cell : ''"></div>
        </div>
      </div>
      <div class="controls-box">
        <button class="xp-mini-btn" @click="togglePause">{{ paused ? 'Resume' : 'Pause' }}</button>
        <button class="xp-mini-btn" @click="reset">New Game</button>
      </div>
    </div>

    <div class="board-outer">
      <div class="board" :style="{gridTemplateColumns: `repeat(${W}, 1fr)`}">
        <div v-for="(cell,i) in displayBoard" :key="i" class="cell" :class="cell ? 'filled '+cell : ''"></div>
      </div>
      <div v-if="gameOver" class="game-over">
        <div>Game Over!</div>
        <button class="xp-mini-btn" @click="reset">Restart</button>
      </div>
      <div v-if="paused && !gameOver" class="paused">PAUSED</div>
    </div>

    <div class="tetris-help">←→ Move &nbsp; ↓ Soft Drop &nbsp; ↑ Rotate &nbsp; Space Hard Drop &nbsp; P Pause</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const W = 10
const H = 20

const SHAPES = {
  I: { color:'cyan', cells:[[1,1,1,1]] },
  O: { color:'yellow', cells:[[1,1],[1,1]] },
  T: { color:'purple', cells:[[0,1,0],[1,1,1]] },
  S: { color:'green', cells:[[0,1,1],[1,1,0]] },
  Z: { color:'red', cells:[[1,1,0],[0,1,1]] },
  J: { color:'blue', cells:[[1,0,0],[1,1,1]] },
  L: { color:'orange', cells:[[0,0,1],[1,1,1]] },
}
const SHAPE_KEYS = Object.keys(SHAPES)

function rotate(matrix){
  const h=matrix.length, w=matrix[0].length
  const res = Array.from({length:w}, ()=> Array(h).fill(0))
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) res[x][h-1-y]=matrix[y][x]
  return res
}

const board = ref(Array.from({length:H}, ()=> Array(W).fill(null)))
const current = ref(null) // {key, matrix, x, y, color}
const nextKey = ref(randomKey())
const score = ref(0)
const lines = ref(0)
const level = computed(()=> Math.floor(lines.value/10)+1)
const paused = ref(false)
const gameOver = ref(false)
const wrap = ref(null)

function randomKey(){ return SHAPE_KEYS[Math.floor(Math.random()*SHAPE_KEYS.length)] }

function spawn(){
  const key = nextKey.value
  nextKey.value = randomKey()
  const shape = SHAPES[key]
  const matrix = shape.cells.map(r=>[...r])
  const x = Math.floor((W - matrix[0].length)/2)
  const y = 0
  current.value = {key, matrix, x, y, color: shape.color}
  if (collides(current.value, 0, 0)) {
    gameOver.value = true
  }
}

function collides(piece, dx, dy, testMatrix=null){
  const m = testMatrix || piece.matrix
  for(let y=0;y<m.length;y++) for(let x=0;x<m[0].length;x++) if(m[y][x]){
    const nx = piece.x + x + dx
    const ny = piece.y + y + dy
    if(nx<0||nx>=W||ny>=H) return true
    if(ny>=0 && board.value[ny][nx]) return true
  }
  return false
}

function merge(){
  const p = current.value
  for(let y=0;y<p.matrix.length;y++) for(let x=0;x<p.matrix[0].length;x++) if(p.matrix[y][x]){
    const ny=p.y+y, nx=p.x+x
    if(ny>=0) board.value[ny][nx]=p.color
  }
}

function clearLines(){
  let cleared=0
  for(let y=H-1;y>=0;y--){
    if(board.value[y].every(c=>c)){
      board.value.splice(y,1)
      board.value.unshift(Array(W).fill(null))
      cleared++
      y++
    }
  }
  if(cleared){
    lines.value+=cleared
    score.value+= [0,100,300,500,800][cleared] * level.value
  }
}

function tick(){
  if(paused.value || gameOver.value || !current.value) return
  if(!collides(current.value,0,1)){
    current.value.y++
  } else {
    merge()
    clearLines()
    spawn()
  }
}

let interval=null
function startLoop(){
  if(interval) clearInterval(interval)
  interval = setInterval(tick, Math.max(120, 900 - (level.value-1)*70))
}
watch(level, startLoop)

function move(dir){
  if(paused.value||gameOver.value||!current.value) return
  if(!collides(current.value,dir,0)) current.value.x+=dir
}

function rotatePiece(){
  if(!current.value||paused.value||gameOver.value) return
  const rotated = rotate(current.value.matrix)
  // wall kick simple
  for(let kick of [0,-1,1,-2,2]){
    if(!collides(current.value,kick,0,rotated)){
      current.value.matrix=rotated
      current.value.x+=kick
      return
    }
  }
}

function softDrop(){
  if(!current.value) return
  if(!collides(current.value,0,1)) { current.value.y++; score.value+=1 }
}

function hardDrop(){
  if(!current.value||paused.value||gameOver.value) return
  let d=0
  while(!collides(current.value,0,1)){ current.value.y++; d++ }
  score.value+=d*2
  merge(); clearLines(); spawn()
}

function togglePause(){
  if(gameOver.value) return
  paused.value=!paused.value
  wrap.value?.focus()
}
function reset(){
  board.value = Array.from({length:H}, ()=> Array(W).fill(null))
  score.value=0; lines.value=0; paused.value=false; gameOver.value=false
  nextKey.value=randomKey()
  spawn()
  startLoop()
  setTimeout(()=> wrap.value?.focus(),0)
}

const displayBoard = computed(()=>{
  const disp = board.value.map(r=>[...r])
  if(current.value){
    const p=current.value
    for(let y=0;y<p.matrix.length;y++) for(let x=0;x<p.matrix[0].length;x++) if(p.matrix[y][x]){
      const ny=p.y+y, nx=p.x+x
      if(ny>=0&&ny<H&&nx>=0&&nx<W) disp[ny][nx]=p.color
    }
  }
  return disp.flat()
})

const nextCells = computed(()=>{
  const key=nextKey.value
  const shape=SHAPES[key].cells
  // pad to 4x4
  const grid = Array(16).fill(null)
  const offY = shape.length===1?1:0
  for(let y=0;y<shape.length;y++) for(let x=0;x<shape[0].length;x++) if(shape[y][x]){
    grid[(y+offY)*4 + x + 1] = SHAPES[key].color
  }
  return grid
})

function handleKey(e){
  if(e.code==='ArrowLeft'){ e.preventDefault(); move(-1)}
  else if(e.code==='ArrowRight'){ e.preventDefault(); move(1)}
  else if(e.code==='ArrowDown'){ e.preventDefault(); softDrop()}
  else if(e.code==='ArrowUp'){ e.preventDefault(); rotatePiece()}
  else if(e.code==='Space'){ e.preventDefault(); hardDrop()}
  else if(e.code==='KeyP'){ togglePause()}
}

onMounted(()=>{ reset(); wrap.value?.focus(); })
onUnmounted(()=> { if(interval) clearInterval(interval) })

defineExpose({reset, togglePause})
</script>

<style scoped>
.tetris-wrap {
  outline: none;
  display:flex;
  flex-direction:column;
  gap:6px;
  background:#ece9d8;
  padding:6px;
}
.tetris-top {
  display:flex;
  gap:6px;
  align-items:stretch;
}
.score-box {
  flex:1;
  background:#fff;
  border:1px inset #d4d0c8;
  padding:4px 6px;
  font-size:11px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.score-label { line-height:1.4; }
.next-box {
  width:70px;
  background:#fff;
  border:1px inset #d4d0c8;
  padding:4px;
  display:flex;
  flex-direction:column;
  align-items:center;
}
.next-label { font-size:10px; font-weight:bold; color:#003dd6; margin-bottom:2px; }
.next-grid {
  display:grid;
  grid-template-columns: repeat(4, 12px);
  grid-template-rows: repeat(4, 12px);
  gap:1px;
}
.controls-box {
  display:flex;
  flex-direction:column;
  gap:4px;
}
.xp-mini-btn {
  font-size:10px;
  padding:3px 6px;
  background: linear-gradient(to bottom, #fff, #d4d0c8);
  border:1px solid #7f9db9;
  border-radius:2px;
  cursor:pointer;
}
.xp-mini-btn:active { background:#d4d0c8; }
.board-outer {
  position:relative;
  background:#000;
  border:2px inset #7f9db9;
  padding:2px;
  display:flex;
  justify-content:center;
}
.board {
  display:grid;
  grid-template-rows: repeat(20, 14px);
  gap:1px;
  background:#111;
  width:150px; /* 10*14 + gaps */
}
.cell {
  width:14px; height:14px;
  background:#1a1a1a;
  border:1px solid #222;
  box-sizing:border-box;
}
.cell.filled { border:1px outset rgba(255,255,255,0.6); box-shadow: inset 1px 1px 0 rgba(255,255,255,0.5); }
.cell.filled.cyan { background:#00e5e5; }
.cell.filled.yellow { background:#e5e500; }
.cell.filled.purple { background:#a000e5; }
.cell.filled.green { background:#00d000; }
.cell.filled.red { background:#e50000; }
.cell.filled.blue { background:#0050e5; }
.cell.filled.orange { background:#e5a000; }
.game-over, .paused {
  position:absolute;
  inset:0;
  background: rgba(0,0,0,0.75);
  color:white;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:8px;
  font-weight:bold;
  font-size:14px;
}
.tetris-help {
  font-size:9px;
  color:#333;
  text-align:center;
  background:#ffffe1;
  border:1px solid #aca899;
  padding:2px;
}
</style>
