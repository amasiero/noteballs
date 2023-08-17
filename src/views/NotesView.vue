<script setup lang="ts">
  import NoteCard from '@/components/NoteCard.vue';
  import NoteForm from '@/components/NoteForm.vue';
  import { Note } from '@/types/note';
  import { v4 as uuidv4 } from 'uuid';
  import { ref, watch } from 'vue';

  const notes = ref<Note[]>([
    {
      id: 'be6180e0-80b4-45ed-a1b1-f1e3a32de505',
      content: 'Rerum sunt excepturi quia ut suscipit est. Quidem pariatur molestiae eligendi id eum.',
    },
    {
      id: 'bd41f1bd-b2e8-4fa7-b2f6-7ee8492e0a7a',
      content: 'Qui fuga est a eum id quo doloribus. Amet maiores nihil sed voluptatem placeat quia qui.',
    },
    {
      id: '52f3ff53-2d10-4a4b-b377-8ce41ff23acb',
      content:
        'Voluptatem iusto voluptatem est sapiente aliquid omnis dolor fuga. Eos sed qui omnis qui optio nesciunt.',
    },
  ]);
  const newContent = ref<string>('');

  const onSave = () => {
    notes.value.unshift({
      id: uuidv4(),
      content: newContent.value,
    });
    newContent.value = '';
  };

  const onDelete = (id: string) => {
    notes.value = notes.value.filter((note) => note.id !== id);
  };
</script>

<template>
  <NoteForm v-model="newContent" @save="onSave" />
  <NoteCard v-for="note in notes" :key="note.id" :note="note" @delete="onDelete" />
</template>
