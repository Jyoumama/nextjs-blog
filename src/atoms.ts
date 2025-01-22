import { atomWithStorage, createJSONStorage } from "jotai/utils";

export enum Filter {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

export const filterAtom = atomWithStorage<Filter>("filter",Filter.All);

export enum SortOrder {
  Ascending = "Ascending",
  Descending = "Descending",
}

export const sortOrderAtom = atomWithStorage<SortOrder>(
  "sortOrder",
  SortOrder.Descending
);

// sessionStorageを使いたい場合（コメントアウトして利用）
/*
const sessionStorageForJotai = createJSONStorage(() => sessionStorage);
export const sortOrderAtom = atomWithStorage<SortOrder>(
  "sortOrder",
  SortOrder.Descending,
  sessionStorageForJotai
);
*/
