<template>
  <div class="p-5 pt-2">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - Rick and Morty` : 'Rick and Morty')
})
</script>

<style scoped></style>
