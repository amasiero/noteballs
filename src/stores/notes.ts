import { db } from '@/infra/firebase';
import { Note } from '@/types/note';
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';

interface NoteState {
  notes: Note[];
}

const notesCollection = collection(db, 'notes');

export const useNotesStore = defineStore('notes', {
  state: (): NoteState => ({
    notes: [],
  }),
  actions: {
    async fetch() {
      onSnapshot(notesCollection, (querySnapshot) => {
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
    async create(note: Note) {
      const { id, content } = note;
      await setDoc(doc(notesCollection, id), {
        content,
      });
    },
    async remove(id: string) {
      await deleteDoc(doc(notesCollection, id));
    },
    async update(note: Note) {
      const { id, content } = note;
      await updateDoc(doc(notesCollection, id), {
        content,
      });
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
