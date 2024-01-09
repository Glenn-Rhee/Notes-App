"use client";
import Spinner from "@/icon/Spinner";
import { getDateNote } from "@/lib/controller/date";
import { addNewNote } from "@/lib/firebase/controller";
import { ModalNotes } from "@/types/main";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import ErrorComponent from "../Alert/ErrorComponent";
import SuccessComponent from "../Alert/SuccessComponent";
export default function FormNotes(props: ModalNotes) {
  const { isOpen, onOpenChange } = props;
  const [title, setTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (title === "" || notes === "") {
      setErrorMsg("Please fill in all the fields");
      return;
    }

    setIsLoading(true);
    const data = {
      title,
      notes,
      date: getDateNote(),
    };

    const response = await addNewNote(data);
    if (response.status === "failed") {
      setSuccess("");
      setErrorMsg(response.message);
      setIsLoading(false);
      return;
    }

    setErrorMsg("");
    setIsLoading(false);
    setSuccess(response.message);
    console.log(response.message);
    setTitle("");
    setNotes("");
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <form action="" onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add Notes
              </ModalHeader>
              {errorMsg ? <ErrorComponent message={errorMsg} /> : null}
              {success ? <SuccessComponent message={success} /> : null}
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter your title"
                  variant="bordered"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  label="Notes"
                  placeholder="Your notes here..."
                  className="max-w-full"
                  variant="bordered"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  isLoading={isLoading}
                  spinner={isLoading ? <Spinner /> : null}
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
