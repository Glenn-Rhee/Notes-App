import { Input } from "@nextui-org/react";

export default function SearchNotes() {
  return (
    <div className="mx-auto full md:w-3/4">
      <form>
        <Input size={"sm"} type="search" label="Search" />
      </form>
    </div>
  );
}
