<template>
  <div>
    <AppNav @menu="menuOpen = true" />
    <AppMenu :open="menuOpen" @close="menuOpen = false" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
</script>
