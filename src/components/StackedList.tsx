import { useStore } from "@nanostores/react";
import { Rating } from "@smastrom/react-rating";
import {
  editTeacherStore,
  filterStore,
  modalStore,
  searchStore,
  sortStore,
  teachersStore,
} from "../store";
import Filters from "./Filters";

export default function StackedList() {
  const teachers = useStore(teachersStore);
  const search = useStore(searchStore);
  const sort = useStore(sortStore);
  const ratingfilter = useStore(filterStore);

  const filteredTeachers = teachers
    .filter((teacher) => {
      if (ratingfilter.length === 0 || ratingfilter.includes(0)) {
        return true;
      }
      return ratingfilter.includes(teacher.rating);
    })
    .filter((teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "best") {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

  function rateTeacher(rating: number, name: string) {
    teachersStore.set(
      teachersStore
        .get()
        .map((teacher) =>
          teacher.name === name ? { ...teacher, rating } : teacher
        )
    );
  }

  function removeTeacher(id: string) {
    teachersStore.set(
      teachersStore.get().filter((teacher) => teacher.id !== id)
    );
  }

  function updateTeacher(id: string) {
    editTeacherStore.set(id);
  }

  return (
    <div className="w-full bg-gray-900">
      <div className=" py-2 align-middle sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Filters />
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => modalStore.set(true)}
              type="button"
              className="block rounded-md border-[1px] border-white/20 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Add Teacher
            </button>
          </div>
        </div>
      </div>
      <div className="flow-root">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Comment
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Rating
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-900">
                {filteredTeachers.map((person) => (
                  <tr key={person.id}>
                    <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0 min-w-40">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt="teacher avatar"
                            src={person.imageUrl}
                            className="size-11 rounded-full dark:outline dark:outline-white/10"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {person.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-5 text-sm text-gray-500 dark:text-gray-400">
                      <div className="text-gray-900 dark:text-white">
                        {person.comment}
                      </div>
                    </td>

                    <td className="px-3 py-5 text-sm whitespace-nowrap min-w-32  text-gray-500 dark:text-gray-400">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={person.rating}
                        items={5}
                        onChange={(e: number) => rateTeacher(e, person.name)}
                      />
                    </td>
                    <td className="py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                      <span
                        onClick={() => updateTeacher(person.id)}
                        className="text-white cursor-pointer hover:text-lime-400"
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </span>
                    </td>
                    <td className="py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                      <span
                        onClick={() => removeTeacher(person.id)}
                        className="text-white cursor-pointer hover:text-lime-400"
                      >
                        Delete
                        <span className="sr-only">, {person.name}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
