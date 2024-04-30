import type { Character } from '@/types/character'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

// TODO: handle error
export const useCharacter = (id: string) => {
  const { result, loading } = useQuery<
    {
      character: Character & {
        origin: {
          name: string
          dimension: string
        }
      }
    },
    {
      id: string
    }
  >(
    gql`
      query Character($id: ID!) {
        character(id: $id) {
          id
          name
          image
          gender
          status
          species
          origin {
            name
            dimension
          }
        }
      }
    `,
    {
      id
    }
  )

  const character = computed(() => result.value?.character)

  return { character, loading }
}
