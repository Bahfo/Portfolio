// Standalone Tetris engine - no Vue, can be tested with Node
export const W = 10, H = 20
export const SHAPES = {
  I: { color:'cyan', cells:[[1,1,1,1]] },
  O: { color:'yellow', cells:[[1,1],[1,1]] },
  T: { color:'purple', cells:[[0,1,0],[1,1,1]] },
  S: { color:'green', cells:[[0,1,1],[1,1,0]] },
  Z: { color:'red', cells:[[1,1,0],[0,1,1]] },
  J: { color:'blue', cells:[[1,0,0],[1,1,1]] },
  L: { color:'orange', cells:[[0,0,1],[1,1,1]] },
}
export function rotate(matrix){
  const h=matrix.length, w=matrix[0].length
  const res = Array.from({length:w}, ()=> Array(h).fill(0))
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) res[x][h-1-y]=matrix[y][x]
  return res
}
export function collides(board, piece, dx, dy, testMatrix=null){
  const m = testMatrix || piece.matrix
  for(let y=0;y<m.length;y++) for(let x=0;x<m[0].length;x++) if(m[y][x]){
    const nx = piece.x + x + dx
    const ny = piece.y + y + dy
    if(nx<0||nx>=W||ny>=H) return true
    if(ny>=0 && board[ny][nx]) return true
  }
  return false
}
