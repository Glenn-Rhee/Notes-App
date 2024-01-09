import CardNotes from "@/components/home/CardNotes";
import SearchNotes from "@/components/home/SearchNotes";
import { getNotesUser } from "@/lib/fetch/user";
import { NotesUser } from "@/types/main";

export default async function Home() {
  const response = await getNotesUser();
  const data: NotesUser[] = response.data;

  return (
    <main className="w-full px-8 py-10">
      <SearchNotes />
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {data.map((note) => (
            <CardNotes
              key={note.id}
              date={note.date}
              title={note.title}
              notes={note.notes}
              id={note.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
