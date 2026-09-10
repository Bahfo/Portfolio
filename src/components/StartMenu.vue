<template>
  <div v-show="visible" class="start-menu">
    <div class="start-header">
      <span>{{ user }}</span>
    </div>
    <div class="start-items">
      <div
        v-for="item in items"
        :key="item.id"
        class="start-item"
        @click="$emit('select', item.id)"
      >
        {{ item.icon }} {{ item.label }}
      </div>
      <!-- Allow custom slot -->
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  user: { type: String, default: 'Portfolio User' },
  items: {
    type: Array,
    default: () => [
      { id: 'win-about', label: 'About Me', icon: '📂' },
      { id: 'win-projects', label: 'Projects', icon: '📁' },
      { id: 'win-contact', label: 'Contact Me', icon: '✉️' }
    ]
  }
})
defineEmits(['select'])
</script>

<style scoped>
.start-menu {
  position: fixed;
  bottom: 32px;
  left: 0;
  width: 240px;
  background: white;
  border: 2px solid #0058ee;
  border-top-right-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.start-header {
  background: linear-gradient(to bottom, #0058ee, #033db3);
  color: white;
  padding: 8px 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.start-items {
  padding: 4px 0;
}

.start-item {
  padding: 8px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.start-item:hover,
.start-item:active {
  background-color: #3168d8;
  color: white;
}

@media (max-width: 768px) {
  .start-menu {
    bottom: 40px;
    width: 100vw;
    border-radius: 0;
    border-right: none;
    border-left: none;
  }

  .start-item {
    padding: 14px 16px;
    font-size: 14px;
  }
}
</style>
