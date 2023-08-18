<script setup lang="ts">
  import NoteForm from '@/components/NoteForm.vue';
  import { useNotesStore } from '@/stores';
  import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


  const notesStore = useNotesStore();
  const route = useRoute();
  const router = useRouter();

  const noteId = route.params.id as string;
  const note = notesStore.notes.find((note) => note.id === noteId);

  const newContent = ref<string>(note?.content || '');

  const onSave = () => {
    const note = {
      id: noteId,
      content: newContent.value,
    };

    notesStore.update(note);

    newContent.value = '';
    router.push('/');
  };

  const onCancel = () => {
    router.push('/');
  };
</script>

<template>
  <NoteForm v-model="newContent" @save="onSave">
    <template #buttons>
      <div class="control">
        <button class="button is-success mr-4" :disabled="!newContent" @click.prevent="onSave">Save note</button>
        <button class="button is-secondary" @click.prevent="onCancel">Cancel</button>
      </div>
    </template>
  </NoteForm>
</template>
