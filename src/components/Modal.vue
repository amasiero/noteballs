<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { onMounted, onUnmounted, ref } from 'vue';

  interface ModalProps {
    modelValue: boolean;
    action: () => void;
  }

  const props = defineProps<ModalProps>();

  const emit = defineEmits(['update:modelValue']);

  const modalCardRef = ref<HTMLElement | null>(null);

  const onCloseModal = () => {
    emit('update:modelValue', false);
  };

  const onDelete = () => {
    props.action();
    emit('update:modelValue', false);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCloseModal();
    }
  };

  onClickOutside(modalCardRef, onCloseModal);

  onMounted(() => {
    document.addEventListener('keyup', handleKeyUp);
  });

  onUnmounted(() => {
    // Necessary to prevent memory leaks
    document.removeEventListener('keyup', handleKeyUp);
  });
</script>

<template>
  <div class="modal is-active px-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button class="delete" aria-label="close" @click.prevent="onCloseModal"></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note?</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-danger" @click.prevent="onDelete">Delete</button>
        <button class="button" @click.prevent="onCloseModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>
