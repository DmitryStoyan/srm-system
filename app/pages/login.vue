<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from '~~/stores/auth.store'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

useHead({
  title: 'Auth | SRM System'
})

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const handleAuthSuccess = async (user: any) => {
  const { $firebase } = useNuxtApp()

  const userDocRef = doc($firebase.db, 'users', user.uid)
  const userDoc = await getDoc(userDocRef)

  const userData = userDoc.exists()
    ? userDoc.data()
    : {
      email: user.email ?? '',
      name: user.displayName ?? '',
      status: true
    }

  authStore.set({
    email: userData.email,
    name: userData.name,
    status: true
  })

  emailRef.value = ''
  passwordRef.value = ''
  nameRef.value = ''

  await router.push('/')
}

const login = async () => {
  isLoadingStore.set(true)

  try {
    const { $firebase } = useNuxtApp()

    const { user } = await signInWithEmailAndPassword(
      $firebase.auth,
      emailRef.value,
      passwordRef.value
    )

    await handleAuthSuccess(user)
  } catch (error: any) {
    console.error('Ошибка при авторизации:', error.message)
  } finally {
    isLoadingStore.set(false)
  }
}

const register = async () => {
  isLoadingStore.set(true)

  try {
    const { $firebase } = useNuxtApp()

    const { user } = await createUserWithEmailAndPassword(
      $firebase.auth,
      emailRef.value,
      passwordRef.value
    )

    await updateProfile(user, {
      displayName: nameRef.value
    })

    await setDoc(doc($firebase.db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: nameRef.value,
      createdAt: new Date()
    })

    await handleAuthSuccess(user)
  } catch (error: any) {
    console.error('Ошибка при регистрации:', error.message)
  } finally {
    isLoadingStore.set(false)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="w-1/4 rounded bg-sidebar p-5">
      <h1 class="mb-5 text-center text-2xl font-bold">
        Login / Register
      </h1>

      <form @submit.prevent>
        <UiInput v-model="emailRef" type="email" placeholder="Email" class="mb-3" />

        <UiInput v-model="passwordRef" type="password" placeholder="Password" class="mb-3" />

        <UiInput v-model="nameRef" placeholder="Name (only for register)" class="mb-3" />

        <div class="flex items-center justify-center gap-5">
          <UiButton type="button" @click="login">
            Login
          </UiButton>

          <UiButton type="button" @click="register">
            Register
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>
