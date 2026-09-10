<template>
  <div class="desktop-icon" :class="{soft: soft}" role="button" tabindex="0" @click="$emit('open')" @keydown.enter="$emit('open')" @keydown.space.prevent="$emit('open')">
    <img :src="icon" :alt="label" />
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  soft: { type: Boolean, default: false }
})
defineEmits(['open'])
</script>

<style scoped>
.desktop-icon {
  width: 75px;
  padding: 5px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
}

.desktop-icon img {
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  pointer-events: none;
  image-rendering: auto;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.6)) saturate(0.92) brightness(1.03);
  transition: filter 0.2s;
}

.desktop-icon.soft img {
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.45)) saturate(0.85) brightness(1.08) contrast(0.96);
  opacity: 0.96;
}

.desktop-icon:hover img,
.desktop-icon.soft:hover img {
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.7)) saturate(1) brightness(1.06);
}

.desktop-icon span {
  font-size: 11px;
  word-break: break-word;
}

.desktop-icon:active,
.desktop-icon:hover {
  background-color: rgba(11, 93, 255, 0.4);
  border: 1px dotted rgba(255, 255, 255, 0.8);
}

.desktop-icon:focus {
  outline: 1px dotted white;
}

@media (max-width: 768px) {
  .desktop-icon {
    width: 70px;
  }
}
</style>
