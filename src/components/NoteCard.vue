<script setup lang="ts">
  import { Note } from '@/types/note';
  import { computed } from 'vue';

  interface NoteCardProps {
    note: Note;
  }

  const props = defineProps<NoteCardProps>();

  const charactersCount = computed(() => {
    const number = props.note.content.length;
    return `${number} character${number !== 1 ? 's' : ''}`;
  });
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content is-flex is-flex-direction-column">
        <p>{{ note.content }}</p>
        <p class="tag is-normal is-align-self-flex-end">{{ charactersCount }}</p>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>
