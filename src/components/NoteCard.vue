<script setup lang="ts">
  import Modal from '@/components/Modal.vue';
  import { Note } from '@/types/note';
  import { DateTime } from 'luxon';
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
        <div class="is-flex is-justify-content-space-between is-align-items-center mt-4">
          <small class="has-text-grey-light">{{
            DateTime.fromSeconds(note.createdAt.seconds).toFormat('dd-MM-yyyy @HH:mm')
          }}</small>
          <p class="tag is-normal">{{ charactersCount }}</p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="modals.delete = true">Delete</a>
    </footer>
    <Modal v-if="modals.delete" v-model="modals.delete" :action="onDelete" />
  </div>
</template>
