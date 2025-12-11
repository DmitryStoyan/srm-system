<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  block: false,
  disabled: false,
  loading: false,
  type: "button",
  color: ''
})

const emits = defineEmits<{
  click: [MouseEvent];
}>();

const classes = computed(() => [
  "inline-flex items-center justify-center font-medium rounded-lg transition-all select-none",
  props.block ? "w-full" : "w-auto",

  props.size === "sm" && "px-3 py-1.5 text-sm",
  props.size === "md" && "px-4 py-2 text-base",
  props.size === "lg" && "px-5 py-3 text-lg",

  props.color,

  !props.color && props.variant === "primary" && "bg-gray-600 text-white hover:bg-gray-700",
  !props.color && props.variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
  !props.color && props.variant === "outline" && "border border-white text-white hover:bg-white/10",
  !props.color && props.variant === "danger" && "bg-red-600 text-white hover:bg-red-700",


  (props.disabled || props.loading) &&
  "opacity-50 pointer-events-none cursor-not-allowed",
]);

const handleClick = (e: MouseEvent) => {
  if (!props.disabled && !props.loading) emits("click", e);
};
</script>

<template>
  <button :type="type" :class="classes" @click="handleClick">
    <span v-if="loading" class="animate-spin mr-2">⏳</span>
    <slot></slot>
  </button>
</template>

<style scoped></style>
