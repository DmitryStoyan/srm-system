<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from '~~/stores/auth.store';
import { doc, getDoc } from 'firebase/firestore';

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const { $firebase } = useNuxtApp();
    const user = $firebase.auth.currentUser

    if (!user) {
      throw new Error('Пользователь не авторизован')
    }

    const userDocRef = doc($firebase.db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User не найден')
    }

    const userData = userDoc.data();

    store.set({
      email: userData.email,
      name: userData.name,
      status: true
    })
  } catch (error) {
    router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
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
