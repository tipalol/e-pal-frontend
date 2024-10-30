<template>
  <form class="font-bold space-y-8 max-w-screen-lg ml-auto mr-auto mt-48">
    <div class="text-left">
      <h2 class="text-4xl font-bold text-white mb-10 ml-8">Edit Profile</h2>
    </div>
    <div class="flex">
      <div class="w-1/4 mr-8 mt-2">  <!-- Контейнер для аватара -->
        <div class="flex flex-col items-center">
          <img :src="avatar" alt="User Profile" class="w-49 h-49 rounded-2xl mb-4"  v-if="avatar" />
          <div v-else class="rounded-full w-48 h-48 bg-gray-700 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.24 11.334 2.46 9.5 1.328 6.95c-.59-.663-.96-1.27-.793-2.018.167-.744.54-1.383.943-1.985.415-.62.93-.99 1.554-1.077A6.987 6.987 0 0 0 8 1z"/>
            </svg>
          </div>
          <button
              class="mt-4 bg-purple-500 text-white py-2 px-3 rounded-full font-bold hover:bg-purple-600 transition"
              @click="showChangeAvatarModal = true">
            Change Avatar[Not working]
          </button>
        </div>
      </div>
      <div class="w-3/4">  <!-- Контейнер для формы -->
        <div class="flex flex-col">
          <div class="mb-4">
            <p style="color:#ff00ff">Username</p>
            <input
                v-model="username"
                type="text"
                id="username"
                placeholder="Username"
                class="w-56 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
          </div>
          <div class="mb-4">
            <p style="color:#cf70ff">Gender</p>
            <select
                v-model="selectedGender"
                class="w-56 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400">
              <option value=null></option>
              <option style="color:#ff00cc" value="Woman">Woman</option>
              <option style="color:#2968ff" value="Man">Man</option>
            </select>
          </div>
          <div>
            <p style="color:#8684ff">Languages</p>
            <input
                v-model="languages"
                type="text"
                id="Language"
                placeholder="Languages"
                class="w-56 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
          </div>

        </div>



        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </div>

    </div>
  </form>
  <div class="flex justify-center w-2/4 mt-40 ml-8 ">
    <button
        @click="saveProfile()"
        type="button"
        class="w-44
               bg-purple-500
               text-white
               py-3
               rounded-full
               font-bold
               text-xl
               hover:bg-purple-600
               transition"
    >
      Save
    </button>
  </div>
</template>



<script>
import {useAuthStore} from "../../../stores/auth.js";
import axios from "axios";

export default {
  name: "ProfileSettings",
  data() {
    return {
      username: useAuthStore().profile.username,
      selectedGender: useAuthStore().profile.gender,
      languages: useAuthStore().profile.languages,
      avatar: useAuthStore().profile.avatar,
      error: ""
    }
  },
  methods: {
    async saveProfile() {
      const token = useAuthStore().token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post("http://localhost:5033/api/profile", {
        username: this.username,
        gender: this.selectedGender,
        languages: this.languages,
      }, config);

      if (response.data)
      {
        console.log("Edit profile successful:", response.data);
        this.$router.push("/profile");
      }
      else {
        this.error = "Edit profile failed. Please try again.";
        console.error("Error during edit profile:", response.data);
      }
    }
  }
}
</script>