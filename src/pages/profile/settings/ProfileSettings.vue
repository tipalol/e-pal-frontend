<template>
  <form class="space-y-8 max-w-screen-lg ml-auto mr-auto mt-48">
    <div>
      <h2 class="text-3xl font-bold text-white mb-20">Edit Profile</h2>
      <input
          v-model="username"
          type="text"
          id="username"
          placeholder="Username"
          class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
      />
      <select
          v-model="selectedGender"
          class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400 mt-2"
      >
        <option value=null></option>
        <option value="Woman">Woman</option>
        <option value="Man">Man</option>
      </select>
    </div>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    <div class="flex justify-end">
      <button
          @click="saveProfile()"
          type="button"
          class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-3"
      >
        Save
      </button>
    </div>
  </form>
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