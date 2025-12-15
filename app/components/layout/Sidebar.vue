<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from '~~/stores/auth.store';
import { signOut } from 'firebase/auth'

const store = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter();

const logout = async () => {
  isLoadingStore.set(true);

  try {
    const { $firebase } = useNuxtApp();
    await signOut($firebase.auth)
    store.clear();
    await router.push('/login')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  } finally {
    isLoadingStore.set(false);
  }


}
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <nuxt-link to="/" class="mb-1- block">
      <NuxtImg src="/logo.svg" alt="" width="140px" class="mx-auto" />
    </nuxt-link>

    <button class="absolute top-2 right-3 transition-colors hover:text-purple-400">
      <Icon @click="logout" name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<style scoped></style>
