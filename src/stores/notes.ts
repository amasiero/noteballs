import { db } from '@/infra/firebase';
import { useAuthStore } from '@/stores/auth';
import { Note } from '@/types/note';
import {
  CollectionReference,
  DocumentData,
  Query,
  Unsubscribe,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { defineStore } from 'pinia';

interface NoteState {
  notes: Note[];
  loading: boolean;
}

let notesCollection: CollectionReference<DocumentData, DocumentData>;
let queryNotesCollectionByCreatedAt: Query;
let notesSnapshotUnsubscribe: Unsubscribe | null = null;

export const useNotesStore = defineStore('notes', {
  state: (): NoteState => ({
    notes: [],
    loading: true,
  }),
  actions: {
    init(uid: string) {
      if (!uid) {
        return;
      }
      notesCollection = collection(db, 'users', uid, 'notes');
      queryNotesCollectionByCreatedAt = query(notesCollection, orderBy('createdAt'));
      this.fetch();
    },
    async fetch() {
      this.loading = true;
      if (notesSnapshotUnsubscribe) {
        notesSnapshotUnsubscribe();
      }

      notesSnapshotUnsubscribe = onSnapshot(queryNotesCollectionByCreatedAt, (querySnapshot) => {
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
