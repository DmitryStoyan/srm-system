<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md'
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])
const attrs = useAttrs()

const inputValue = computed({
  get: () => props.modelValue,
  set: (v: string | number) => emit('update:modelValue', v)
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-1 text-sm'
    case 'lg':
      return 'px-4 py-3 text-base'
    default:
      return 'px-3 py-2 text-sm'
  }
})

const clear = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <label v-if="label" :for="id" class="block mb-1 text-sm text-white/80">{{ label }}</label>

  <div class="relative flex items-center">
    <slot name="prefix" />

    <input :id="id" :name="name" :type="type" v-model="inputValue" :placeholder="placeholder" :disabled="disabled"
      v-bind="attrs"
      class="w-full bg-transparent border border-white rounded-md placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors duration-150"
      :class="sizeClasses" @input="$emit('input', $event)" @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)" />

    <slot name="suffix" />

    <button v-if="clearable && inputValue" type="button" @click="clear"
      class="absolute right-2 text-white/70 hover:text-white" aria-label="clear">
      ✕
    </button>
  </div>
</template>

<style scoped>
.input-fallback {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.95);
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}
</style>
