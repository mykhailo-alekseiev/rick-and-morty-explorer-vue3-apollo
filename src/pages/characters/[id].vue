<template>
  <div v-if="loading">Loading...</div>
  <Card v-else-if="character" class="rounded-2xl">
    <CardContent class="container">
      <div class="imgContainer">
        <img :src="character.image" :alt="character.name" class="size-full object-cover" />
      </div>
      <div class="info">
        <h1 class="title">{{ character.name }}</h1>
        <Separator />
        <div class="grid grid-cols-[auto_1fr] gap-5 text-lg md:text-xl">
          <p class="underline">Species:</p>
          <p>{{ character.species ?? 'Unknown' }}</p>
          <p class="underline">Status:</p>
          <p>{{ character.status ?? 'Unknown' }}</p>
          <p class="underline">Gender:</p>
          <p>{{ character.gender ?? 'Unknown' }}</p>
          <p class="underline">Origin:</p>
          <p>{{ character.origin?.name ?? 'Unknown' }}</p>
          <p class="underline">Dimension:</p>
          <p>{{ character.origin?.dimension ?? 'Unknown' }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card } from '@/components/ui/card'

const route = useRoute('/characters/[id]')

const { loading, character } = useCharacter(route.params.id)

useHead({
  title: character?.value?.name
})
</script>

<style scoped>
.container {
  @apply grid grid-cols-1 gap-12 px-6 py-8 md:grid-cols-[450px_1fr];

  .imgContainer {
    @apply overflow-hidden rounded-2xl;
  }

  .info {
    @apply grid h-min gap-6;

    .title {
      @apply text-5xl font-black md:text-6xl;
    }
  }
}
</style>
