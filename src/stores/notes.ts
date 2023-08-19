import { db } from '@/infra/firebase';
import { Note } from '@/types/note';
import { collection, getDocs } from 'firebase/firestore';
import { defineStore } from 'pinia';

interface NoteState {
  notes: Note[];
}

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
