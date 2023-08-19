<script setup lang="ts">
  import NoteCard from '@/components/NoteCard.vue';
  import NoteForm from '@/components/NoteForm.vue';
  import { useNotesStore } from '@/stores';
  import { useWatchCharacters } from '@/use/useWatchCharacters';
  // @ts-ignore
  import { v4 as uuidv4 } from 'uuid';
  import { ref } from 'vue';

  const newContent = ref<string>('');
  const notesStore = useNotesStore();

  const onSave = () => {
    const newNote = {
      id: uuidv4(),
      content: newContent.value,
    };
    notesStore.create(newNote);
    newContent.value = '';
  };

  const onDelete = (id: string) => {
    notesStore.remove(id);
  };

  useWatchCharacters(newContent, 150);
</script>

<template>
  <NoteForm v-model="newContent" @save="onSave">
    <template #buttons>
      <div class="control">
        <button class="button is-success" :disabled="!newContent" @click.prevent="onSave">Add new note</button>
      </div>
    </template>
  </NoteForm>
  <NoteCard v-for="note in notesStore.notes" :key="note.id" :note="note" @delete="onDelete" />
</template>
