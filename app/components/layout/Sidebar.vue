<script lang="ts" setup>

</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <nuxt-link to="/" class="mb-1- block">
      <NuxtImg src="/logo.svg" alt="" width="140px" class="mx-auto" />
    </nuxt-link>

    <button class="absolute top-2 right-3 transition-colors hover:text-purple-400">
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<style scoped></style>
