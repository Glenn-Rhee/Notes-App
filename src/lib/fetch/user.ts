import { getDocs } from "firebase/firestore";
import { userNotesCollections } from "../firebase/controller";
import { NotesUser } from "@/types/main";

export async function getNotesUser() {
  try {
    const snapshot = await getDocs(userNotesCollections);
    const dataUser = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      status: "success",
      message: "Berhasil mendapatkan data",
      data: dataUser,
    };
  } catch (error) {
    return {
      status: "failed",
      message: error || "Internal server error!",
      data: [],
    };
  }
}
