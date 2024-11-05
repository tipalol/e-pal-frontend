<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center space-x-4">
      <router-link to="/"><img src="./assets/logo.png" alt="E-Pal Logo" class="h-8" /></router-link>
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-300 hover:text-white text-[20px] font-menu">Play</a>
        <router-link href="#" class="text-gray-300 hover:text-white font-menu  text-[20px]" to="/">ePals</router-link>
        <router-link href="#" class="text-gray-300 hover:text-white font-menu  text-[20px]" to="/orders">Orders</router-link>
      </nav>
    </div>
    <div v-if="!token.jwt" class="flex items-center space-x-4">
      <router-link class="font-semibold text-gray-300 bg-gray-700 px-4 py-2 rounded-lg" to="/becomeEpal">Become an ePal</router-link>
      <router-link class="font-semibold text-gray-300 hover:text-white" to="/registration">Log in</router-link>
      <router-link class="font-semibold bg-purple-500 text-gray-300 px-4 py-2 rounded-lg" to="/registration">Sign Up</router-link>
    </div>
    <div v-else class="flex items-center space-x-4">
      <router-link class="font-semibold bg-gray-700 text-gray-300 px-4 py-2 rounded-lg" to="/becomeEpal">Become an ePal</router-link>
      <router-link
          :to=getProfileUrl()
      >
        <p class="font-semibold text-gray-300 hover:text-white">@{{profile.username}}</p>
      </router-link>
      <router-link
        :to=getProfileUrl()
      >
        <img :src="profile.avatar" alt="User Avatar" class="w-[24px] h-[24px] rounded-full" />
      </router-link>
      <div class="flex items-center space-x-1">
        <p class="font-semibold text-gray-300 hover:text-white">
          balance:</p>

        <p class="font-semibold text-gray-300 hover:text-white">
          {{profile.balance}}</p>
        <img src="./assets/money1.svg"
             :style="{ width: '30px', height: '30px'}" />
      </div>
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
      username: "",
      balance: 0,
      avatar: ""
    });
    const token = ref({
      jwt: null
    });

    onMounted(async () => {
      if (useAuthStore().isLoggedIn)
      {
        token.value.jwt = useAuthStore().token;

        if (useAuthStore().profile)
        {
          profile.value.username = useAuthStore().profile.username;
          profile.value.avatar = useAuthStore().profile.avatar;
          profile.value.balance = useAuthStore().profile.balance;
        }
        else
        {
          try {
            const headers = { 'Authorization': 'Bearer ' + useAuthStore().token };
            const response = await fetch("http://localhost:5033/api/profile", { headers });
            if (response.ok) {
              const data = await response.json();

              profile.value = data.data;
              useAuthStore().setProfile(profile.value);

              profile.value.username = useAuthStore().profile.username;
              profile.value.avatar = useAuthStore().profile.avatar;
              profile.value.balance = useAuthStore().profile.balance;

              console.log('Got profile: ' + profile.value.id + profile.value.username + profile.value.status + profile.value.languages + profile.value.avatar);
            } else {
              console.error("Failed to fetch profile data");
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        }
      }
    });

    return { profile, token };
  },
  methods: {
    logOut() {
      this.token.jwt = null;
      useAuthStore().clearToken();
      useAuthStore().clearProfile();
      console.log('Logged out')
    },
    getProfileUrl() {
      if (!useAuthStore().isLoggedIn)
      {
        return "/registration";
      }

      return "/profile/" + useAuthStore().profile.username;
    }
  }
}
</script>