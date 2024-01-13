import React from "react";

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
  id?: string;
}

export interface FeedbackProps {
  message: string;
}

export interface ContainerProps {
  children: React.ReactNode;
  justify: string;
}

export interface CardNotesProps {
  typeBtn: string;
}

export interface NotesPageProps {
  params: {
    id: string
  }
}