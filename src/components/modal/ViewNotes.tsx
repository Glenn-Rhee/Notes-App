import { firestore } from "@/lib/firebase/controller";
import { ModalNotes } from "@/types/main";
import { doc, getDoc } from "@firebase/firestore";
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
import { useEffect, useState } from "react";

export default function ViewNotes(props: ModalNotes) {
  const { isOpen, onOpenChange, data, id } = props;
  // const [dataS, setDatas] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const getNote = doc(firestore, `user-notes/${id}`);
  //     const docSnap = await getDoc(getNote);
  //     const data = {
  //       id: docSnap.id,
  //       ...docSnap.data(),
  //     };
  //     setDatas(data);
  //   };

  //   fetchData();
  // }, [id]);

  // console.log(dataS);

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
                <Input
                  className="text-medium bg-transparent"
                  size="sm"
                  value={data?.title}
                />
                <p className="text-small text-default-500">{data?.date}</p>
              </ModalHeader>
              <ModalBody>
                <Textarea value={data?.notes} size="sm" />
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
