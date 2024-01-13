"use client";
import ErrorComponent from "@/components/Alert/ErrorComponent";
import SuccessComponent from "@/components/Alert/SuccessComponent";
import { getDateNote } from "@/lib/controller/date";
import { firestore, updateData } from "@/lib/firebase/controller";
import { NotesPageProps, NotesUser } from "@/types/main";
import { doc, getDoc } from "@firebase/firestore";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Notes(props: NotesPageProps) {
  const { params } = props;
  const [data, setData] = useState<NotesUser>({});
  const [msgError, setMsgError] = useState<string>("");
  const [msgSuccess, setMsgSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = params.id;
  const router = useRouter();
  if (Object.keys(data).length === 0) {
    const getNote = doc(firestore, `user-notes/${id}`);
    getDoc(getNote).then((docSnap) => {
      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      setData(data);
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true)
    const newData = {
      title: data.title,
      notes: data.notes,
      date: getDateNote(),
    };

    const response = await updateData(newData, id);
    if (response.status === "failed") {
      setIsLoading(false)
      setMsgSuccess("");
      setMsgError(response.message);
      return;
    }
    setIsLoading(false)
    setMsgError("");
    setMsgSuccess(response.message);
    router.push("/");
    setData({})
  }

  return (
    <>
      <main className="w-full px-8 py-10 flex justify-center">
        {Object.keys(data).length === 0 ? (
          <Spinner color="secondary" />
        ) : (
          <form action="" onSubmit={handleSubmit}>
            <div className="my-4">
              {msgError !== "" ? (
                <ErrorComponent message="Data not found" />
              ) : null}
              {msgSuccess !== "" ? (
                <SuccessComponent message="Data Already Updated" />
              ) : null}
            </div>
            <div className="flex flex-col gap-3">
              <Input
                label="Title"
                size="md"
                value={data?.title}
                className="w-[600px]"
                onChange={(e) => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
              />
              <Textarea
                label="Notes"
                size="md"
                value={data?.notes}
                onChange={(e) => {
                  setData({
                    ...data,
                    notes: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full mt-4 flex">
              <Button
                className="w-full text-lg font-semibold "
                color="secondary"
                onSubmit={handleSubmit}
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                spinner={<Spinner color="default" />}
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}
