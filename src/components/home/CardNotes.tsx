"use client";
import { NotesUser } from "@/types/main";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import ViewNotes from "../modal/ViewNotes";
import { firestore } from "@/lib/firebase/controller";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function CardNotes(props: NotesUser) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { date, id, title, notes } = props;
  const getNote = doc(firestore, `user-notes/${id}`);
  const [note, setNote] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(getNote);
      if (docSnap.exists()) {
        const data = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        setNote(data);
      }
    };
    fetchData();
  }, [getNote]);

  return (
    <>
      <Card className="max-w-[400px] mt-8">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p
              className="text-md cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              {title}
            </p>
            <p className="text-small text-default-500">{date}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{notes}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-between w-full gap-2">
            <Button className="w-1/2" variant="flat" color="danger">
              Delete
            </Button>
            <Button className="w-1/2" variant="solid" color="success">
              Archive
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ViewNotes isOpen={isOpen} onOpenChange={onOpenChange} data={note}/>
    </>
  );
}
