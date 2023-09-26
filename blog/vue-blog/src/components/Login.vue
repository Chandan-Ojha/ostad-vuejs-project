<script setup>
/*function authenticate() {
  localStorage.setItem("token", "123");
}
function logout() {
  localStorage.setItem("token", "abc");
}*/

// import { authStore } from "../store/store";
import { authStore } from "../store/piniastore";
const auth = authStore();
</script>
<template>
  <h1 class="text-2xl mb-3">This is login page</h1>
  <p class="mt-5">
    <button
      @click="auth.authenticated()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <span v-if="auth.isAuthenticated">You're already logged in</span>
      <span v-else>Click to Login</span>
    </button>
    <button
      @click="auth.logout()"
      class="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  </p>
</template>
