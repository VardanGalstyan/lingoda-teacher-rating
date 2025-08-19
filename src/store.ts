import { persistentAtom } from "@nanostores/persistent";
import type { TeacherType } from "./types";
import { atom } from "nanostores";

export const teachersStore = persistentAtom<TeacherType[]>(
  "lingoda-teachers",
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const modalStore = atom<boolean>(false);
export const editTeacherStore = atom<string>("");

export const resetStores = () => {
  modalStore.set(false);
  editTeacherStore.set("");
};
