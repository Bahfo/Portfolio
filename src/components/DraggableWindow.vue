<template>
  <div
    v-show="!minimized"
    class="window"
    :style="{ top: position.top + 'px', left: position.left + 'px', zIndex: zIndex, width: size.width + 'px', height: size.height + 'px' }"
    @mousedown="$emit('bringToFront')"
    @touchstart.passive="$emit('bringToFront')"
  >
    <div
      class="title-bar"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
    >
      <span class="title-bar-text">{{ title }}</span>
      <div class="title-bar-controls">
        <button class="minimize-btn" aria-label="Minimize" @click="$emit('minimize')">_</button>
        <button class="close-btn" aria-label="Close" @click="$emit('close')">✕</button>
      </div>
    </div>
    <div class="window-body">
      <slot />
    </div>

    <!-- Resize handles - XP style -->
    <div class="resize-handle n" @mousedown="startResize($event, 'n')" @touchstart.passive="startResize($event, 'n')"></div>
    <div class="resize-handle s" @mousedown="startResize($event, 's')" @touchstart.passive="startResize($event, 's')"></div>
    <div class="resize-handle e" @mousedown="startResize($event, 'e')" @touchstart.passive="startResize($event, 'e')"></div>
    <div class="resize-handle w" @mousedown="startResize($event, 'w')" @touchstart.passive="startResize($event, 'w')"></div>
    <div class="resize-handle ne" @mousedown="startResize($event, 'ne')" @touchstart.passive="startResize($event, 'ne')"></div>
    <div class="resize-handle nw" @mousedown="startResize($event, 'nw')" @touchstart.passive="startResize($event, 'nw')"></div>
    <div class="resize-handle se" @mousedown="startResize($event, 'se')" @touchstart.passive="startResize($event, 'se')"></div>
    <div class="resize-handle sw" @mousedown="startResize($event, 'sw')" @touchstart.passive="startResize($event, 'sw')"></div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  initialTop: { type: Number, default: 40 },
  initialLeft: { type: Number, default: 120 },
  zIndex: { type: Number, default: 10 },
  minimized: { type: Boolean, default: false },
  width: { type: Number, default: 420 },
  height: { type: Number, default: 320 }
})

defineEmits(['close', 'minimize', 'bringToFront'])

const position = reactive({
  top: props.initialTop,
  left: props.initialLeft
})

const size = reactive({
  width: props.width,
  height: props.height
})

watch(() => props.initialTop, v => position.top = v)
watch(() => props.initialLeft, v => position.left = v)
watch(() => props.width, v => size.width = v)
watch(() => props.height, v => size.height = v)

let isDragging = false
let isResizing = false
let resizeDir = null
let startX = 0
let startY = 0
let startW = 0
let startH = 0
let startLeft = 0
let startTop = 0
let offsetX = 0
let offsetY = 0
let winEl = null

function getCoords(e) {
  return e.touches ? e.touches[0] : e
}

function startDrag(e) {
  if (window.innerWidth <= 768) return
  if (isResizing) return
  isDragging = true
  winEl = e.currentTarget.closest('.window')
  if (!winEl) return
  const coords = getCoords(e)
  offsetX = coords.clientX - winEl.offsetLeft
  offsetY = coords.clientY - winEl.offsetTop
}

function doDrag(e) {
  if (!isDragging || !winEl || window.innerWidth <= 768) return
  const coords = getCoords(e)
  position.left = coords.clientX - offsetX
  position.top = coords.clientY - offsetY
}

function stopDrag() {
  isDragging = false
}

function startResize(e, dir) {
  if (window.innerWidth <= 768) return
  e.preventDefault()
  e.stopPropagation()
  isResizing = true
  resizeDir = dir
  const coords = getCoords(e)
  startX = coords.clientX
  startY = coords.clientY
  startW = size.width
  startH = size.height
  startLeft = position.left
  startTop = position.top
  // bring to front handled by parent mousedown, but also ensure
}

function doResize(e) {
  if (!isResizing || window.innerWidth <= 768) return
  const coords = getCoords(e)
  const dx = coords.clientX - startX
  const dy = coords.clientY - startY
  const minW = 280
  const minH = 200

  let newW = startW
  let newH = startH
  let newLeft = startLeft
  let newTop = startTop

  if (resizeDir.includes('e')) {
    newW = Math.max(minW, startW + dx)
  }
  if (resizeDir.includes('s')) {
    newH = Math.max(minH, startH + dy)
  }
  if (resizeDir.includes('w')) {
    newW = Math.max(minW, startW - dx)
    if (newW !== minW || startW - dx >= minW) {
      newLeft = startLeft + dx
      // clamp left not off-screen
      if (newLeft < 0) {
        newW = startW + startLeft
        newLeft = 0
      }
    } else {
      newLeft = startLeft + (startW - minW)
    }
  }
  if (resizeDir.includes('n')) {
    newH = Math.max(minH, startH - dy)
    if (newH !== minH || startH - dy >= minH) {
      newTop = startTop + dy
      if (newTop < 0) {
        newH = startH + startTop
        newTop = 0
      }
    } else {
      newTop = startTop + (startH - minH)
    }
  }

  // Keep window within viewport (rough)
  const maxW = window.innerWidth - newLeft - 8
  const maxH = window.innerHeight - newTop - 36
  if (newW > maxW) newW = maxW
  if (newH > maxH) newH = maxH

  size.width = newW
  size.height = newH
  position.left = newLeft
  position.top = newTop
}

