import { ref, reactive } from "vue";

const authStore = reactive({
  isAuthenticated: false,
  authenticated() {
    authStore.isAuthenticated = true;
  },
  logout() {
    authStore.isAuthenticated = false;
  },
});

export { authStore };
