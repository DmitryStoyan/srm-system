<script setup lang="ts">
useHead({
  title: "Login | SRM System"
})

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');


</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <UiInput v-model="emailRef" type="email" placeholder="Email" class="mb-3" />
        <UiInput v-model="passwordRef" type="password" placeholder="Password" class="mb-3" />
        <UiInput v-model="nameRef" placeholder="Name" class="mb-3" />
        <div class="flex items-center justify-center gap-5">
          <UiButton>Кнопка</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>
