import { db } from '@/infra/firebase';
import { Note } from '@/types/note';
import { collection, getDocs } from 'firebase/firestore';
import { defineStore } from 'pinia';

interface NoteState {
  notes: Note[];
}

const notes = [
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
    content: 'Voluptatem iusto voluptatem est sapiente aliquid omnis dolor fuga. Eos sed qui omnis qui optio nesciunt.',
  },
];

export const useNotesStore = defineStore('notes', {
  state: (): NoteState => ({
    notes: [],
  }),
  actions: {
    async fetch() {
      const querySnapshot = await getDocs(collection(db, 'notes'));
      querySnapshot.forEach((doc: any) => {
        this.notes.unshift({
          id: doc.id,
          ...doc.data(),
        } as Note);
      });
    },
    create(note: Note) {
      this.notes.unshift(note);
    },
    remove(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    update(note: Note) {
      this.notes = this.notes.map((n) => (n.id === note.id ? note : n));
    },
  },
  getters: {
    findById: (state) => (id: string) => {
      return state.notes.find((note) => note.id === id);
    },
    totalNotes: (state) => {
      return state.notes.length;
    },
    totalNumberOfCharacters: (state) => {
      return state.notes.reduce((acc, note) => acc + note.content.length, 0);
    },
  },
});
