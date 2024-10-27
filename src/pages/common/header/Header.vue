<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center space-x-4">
      <img src="./assets/logo.png" alt="E-Pal Logo" class="h-8" />
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-300 hover:text-white">Play</a>
        <a href="#" class="text-gray-300 hover:text-white">ePals</a>
        <a href="#" class="text-gray-300 hover:text-white">Community</a>
        <a href="#" class="text-gray-300 hover:text-white">App</a>
      </nav>
    </div>
    <div v-if="!token" class="flex items-center space-x-4">
      <button class="bg-gray-700 px-4 py-2 rounded-lg">Become an ePal</button>
      <router-link class="text-gray-300 hover:text-white" to="/registration">Log in</router-link>
      <router-link class="bg-purple-500 px-4 py-2 rounded-lg" to="/registration">Sign Up</router-link>
    </div>
    <div v-else class="flex items-center space-x-4">
      <button class="bg-gray-700 px-4 py-2 rounded-lg">Become an ePal</button>
      <router-link class="text-gray-300 hover:text-white" to="/profile">Profile</router-link>
      <button @click="logOut" class="bg-purple-500 px-4 py-2 rounded-lg">Log out</button>
    </div>
  </header>
</template>

<script>
import {useAuthStore} from "../../../stores/auth.js";
import {onMounted, ref} from "vue";

export default {
  name: "Header",
  setup() {
    const profile = ref({
      username: "tipalol"
    });
    const token = ref({
      jwt: "None"
    });

    onMounted(async () => {
      token.value.jwt = useAuthStore().token;
      console.log('Token: ' + token.value.jwt)
    });

    return { profile, token };
  },
  methods: {
    logOut() {
      this.token.jwt = null;
      this.token = null;
      useAuthStore().clearToken();
      useAuthStore().clearProfile();
      console.log('Logged out')
    }
  }
}
</script>