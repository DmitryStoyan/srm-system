<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';

useHead({
  title: 'Home | SRM System'
})

const drugCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()


</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">SRM System</h1>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="data">
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(column, index) in data" :key="column.id">
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
            тест
          </div>
          <UiCard class="mb-3" draggable="true" title="Zagolovok" price="100000 Р"
            subtitle="Описание проекта на самый клевый лад" date="10.12.2025" />
        </div>
      </div>
    </div>
  </div>
</template>
