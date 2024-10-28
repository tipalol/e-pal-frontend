<template>
  <form class="space-y-8 max-w-screen-lg h-screen ml-auto mr-auto mt-48">
    <div>
      <h2 class="text-3xl font-bold text-white mb-20">Choose your username</h2>
      <input
          v-model="username"
          type="text"
          id="username"
          placeholder="Username"
          class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
      />
    </div>
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    <div class="flex justify-end">
      <button
          @click="saveProfile()"
          type="button"
          class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-3"
      >
        Let's go
      </button>
    </div>
  </form>
</template>

<script>
import {useAuthStore} from "../../../stores/auth.js";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: "CreateUsername",
  data() {
    return {
      username: "",
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
      }, config);

      if (response.data)
      {
        console.log("Edit profile successful:", response.data);
        this.$emit('username-chosen');
      }
      else {
        this.error = "Edit profile failed. Please try again.";
        console.error("Error during edit profile:", response.data);
      }
    }
  }
}
</script>