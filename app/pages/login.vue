<script setup lang="ts">
import { useIsLoadingStore, useAuthStore } from '@/../stores/auth.store'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

useHead({
  title: "Auth | SRM System"
})

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const handleAuthSuccess = async (user: any) => {
  const { $firebase } = useNuxtApp();

  const userDoc = await getDoc(doc($firebase.db, "users", user.uid));

  const userData = userDoc.exists()
    ? userDoc.data()
    : {
      email: user.email ?? "",
      name: user.displayName ?? "",
      status: true
    };

  authStore.set({
    email: userData.email,
    name: userData.name,
    status: userData.status ?? true,
  })

  console.log("STORE UPDATED:", authStore.$state);

  emailRef.value = "";
  passwordRef.value = "";
  nameRef.value = "";

  router.push('/');
};

const login = async () => {
  isLoadingStore.set(true);

  try {
    const { $firebase } = useNuxtApp();

    const userCredential = await signInWithEmailAndPassword(
      $firebase.auth,
      emailRef.value,
      passwordRef.value
    );

    await handleAuthSuccess(userCredential.user);
  } catch (error: any) {
    console.error('Ошибка при авторизации:', error.message);
  } finally {
    isLoadingStore.set(false);
  }
};

const register = async () => {
  isLoadingStore.set(true);
  try {
    const { $firebase } = useNuxtApp();

    const userCredential = await createUserWithEmailAndPassword(
      $firebase.auth,
      emailRef.value,
      passwordRef.value
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: nameRef.value
    });

    await setDoc(doc($firebase.db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: nameRef.value,
      createdAt: new Date(),
    });

    await handleAuthSuccess(user);

  } catch (error: any) {
    console.error('Ошибка при регистрации:', error.message);
  } finally {
    isLoadingStore.set(false);
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login/Register</h1>

      <form @submit.prevent>
        <UiInput v-model="emailRef" type="email" placeholder="Email" class="mb-3" />
        <UiInput v-model="passwordRef" type="password" placeholder="Password" class="mb-3" />
        <UiInput v-model="nameRef" placeholder="Name" class="mb-3" />

        <div class="flex items-center justify-center gap-5">
          <UiButton @click="login">Login</UiButton>
          <UiButton @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>
