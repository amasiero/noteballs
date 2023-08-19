<script setup lang="ts">
  import NoteCard from '@/components/NoteCard.vue';
  import { useNotesStore } from '@/stores';

  const notesStore = useNotesStore();

  const onDelete = (id: string) => {
    notesStore.remove(id);
  };

  await notesStore.fetch();
</script>

<template>
  <NoteCard v-for="note in notesStore.notes" :key="note.id" :note="note" @delete="onDelete" />
</template>
