import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    me: {},
    isAuth: false,
  }),

  getters: {
    removeToken(state, token) {
      state.token = "";
      LocalStorage.set("auth_token", "");
      state.isAuth = false;
    },
    setToken(state, token) {
      token = state.token;
      state.isAuth = true;
      LocalStorage.set("auth_token", token);
      state.token = LocalStorage.getItem("auth_token");
    },
    updateToken(state, token) {
      state.token = LocalStorage.getItem("auth_token");
    },
    hamid(state, token) {
      alert(state.token);
    },
  },

  actions: {
    signOut() {
      localStorage.removeItem("auth_token");
    },

    setMe(state, me) {
      let value = LocalStorage.getItem("auth_token");
      // value = state.token;
      console.log(value);
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${value}` },
        })
        .then((response) => {
          this.me = response.data.data;
        })
        .catch((error) => console.error(error));
    },
  },
});
export default useAuthStore;
