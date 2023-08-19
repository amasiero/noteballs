import { watch } from 'vue';

export function useWatchCharacters(toWatch: any, maxCharacters: number = 100) {
  watch(toWatch, (value) => {
    if (value.length > maxCharacters) {
      alert(`Only ${maxCharacters} characters are allowed!`);
      toWatch.value = value.slice(0, maxCharacters);
    }
  });
}
