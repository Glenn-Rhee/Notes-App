import {  NotesUser } from "@/types/main";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

export default function CardNotes(props: NotesUser) {
  const { date, id, title, notes } = props;
  return (
    <Card className="max-w-[400px] mt-8">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
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
          <Button className="w-1/2" variant="solid" color="danger">
            Delete
          </Button>
          <Button className="w-1/2" variant="solid" color="success">
            Archive
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
