import Container from "@/components/card/Container";
import CardNotes from "@/components/home/CardNotes";
import { getArchiveNotes } from "@/lib/fetch/user";
import { NotesUser } from "@/types/main";

export default async function Archive() {
  const response = await getArchiveNotes();
  const data: NotesUser[] = response.data;

  return (
    <main className="w-full px-8 py-10">
      <Container justify={data.length < 3 ? "justify-start" : "justify-center"}>
        {data.map((note) => (
          <CardNotes
            typeBtn="Unarchive"
            key={note.id}
            date={note.date}
            title={note.title}
            notes={note.notes}
            id={note.id}
          />
        ))}
      </Container>
    </main>
  );
}
