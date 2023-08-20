<script setup lang="ts">
  import NoteForm from '@/components/NoteForm.vue';
  import NotesList from '@/components/NotesList.vue';
  import { useNotesStore } from '@/stores';
  import { useWatchCharacters } from '@/use/useWatchCharacters';
  import { Timestamp } from 'firebase/firestore';
  // @ts-ignore
  import { v4 as uuidv4 } from 'uuid';
  import { ref } from 'vue';

  const newContent = ref<string>('');
  const notesStore = useNotesStore();

  const onSave = () => {
    const newNote = {
      id: uuidv4(),
      content: newContent.value,
      createdAt: Timestamp.now(),
    };
    notesStore.create(newNote);
    newContent.value = '';
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
  <NotesList />
</template>
