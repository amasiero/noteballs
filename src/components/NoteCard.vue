<script setup lang="ts">
  import { Note } from '@/types/note';
  import Modal from '@/components/Modal.vue';
  import { computed, reactive } from 'vue';
  import { RouterLink } from 'vue-router';

  interface NoteCardProps {
    note: Note;
  }

  const props = defineProps<NoteCardProps>();
  const emit = defineEmits(['delete']);

  const charactersCount = computed(() => {
    const number = props.note.content.length;
    return `${number} character${number !== 1 ? 's' : ''}`;
  });

  const modals = reactive({
    delete: false,
  });

  const onDelete = () => {
    emit('delete', props.note.id);
  };
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
      <RouterLink :to="`/edit/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="modals.delete = true">Delete</a>
    </footer>
    <Modal v-if="modals.delete" v-model="modals.delete" :action="onDelete"/>
  </div>
</template>
