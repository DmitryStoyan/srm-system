<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from '~~/stores/auth.store'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const isLoadingStore = useIsLoadingStore()
const store = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const { $firebase } = useNuxtApp()

  isLoadingStore.set(true)

  onAuthStateChanged($firebase.auth, async (user) => {
    try {
      if (route.path === '/login') return

      if (!user) {
        store.clear()
        await router.push('/login')
        return
      }

      let profile = {
        email: user.email ?? '',
        name: user.displayName ?? '',
      }

      try {
        const snap = await getDoc(doc($firebase.db, 'users', user.uid))
        if (snap.exists()) {
          profile = { ...profile, ...snap.data() }
        }
      } catch (error) {
        console.warn('Ошибка при загрузке профиля', error)
      }

      store.set({
        email: profile.email,
        name: profile.name,
        status: true
      })
    } finally {
      isLoadingStore.set(false)
    }
  })

})
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else :class="{ grid: store.isAuth }" style="min-height: 100vh;">
    <LayoutSidebar v-if="store.isAuth" />

    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
