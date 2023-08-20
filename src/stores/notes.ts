import { db } from '@/infra/firebase';
import { Note } from '@/types/note';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';

interface NoteState {
  notes: Note[];
  loading: boolean;
}

const notesCollection = collection(db, 'notes');
const queryNotesCollectionByCreatedAt = query(notesCollection, orderBy('createdAt'));

export const useNotesStore = defineStore('notes', {
  state: (): NoteState => ({
    notes: [],
    loading: true,
  }),
  actions: {
    async fetch() {
      this.loading = true;
      onSnapshot(queryNotesCollectionByCreatedAt, (querySnapshot) => {
        const notes: Note[] = [];
        querySnapshot.forEach((doc: any) => {
          notes.unshift({
            id: doc.id,
            ...doc.data(),
          } as Note);
        });
        this.notes = notes;
        this.loading = false;
      });
    },
    async create(note: Note) {
      const { id, content } = note;
      await setDoc(doc(notesCollection, id), {
        content,
        createdAt: new Date(),
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
