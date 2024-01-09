import { ModalNotes } from "@/types/main";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function ViewNotes(props: ModalNotes) {
  const { isOpen, onOpenChange, data } = props;

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input className="text-medium bg-transparent" size="sm" value={data?.title} />
                <p className="text-small text-default-500">{data?.date}</p>
              </ModalHeader>
              <ModalBody>
                <Textarea value={data?.notes} size="sm"/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
