<template>
  <button class="xp-btn" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
// Reusable XP button - no props needed, just slot content
defineEmits(['click'])
</script>

<style scoped>
.xp-btn {
  background: linear-gradient(to bottom, #ffffff 0%, #ece9d8 100%);
  border: 1px solid #003c74;
  border-radius: 3px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  font-family: Tahoma, "Segoe UI", sans-serif;
}

.xp-btn:active {
  background: #dedabf;
}

.xp-btn:focus {
  outline: 1px dotted #000;
  outline-offset: -2px;
}
</style>
