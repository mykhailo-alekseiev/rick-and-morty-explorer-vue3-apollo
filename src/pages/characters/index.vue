<template>
  <main>
    <div v-if="loading">
      <div class="container">
        <Skeleton
          v-for="(_, index) in Array.from({ length: 5 })"
          class="cardSkeleton"
          :key="index"
        />
      </div>
    </div>
    <div v-else-if="characters" class="container">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :id="character.id"
        :name="character.name"
        :image="character.image"
        :gender="character.gender"
        :species="character.species"
        :status="character.status"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import type { Character } from '@/types/character'
import CharacterCard from '@/components/CharacterCard.vue'

useHead({
  title: 'Characters'
})

const { characters, loading } = useCharactersData()

function useCharactersData() {
  const { result, loading } = useQuery<{
    characters: {
      results: Array<Character>
    }
  }>(gql`
    query Characters {
      characters {
        # (page: 1, filter: { name: "Morty" })
        results {
          id
          name
          image
          gender
          species
          status
        }
      }
    }
  `)

  const characters = computed(() => result.value?.characters.results ?? [])

  return {
    characters,
    loading
  }
}
</script>

<style scoped>
.container {
  @apply grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}

.cardSkeleton {
  @apply aspect-[3/4] shrink-0 rounded-3xl;
}
</style>
