import { useStore } from "@nanostores/react";
import { teachersStore } from "../store";
import TeacherItem from "./TeacherItem";

export default function StackedList() {
  const teachers = useStore(teachersStore);

  return (
    <div className="w-full">
      <ul
        role="list"
        className="divide-y divide-gray-100 dark:divide-white/5 flex flex-col justify-between"
      >
        <div className="relative flex-grow min-h-72">
          {teachers.map((teacher) => (
            <div key={teacher.id}>
              <TeacherItem teacher={teacher} />
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
