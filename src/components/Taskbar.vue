<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <button class="start-btn" @click="$emit('toggleStartMenu')">
        <span>{{ startLabel }}</span>
      </button>
      <div class="taskbar-tasks">
        <div
          v-for="win in openWindows"
          :key="win.id"
          class="taskbar-item"
          :class="{ active: isActive(win) }"
          role="button"
          tabindex="0"
          @click="$emit('taskClick', win.id)"
          @keydown.enter="$emit('taskClick', win.id)"
          @keydown.space.prevent="$emit('taskClick', win.id)"
        >
          {{ win.title }}
        </div>
      </div>
    </div>
    <div class="system-tray">{{ clock }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  openWindows: { type: Array, default: () => [] },
  highestZIndex: { type: Number, default: 10 },
  startLabel: { type: String, default: 'start' }
})

defineEmits(['toggleStartMenu', 'taskClick'])

function isActive(win) {
  return !win.minimized && win.zIndex === props.highestZIndex
}

const clock = ref('12:00 PM')

function updateClock() {
  const now = new Date()
  clock.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

let interval = null
onMounted(() => {
  updateClock()
  interval = setInterval(updateClock, 1000)
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.taskbar {
  height: 32px;
  background: linear-gradient(to bottom, #1f2f86 0%, #3168d8 10%, #1941a5 90%, #081e6b 100%);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1000;
  justify-content: space-between;
}

.taskbar-left {
  display: flex;
  align-items: center;
  height: 100%;
  flex-grow: 1;
  overflow-x: auto;
}

.start-btn {
  height: 100%;
  background: linear-gradient(to bottom, #388e3c 0%, #4caf50 50%, #2e7d32 100%);
  border: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: white;
  font-weight: bold;
  font-style: italic;
  font-size: 14px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.taskbar-tasks {
  display: flex;
  gap: 3px;
  padding: 0 5px;
  height: 100%;
  align-items: center;
  overflow-x: auto;
}

.taskbar-item {
  height: 24px;
  width: 120px;
  background: linear-gradient(to bottom, #3c81ec, #1941a5);
  color: white;
  border: 1px solid #0c266b;
  border-radius: 3px;
  font-size: 11px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.taskbar-item.active {
  background: linear-gradient(to bottom, #102a71, #2457c5);
  font-weight: bold;
  border-color: #ffffff66;
}

.system-tray {
  color: white;
  font-size: 11px;
  padding: 0 10px;
  border-left: 1px solid #0f276b;
  height: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #0c43a8, #1958d5);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .taskbar {
    height: 40px;
  }

  .start-btn {
    padding: 0 18px;
    font-size: 16px;
  }

  .taskbar-item {
    height: 30px;
    width: 100px;
    font-size: 12px;
  }
}
</style>
