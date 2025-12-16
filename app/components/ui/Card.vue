<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  price?: string | number;
  date?: string;
}

defineProps<Props>()
</script>

<template>
  <div
    class="animation rounded-lg border border-border bg-card p-4 shadow-sm transition cursor-pointer hover:border-[#a252c83d]">
    <div class="flex items-start justify-between mb-2">
      <div>
        <h3 class="font-semibold text-sm">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-muted-foreground"> {{ subtitle }}</p>
      </div>

      <slot name="status"></slot>
    </div>

    <div class="space-y-2">
      <slot />
    </div>

    <div v-if="price || date" class="mt-3  text-xs text-muted-foreground">
      <p v-if="price">{{ price }}</p>
      <p v-if="date">{{ date }}</p>
    </div>

  </div>
</template>

<style scoped>
@keyframes show {
  from {
    border-color: #a252c83d;
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }

  90% {
    border-color: #a252c83d;
  }

  to {
    border-color: transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}


.animation {
  animation: show 0.3s ease-in-out;
}
</style>
