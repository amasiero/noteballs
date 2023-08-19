import { db } from '@/infra/firebase';
import { Note } from '@/types/note';
import { collection, onSnapshot } from 'firebase/firestore';
import { defineStore } from 'pinia';

interface NoteState {
  notes: Note[];
}

export const useNotesStore = defineStore('notes', {
  state: (): NoteState => ({
    notes: [],
  }),
  actions: {
    fetch() {
      onSnapshot(collection(db, 'notes'), (querySnapshot) => {
        const notes: Note[] = [];
        querySnapshot.forEach((doc: any) => {
          notes.unshift({
            id: doc.id,
            ...doc.data(),
          } as Note);
        });
        this.notes = notes;
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
