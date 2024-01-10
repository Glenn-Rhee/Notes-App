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
import { deleteData, firestore } from "@/lib/firebase/controller";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CardNotes(props: NotesUser) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
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

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await deleteData(id || "");
      if (response.status === "failed") {
        await Swal.fire({
          title: "Error",
          text: "Failed to delete note",
          icon: "error",
          confirmButtonText: "Ok",
        });
        router.push("/");
      } else {
        await Swal.fire({
          title: "Success",
          text: "Your note has been deleted",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  }

  return (
    <>
      <Card className="max-w-[400px] w-[300px] mt-8 flex-shrink-0 min-h-[300px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p
              className="text-md cursor-pointer text-ellipsis overflow-hidden inline-block whitespace-nowrap"
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
          <p className="text-ellipsis overflow-hidden inline-block whitespace-nowrap">
            {notes}
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-between w-full gap-2">
            <Button
              className="w-1/2"
              variant="flat"
              color="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button className="w-1/2" variant="solid" color="success">
              Archive
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ViewNotes isOpen={isOpen} onOpenChange={onOpenChange} data={note} />
    </>
  );
}
