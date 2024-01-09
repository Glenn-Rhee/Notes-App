"use client";
import { ModalNotes } from "@/types/main";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
export default function FormNotes(props: ModalNotes) {
  const { isOpen, onOpenChange } = props;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Notes</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Title"
                placeholder="Enter your title"
                variant="bordered"
                type="text"
              />
              <Textarea
                label="Notes"
                placeholder="Your notes here..."
                className="max-w-full"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
