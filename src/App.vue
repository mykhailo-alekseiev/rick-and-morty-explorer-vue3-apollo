<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
    >
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
          <img src="/logo.svg" alt="logo" class="size-10" />
          <span class="sr-only">Rick and Morty</span>
        </RouterLink>
        <RouterLink
          to="/characters"
          class="text-foreground transition-colors hover:text-foreground"
        >
          Characters
        </RouterLink>
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden">
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold">
              <img src="/logo.svg" alt="logo" class="size-10" />
              <span class="sr-only">Rick and Morty</span>
            </RouterLink>
            <RouterLink to="/characters" class="hover:text-foreground"> Characters </RouterLink>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <RouterView v-slot="{ Component }">
        <Transition name="scale" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

useHead({
  titleTemplate: (title) => (title ? `${title} | Rick and Morty` : 'Rick and Morty')
})
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
