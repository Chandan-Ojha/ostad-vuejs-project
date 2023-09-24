<script setup>
// function authenticate() {
//   localStorage.setItem("token", "123");
// }
// function logout() {
//   localStorage.setItem("token", "abc");
// }
import { authStore } from "../store/store";
</script>
<template>
  <h1 class="text-2xl mb-3">This is login page</h1>
  <p class="mt-5">
    <button
      @click="authStore.authenticated()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Authenticate
    </button>
    <button
      @click="authStore.logout()"
      class="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  </p>
</template>
