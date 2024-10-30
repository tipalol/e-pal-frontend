<template>
  <div class="flex justify-center px-8 mt-48"> <!-- Внешний контейнер с отступами и центрированием -->
    <div class="font-bold space-y-8 max-w-screen-lg"> <!-- Внутренний контейнер для всех элементов -->

      <!-- Заголовок -->
      <div class="ml-2 text-left">
        <h2 class="text-4xl font-bold text-white mb-10">Edit Profile</h2>
      </div>

      <!-- Контейнер для аватара и формы  -->
      <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">

        <!-- Контейнер для аватара -->
        <div class="flex justify-center w-56">
          <div class="flex flex-col items-center">
            <img :src="avatar" alt="User Profile" class="w-49 h-49 rounded-2xl" />
            <button
                class="mt-4 bg-purple-500 text-white py-2 px-3 rounded-full font-bold hover:bg-purple-600 transition"
                @click="showChangeAvatarModal = true">
              Change Avatar[Not working]
            </button>
          </div>
        </div>

        <!-- Контейнер для формы -->
        <div class="flex-grow">
          <form class=" ml-5 space-y-4">
          <div class="flex flex-col">
            <div class="mb-4">
              <p style="color:#ff00ff">Username</p>
              <input
                  v-model="username"
                  type="text"
                  id="username"
                  placeholder="Username"
                  class="w-56  md:w-56 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              />
            </div>
            <div class="mb-4">
              <p style="color:#cf70ff">Gender</p>
              <select
                  v-model="selectedGender"
                  class="w-56  md:w-56 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400">
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
                  class="w-56  md:w-56 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              />
            </div>
          </div>

          <div class="flex flex-col mt-10">
          <!-- Кнопка сохранения профиля -->
            <div>
              <button
                  @click="saveProfile()"
                  type="button"
                  class="w-56 mb-2 bg-purple-500 text-white py-3 rounded-full font-bold text-xl hover:bg-purple-600 transition">
                Save
              </button>
            </div>
            <!-- Кнопка отмены -->

            <div class="flex justify-center">
              <router-link to="/profile">
              <button
                  type="button"
                  class="w-44 bg-red-500 text-white py-3 rounded-full font-bold text-xl hover:bg-red-600 transition">
                Cancel
              </button>
              </router-link>
            </div>

          </div>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        </form>
        </div>
      </div>
    </div>
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