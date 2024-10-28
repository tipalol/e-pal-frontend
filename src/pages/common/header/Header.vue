<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center space-x-4">
      <img src="./assets/logo.png" alt="E-Pal Logo" class="h-8" />
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-300 hover:text-white">Play</a>
        <router-link href="#" class="text-gray-300 hover:text-white" to="/">ePals</router-link>
        <a href="#" class="text-gray-300 hover:text-white">Community</a>
        <a href="#" class="text-gray-300 hover:text-white">App</a>
      </nav>
    </div>
    <div v-if="!token || !token.jwt" class="flex items-center space-x-4">
      <router-link class="font-semibold text-gray-300 bg-gray-700 px-4 py-2 rounded-lg" to="/becomeEpal">Become an ePal</router-link>
      <router-link class="font-semibold text-gray-300 hover:text-white" to="/registration">Log in</router-link>
      <router-link class="font-semibold bg-purple-500 text-gray-300 px-4 py-2 rounded-lg" to="/registration">Sign Up</router-link>
    </div>
    <div v-else class="flex items-center space-x-4">
      <router-link class="font-semibold bg-gray-700 text-gray-300 px-4 py-2 rounded-lg" to="/becomeEpal">Become an ePal</router-link>
      <router-link to="/profile">
      <p class="font-semibold text-gray-300 hover:text-white">@{{profile.username}}</p>
      </router-link>
      <router-link to="/profile">
        <img :src="profile.avatar" alt="User Avatar" class="w-[24px] h-[24px] rounded-full" />
      </router-link>
      <button @click="logOut" class="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg">Log out</button>
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
      username: "tipalol",
      avatar: ""
    });
    const token = ref({
      jwt: "None"
    });

    onMounted(async () => {
      token.value.jwt = useAuthStore().token;
      console.log('Token: ' + token.value.jwt)

      if (useAuthStore().profile)
      {
        profile.value.username = useAuthStore().profile.username;
        profile.value.avatar = useAuthStore().profile.avatar;
      }
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