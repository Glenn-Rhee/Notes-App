export interface NotesUser {
  id?: string;
  title?: string;
  notes?: string;
  date?: string;
}

export interface ModalNotes {
  isOpen: boolean;
  onOpenChange: () => void;
  data?: NotesUser;
}
