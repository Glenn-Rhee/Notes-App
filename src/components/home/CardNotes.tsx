"use client";
import { CardNotesProps, NotesUser } from "@/types/main";
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
import {
  addNewArchive,
  deleteData,
  firestore,
} from "@/lib/firebase/controller";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Spinner from "@/icon/Spinner";
import Link from "next/link";

export default function CardNotes(props: NotesUser & CardNotesProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { date, id, title, notes, typeBtn } = props;
  const getNote = doc(firestore, `user-notes/${id}`);
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  async function handleArchive() {
    const data = {
      id,
      title,
      date,
      notes,
    };

    const newArchive = await addNewArchive(data);
    if (newArchive.status === "failed") {
      setIsLoading(false);
      alert("Failed to archive note");
      return;
    }
    await Swal.fire({
      title: "Success",
      text: "Your note has been arvhived",
      icon: "success",
      confirmButtonText: "Ok",
    });

    setIsLoading(false);
  }

  function handleUnArchive() {}

  return (
    <>
      <Card className="max-w-[400px] w-[300px] mt-8 flex-shrink-0 min-h-[300px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <Link
              className="text-md cursor-pointer text-ellipsis overflow-hidden inline-block whitespace-nowrap"
              href={`/notes/${id}`}
            >
              {title}
            </Link>
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
            <Button
              className="w-1/2"
              variant="solid"
              color="success"
              onClick={() => {
                setIsLoading(true);
                typeBtn === "Archive" ? handleArchive() : handleUnArchive();
              }}
              isLoading={isLoading}
              disabled={isLoading}
              spinner={isLoading ? <Spinner /> : null}
            >
              {typeBtn}
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ViewNotes
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        data={note}
        id={id}
      />
    </>
  );
}
