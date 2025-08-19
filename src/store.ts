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
export const searchStore = atom<string>("");
export const sortStore = atom<"best" | "worst">("best");
export const filterStore = atom<number[]>([0]);

export const resetStores = () => {
  modalStore.set(false);
  editTeacherStore.set("");
};
