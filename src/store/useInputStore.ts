// src/store/useInputStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type InputStore = {
  // Current input
  inputValue: string;
  setInputValue: (value: string) => void;

  // Streaming state
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;

  // UI state
  showMoreVibes: boolean;
  toggleShowMoreVibes: () => void;
};

const useInputStore = create<InputStore>()(
  persist(
    (set) => ({
      // Current input
      inputValue: "",
      setInputValue: (value) => set({ inputValue: value }),

      // Streaming state
      isStreaming: false,
      setIsStreaming: (value) => set({ isStreaming: value }),

      // UI state
      showMoreVibes: false,
      toggleShowMoreVibes: () =>
        set((state) => ({ showMoreVibes: !state.showMoreVibes })),
    }),
    {
      name: "vibesearching-input-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useInputStore;
