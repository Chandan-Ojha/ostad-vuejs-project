import { ref, reactive } from "vue";
import { defineStore } from "pinia";

const authStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  const authenticated = () => {
    isAuthenticated.value = true;
  };

  const logout = () => {
    isAuthenticated.value = false;
  };

  return { isAuthenticated, authenticated, logout };
});

export { authStore };
