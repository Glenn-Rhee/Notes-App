import { ContainerProps } from "@/types/main";
import SearchNotes from "../home/SearchNotes";

export default function Container(props: ContainerProps) {
  const { children, justify } = props;
  return (
    <>
      <SearchNotes />
      <div className="flex justify-center">
        <div className={`flex flex-wrap gap-4 ${justify} lg:justify-start`}>
          {children}
        </div>
      </div>
    </>
  );
}
