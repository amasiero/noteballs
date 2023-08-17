<script setup lang="ts">
  import NoteCard from '@/components/NoteCard.vue';
  import NoteForm from '@/components/NoteForm.vue';
</script>

<template>
  <NoteForm />
  <NoteCard v-for="i in 3" :key="i" />
</template>
