<script setup lang="ts">
interface NoteFormProps {
  modelValue: string;
}

withDefaults(defineProps<NoteFormProps>(), {
  modelValue: '',
});

const emit = defineEmits(['update:modelValue', 'save']);

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a new note" :value="modelValue" @input="onInput"></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-success" :disabled="!modelValue" @click.prevent="$emit('save')">Add new note</button>
      </div>
    </div>
  </div>
</template>
