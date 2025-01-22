import { atom } from "jotai";

export enum Filter {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

export const filterAtom = atom<Filter>(Filter.All);

export enum SortOrder {
  Ascending = "Ascending",
  Descending = "Descending",
}

export const sortOrderAtom = atom<SortOrder>(SortOrder.Descending);
