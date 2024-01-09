import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "./init";
import { NotesUser } from "@/types/main";

export const firestore = getFirestore(app);

// User notes collection
export const userNotesCollections = collection(firestore, "user-notes");

// Add new document
export async function addNewNote(data: NotesUser) {
  try {
    const newNote = await addDoc(userNotesCollections, { ...data });
    return {
      status: "success",
      message: "Berhasil menambahkan data baru",
      data: newNote,
    };
  } catch (error) {
    return {
      status: "failed",
      message: "Internal server error",
      data: null,
    };
  }
}
