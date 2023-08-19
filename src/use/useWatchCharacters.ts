import { watch } from 'vue';

export function useWatchCharacters(toWatch: any) {
  watch(toWatch, (value) => {
    if (value.length > 100) {
      alert('You have reached the maximum number (100) of characters!');
      toWatch.value = value.slice(0, 100);
    }
  });
}
