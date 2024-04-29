<template>
  <div className="card group">
    <img :src="image" :alt="name" class="cardImg group-hover:scale-105" />
    <div class="cardInfo">
      <p class="characterName">{{ name }}</p>
      <Separator class="bg-neutral-500" />
      <div class="characterInfo">
        <Badge>{{ gender }}</Badge>
        <Badge class="!bg-green-700">{{ species }}</Badge>
        <Badge class="!bg-yellow-700">{{ status }}</Badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/character'

type CharacterCardProps = Character
defineProps<CharacterCardProps>()
</script>

<style scoped>
.card {
  @apply relative flex aspect-[3/4] shrink-0 flex-col justify-end overflow-hidden rounded-3xl;

  .cardImg {
    @apply absolute left-0 top-0 -z-[1] size-full object-cover transition-all;
  }

  .cardInfo {
    @apply flex min-h-32 flex-col gap-3 bg-black/65 p-4 md:min-h-28;

    .characterName {
      @apply text-xl font-bold;
    }

    .characterInfo {
      @apply flex flex-wrap items-center gap-2;
    }
  }
}
</style>
