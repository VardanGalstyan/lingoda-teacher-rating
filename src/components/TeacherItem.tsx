import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { editTeacherStore, teachersStore } from "../store";
import type { TeacherType } from "../types";

type Props = {
  teacher: TeacherType;
};

const TeacherItem = (props: Props) => {
  const {
    teacher: { name, imageUrl, comment, rating, id },
  } = props;

  function rateTeacher(rating: number, name: string) {
    teachersStore.set(
      teachersStore
        .get()
        .map((teacher) =>
          teacher.name === name ? { ...teacher, rating } : teacher
        )
    );
  }

  function removeTeacher() {
    teachersStore.set(
      teachersStore
        .get()
        .filter((teacher) => teacher.name !== props.teacher.name)
    );
  }

  function updateTeacher() {
    editTeacherStore.set(id);
  }

  return (
    <li
      key={name}
      className="relative flex group justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8 dark:hover:bg-white/2.5"
    >
      <div className="flex min-w-0 gap-x-4 items-center">
        <img
          alt="teachers avatar"
          src={imageUrl}
          className="size-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            {name}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-sm">{comment}</p>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <ReactRating
          style={{ maxWidth: 200 }}
          value={rating}
          items={10}
          onChange={(e: number) => rateTeacher(e, name)}
        />
      </div>
      <div className="absolute group-hover:flex gap-2 top-2 right-2 hidden justify-center items-center">
        <PencilSquareIcon
          className="size-4 cursor-pointer"
          onClick={updateTeacher}
        />
        <UserMinusIcon
          className="size-4 cursor-pointer"
          onClick={removeTeacher}
        />
      </div>
    </li>
  );
};
export default TeacherItem;
