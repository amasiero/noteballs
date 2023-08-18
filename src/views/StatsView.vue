<script setup lang="ts">
import { useNotesStore } from '@/stores';


const notesStore = useNotesStore();
</script>

<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Number of notes</td>
        <td>{{ notesStore.totalNotes }}</td>
      </tr>
      <tr>
        <td>Number of characters (of all notes)</td>
        <td>{{ notesStore.totalNumberOfCharacters }}</td>
      </tr>
    </tbody>
  </table>
</template>
