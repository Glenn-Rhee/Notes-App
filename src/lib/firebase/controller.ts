import { collection, getFirestore } from "firebase/firestore";
import { app } from "./init";

export const firestore = getFirestore(app);

// User notes collection 
export const userNotesCollections = collection(firestore, "user-notes")