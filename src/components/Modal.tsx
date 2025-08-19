import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  editTeacherStore,
  modalStore,
  resetStores,
  teachersStore,
} from "../store";
import type { TeacherType } from "../types";

export default function Modal() {
  // Nanoostores
  const open = useStore(modalStore);
  const teachers = useStore(teachersStore);
  const teacherId = useStore(editTeacherStore);

  const initialState: TeacherType = {
    id: "",
    imageUrl: "https://avatar.iran.liara.run/public/37",
    rating: 0,
    name: "",
    comment: "",
  };

  // Local store
  const [teacher, setTeacher] = useState<TeacherType>(initialState);

  // Effect to handle opening the modal and setting the teacher data
  // when editing an existing teacher
  useEffect(() => {
    if (teacherId) {
      modalStore.set(true);
      const teacherToEdit = teachers.find((t) => t.id === teacherId);
      if (teacherToEdit) {
        setTeacher(teacherToEdit);
      }
    }
  }, [teacherId, teachers]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (teacherId) {
      teachersStore.set(
        teachers.map((t) => (t.id === teacherId ? teacher : t))
      );
    } else {
      teachersStore.set([...teachers, { ...teacher, id: uuidv4() }]);
    }
    resetStores();
  }

  // Function to close the modal and reset the teacher state
  function closeModal() {
    resetStores();
    setTeacher(initialState);
  }

  return (
    <div>
      <Dialog open={open} onClose={closeModal} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
            >
              <form onSubmit={submit} className="flex flex-col gap-y-0.5">
                <div className="rounded-t-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-gray-700 dark:focus-within:outline-indigo-500">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={teacher.name}
                    onChange={(e) =>
                      setTeacher({ ...teacher, name: e.target.value })
                    }
                    className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-gray-700 dark:focus-within:outline-indigo-500">
                  <label
                    htmlFor="image"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-200"
                  >
                    Image Url
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="text"
                    placeholder="https://placehold.co/600x400"
                    value={teacher.imageUrl}
                    onChange={(e) =>
                      setTeacher({ ...teacher, imageUrl: e.target.value })
                    }
                    className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="bg-white rounded-b-md px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-gray-700 dark:focus-within:outline-indigo-500">
                  <label
                    htmlFor="comment"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-200"
                  >
                    Comment
                  </label>
                  <input
                    id="comment"
                    name="comment"
                    type="text"
                    placeholder="Your Comment Here"
                    value={teacher.comment}
                    onChange={(e) =>
                      setTeacher({ ...teacher, comment: e.target.value })
                    }
                    className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