function stopResize() {
  isResizing = false
  resizeDir = null
}

// Global listeners
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => { doDrag(e); doResize(e) })
  window.addEventListener('mouseup', () => { stopDrag(); stopResize() })
  window.addEventListener('touchmove', (e) => { doDrag(e); doResize(e) }, { passive: true })
  window.addEventListener('touchend', () => { stopDrag(); stopResize() })
}
</script>

<style scoped>
.window {
  position: absolute;
  background: #ece9d8;
  border: 1px solid #0831d9;
  border-top: 1px solid #0c2fd1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 
    inset 0 0 0 1px #0a46d6,
    inset 1px 1px 0 0 rgba(255,255,255,0.4),
    2px 5px 18px rgba(0,0,0,0.45),
    0 0 0 1px #001ea0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  animation: xpOpen 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center center;
  overflow: visible;
}

@keyframes xpOpen {
  0% { transform: scale(0.88); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.title-bar {
  background: linear-gradient(to bottom, #4094ff 0%, #095fe0 3%, #0052d4 6%, #0261ff 14%, #0056e0 50%, #0040b0 100%);
  padding: 4px 4px 5px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  cursor: move;
  touch-action: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.45);
  flex-shrink: 0;
}

.title-bar-text {
  color: white;
  font-weight: bold;
  font-size: 12px;
  text-shadow: 1px 1px #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-bar-controls {
  display: flex;
  gap: 2px;
}

.title-bar-controls button {
  width: 21px;
  height: 21px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  background: linear-gradient(to bottom, #6ca8ff 0%, #3a7cf0 45%, #1a5be0 55%, #2a6ef0 100%);
  border: 1px solid #ffffff;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 1px rgba(0,0,0,0.25);
  text-shadow: 0 1px 0 rgba(0,0,0,0.4);
  transition: filter 0.12s, transform 0.08s;
}

.title-bar-controls button:hover {
  filter: brightness(1.15);
}

.title-bar-controls button:active {
  transform: translateY(1px);
  filter: brightness(0.9);
}

.title-bar-controls button.minimize-btn {
  background: linear-gradient(to bottom, #6aa9ff 0%, #2a6ef0 50%, #1e4ecf 100%);
}

.title-bar-controls button.close-btn {
  background: linear-gradient(to bottom, #ff8a6b 0%, #e94a2b 35%, #d12b0a 60%, #b51f06 100%);
  border-color: #fff;
}

.title-bar-controls button.close-btn:hover {
  background: linear-gradient(to bottom, #ff9a80, #f0603a);
}

.window-body {
  padding: 12px;
  flex-grow: 1;
  background: #fff;
  margin: 3px 3px 3px 3px;
  border: 1px solid #7f9db9;
  border-top: 1px solid #aca899;
  box-shadow: inset 0 0 0 1px #fff, inset 1px 1px 2px rgba(0,0,0,0.08);
  font-size: 13px;
  user-select: text;
  overflow-y: auto;
  border-radius: 0 0 2px 2px;
  min-height: 0;
}

/* Resize handles - invisible but with cursor, XP style thin borders */
.resize-handle {
  position: absolute;
  z-index: 2;
}

.resize-handle.n {
  top: -3px; left: 6px; right: 6px; height: 5px;
  cursor: n-resize;
}
.resize-handle.s {
  bottom: -3px; left: 6px; right: 6px; height: 6px;
  cursor: s-resize;
}
.resize-handle.e {
  top: 6px; bottom: 6px; right: -3px; width: 6px;
  cursor: e-resize;
}
.resize-handle.w {
  top: 6px; bottom: 6px; left: -3px; width: 6px;
  cursor: w-resize;
}
.resize-handle.ne {
  top: -3px; right: -3px; width: 10px; height: 10px;
  cursor: ne-resize;
}
.resize-handle.nw {
  top: -3px; left: -3px; width: 10px; height: 10px;
  cursor: nw-resize;
}
.resize-handle.se {
  bottom: -3px; right: -3px; width: 14px; height: 14px;
  cursor: se-resize;
  /* XP resize grip visual */
  background:
    linear-gradient(45deg, transparent 30%, #7f9db9 30%, #7f9db9 40%, transparent 40%),
    linear-gradient(45deg, transparent 50%, #7f9db9 50%, #7f9db9 60%, transparent 60%),
    linear-gradient(45deg, transparent 70%, #7f9db9 70%, #7f9db9 80%, transparent 80%);
  background-size: 100% 100%;
  border-bottom-right-radius: 4px;
  opacity: 0.85;
}
.resize-handle.sw {
  bottom: -3px; left: -3px; width: 10px; height: 10px;
  cursor: sw-resize;
}

@media (max-width: 768px) {
  .window {
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: calc(100vh - 40px) !important;
    border-radius: 0;
    border: none;
    box-shadow: none;
  }

  .title-bar {
    padding: 8px 10px;
    border-radius: 0;
    cursor: default;
  }

  .title-bar-text {
    font-size: 14px;
  }

  .title-bar-controls button {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .resize-handle { display: none; }
}
</style>
