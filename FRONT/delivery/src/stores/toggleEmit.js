import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggle", {
  state: () => ({
    toogle: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
