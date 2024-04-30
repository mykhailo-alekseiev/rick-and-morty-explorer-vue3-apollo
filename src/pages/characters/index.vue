<template>
  <main>
    <div class="grid gap-8">
      <div class="flex w-full flex-col items-center gap-4 md:ml-auto md:flex-row md:gap-2 lg:gap-4">
        <div class="relative w-full md:w-min">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            v-model.trim="filters.name"
            type="search"
            placeholder="Search characters..."
            class="w-full pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>
        <Pagination
          v-if="totalPages > 1"
          v-slot="{ page }"
          v-model:page="filters.page"
          :total="totalPages"
          :sibling-count="0"
          :itemsPerPage="1"
          show-edges
          :default-page="filters.page"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="h-10 w-10 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
          </PaginationList>
        </Pagination>
      </div>
      <div v-if="loading">
        <div class="list">
          <Skeleton
            v-for="(_, index) in Array.from({ length: 5 })"
            class="cardSkeleton"
            :key="index"
          />
        </div>
      </div>
      <div v-else-if="characters" class="list">
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
    </div>
  </main>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import type { Character } from '@/types/character'
import CharacterCard from '@/components/CharacterCard.vue'
import { Search } from 'lucide-vue-next'
import { Pagination, PaginationList, PaginationListItem } from '@/components/ui/pagination'

useHead({
  title: 'Characters'
})

const { characters, loading, filters, totalPages } = useCharactersData()

function useCharactersData() {
  const filters = reactive({
    name: '',
    page: 1
  })
  const totalPages = ref(0)

  const { result, loading } = useQuery<
    {
      characters: {
        results: Array<Character>
        info: {
          pages: number
        }
      }
    },
    {
      name: string
      page: number
    }
  >(
    gql`
      query Characters($name: String, $page: Int) {
        characters(page: $page, filter: { name: $name }) {
          results {
            id
            name
            image
            gender
            species
            status
          }
          info {
            pages
          }
        }
      }
    `,
    filters
  )

  watchEffect(() => {
    if (
      typeof result.value?.characters?.info?.pages !== 'undefined' &&
      totalPages.value !== result.value?.characters.info.pages
    ) {
      totalPages.value = result.value?.characters.info.pages ?? 0
    }
  })

  watch(
    () => filters.name,
    () => {
      filters.page = 1
    }
  )

  const characters = computed(() => result.value?.characters.results ?? [])

  return {
    characters,
    filters,
    loading,
    totalPages
  }
}
</script>

<style scoped>
.list {
  @apply grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}

.cardSkeleton {
  @apply aspect-[3/4] shrink-0 rounded-3xl;
}
</style>
