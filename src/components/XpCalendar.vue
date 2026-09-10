<template>
  <div class="xp-calendar">
    <div class="cal-titlebar">
      <span><img src="https://win98icons.alexmeub.com/icons/png/calendar-4.png" width="12" height="12"/> Calendar</span>
      <div class="cal-controls">
        <button @click="shiftMonth(-1)">◂</button>
        <button @click="goToday">Today</button>
        <button @click="shiftMonth(1)">▸</button>
      </div>
    </div>
    <div class="cal-header">
      <button class="cal-nav" @click="shiftMonth(-1)">‹</button>
      <div class="cal-month">{{ monthName }} {{ year }}</div>
      <button class="cal-nav" @click="shiftMonth(1)">›</button>
    </div>
    <div class="cal-weekdays">
      <span v-for="d in weekdays" :key="d">{{ d }}</span>
    </div>
    <div class="cal-grid">
      <span
        v-for="(cell, i) in cells"
        :key="i"
        class="cal-cell"
        :class="{
          other: cell.other,
          today: cell.isToday,
          selected: cell.isSelected
        }"
        @click="selected = cell.dateStr"
      >{{ cell.day }}</span>
    </div>
    <div class="cal-footer">
      <span class="cal-today-label">Today: {{ todayLabel }}</span>
      <span class="cal-time">{{ timeStr }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const now = new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth()) // 0-11
const selected = ref(now.toISOString().slice(0,10))
const timeStr = ref(now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}))

let timer = null
onMounted(() => {
  timer = setInterval(() => {
    timeStr.value = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

const weekdays = ['Su','Mo','Tu','We','Th','Fr','Sa']
const monthName = computed(() => new Date(year.value, month.value, 1).toLocaleDateString('en-US', {month:'long'}))
const todayLabel = computed(() => new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}))

const cells = computed(() => {
  const first = new Date(year.value, month.value, 1)
  const startDay = first.getDay()
  const daysInMonth = new Date(year.value, month.value+1, 0).getDate()
  const daysInPrev = new Date(year.value, month.value, 0).getDate()
  const todayStr = new Date().toISOString().slice(0,10)
  const arr = []
  for (let i = startDay-1; i >= 0; i--) {
    const d = daysInPrev - i
    const date = new Date(year.value, month.value-1, d)
    const ds = date.toISOString().slice(0,10)
    arr.push({day:d, other:true, isToday: ds===todayStr, isSelected: ds===selected.value, dateStr: ds})
  }
  for (let d=1; d<=daysInMonth; d++) {
    const date = new Date(year.value, month.value, d)
    const ds = date.toISOString().slice(0,10)
    arr.push({day:d, other:false, isToday: ds===todayStr, isSelected: ds===selected.value, dateStr: ds})
  }
  const remaining = 42 - arr.length
  for (let d=1; d<=remaining; d++) {
    const date = new Date(year.value, month.value+1, d)
    const ds = date.toISOString().slice(0,10)
    arr.push({day:d, other:true, isToday: ds===todayStr, isSelected: ds===selected.value, dateStr: ds})
  }
  return arr.slice(0,42)
})

function shiftMonth(dir){
  month.value += dir
  if (month.value<0){ month.value=11; year.value--}
  if (month.value>11){ month.value=0; year.value++}
}
function goToday(){
  const n=new Date()
  year.value=n.getFullYear()
  month.value=n.getMonth()
  selected.value=n.toISOString().slice(0,10)
}
</script>

<style scoped>
.xp-calendar {
  width: 190px;
  background: #ece9d8;
  border: 1px solid #0831d9;
  border-radius: 6px 6px 0 0;
  box-shadow: 1px 2px 8px rgba(0,0,0,0.3), inset 1px 1px 0 rgba(255,255,255,0.7);
  font-family: Tahoma, sans-serif;
  overflow: hidden;
}
.cal-titlebar {
  background: linear-gradient(to bottom, #4094ff 0%, #0052d4 50%, #0040b0 100%);
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 6px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  text-shadow: 0 1px 0 rgba(0,0,0,0.4);
}
.cal-titlebar span { display:flex; align-items:center; gap:4px; }
.cal-controls { display:flex; gap:2px; }
.cal-controls button {
  font-size: 9px;
  padding: 1px 4px;
  background: linear-gradient(to bottom, #fff, #d4d0c8);
  border:1px solid #7f9db9;
  border-radius:2px;
  cursor:pointer;
}
.cal-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#ece9d8;
  padding:4px 6px;
  font-size:12px;
  font-weight:bold;
  color:#003dd6;
  border-bottom:1px solid #aca899;
}
.cal-nav {
  width:22px; height:18px;
  background: linear-gradient(to bottom, #fff, #d4d0c8);
  border:1px solid #7f9db9;
  border-radius:2px;
  cursor:pointer;
  font-size:12px;
}
.cal-weekdays {
  display:grid;
  grid-template-columns: repeat(7,1fr);
  background:#ece9d8;
  font-size:10px;
  text-align:center;
  color:#333;
  padding:2px 0;
  border-bottom:1px solid #d4d0c8;
}
.cal-grid {
  display:grid;
  grid-template-columns: repeat(7,1fr);
  background:white;
  padding:4px;
  gap:1px;
}
.cal-cell {
  font-size:11px;
  text-align:center;
  padding:3px 0;
  cursor:pointer;
  border:1px solid transparent;
  border-radius:2px;
}
.cal-cell.other { color:#999; }
.cal-cell.today { background:#3168d8; color:white; font-weight:bold; border-color:#0a46d6; }
.cal-cell.selected:not(.today) { background:#fff0a0; border-color:#d4a000; }
.cal-cell:hover { background:#e8f0ff; border-color:#7f9db9; }
.cal-footer {
  background:#ece9d8;
  border-top:1px solid #aca899;
  padding:4px 6px;
  font-size:10px;
  display:flex;
  justify-content:space-between;
  color:#333;
}
.cal-time {
  background:#fff;
  border:1px inset #d4d0c8;
  padding:0 4px;
  font-family:"Courier New", monospace;
}
</style>
