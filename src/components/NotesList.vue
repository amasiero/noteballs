<script setup lang="ts">
  import NoteCard from '@/components/NoteCard.vue';
  import { useNotesStore } from '@/stores';

  const notesStore = useNotesStore();

  const onDelete = (id: string) => {
    notesStore.remove(id);
  };

  notesStore.fetch();
</script>

<template>
  <div v-if="notesStore.loading" class="is-flex is-justify-content-center is-align-items-center">
    <progress class="progress is-small is-primary" max="100" />
  </div>
  <template v-else>
    <article v-if="!notesStore.notes.length" class="message is-success">
      <div class="message-body">No notes yet. Add a new one!</div>
    </article>
    <NoteCard v-for="note in notesStore.notes" :key="note.id" :note="note" @delete="onDelete" />
  </template>
</template>
