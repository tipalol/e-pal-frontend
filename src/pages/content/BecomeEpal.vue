<template>
  <Header />

  <div class="bg-purple-700 text-white text-center py-10">
    <!-- Header Section -->
    <h1 class="text-4xl font-bold">BECOME AN EPAL NOW!</h1>
    <p class="text-lg mt-2">High income · Flexible · Make Friends</p>
    <button @click="becomeEpal" class="bg-black text-white font-semibold py-2 px-4 mt-6 rounded">Apply For Free</button>
  </div>

  <!-- Info Section -->
  <div class="bg-gray-900 text-white py-16">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10 px-4">
      <img src="https://g.epal.gg/entry/us/static/whatsEpal.df68a307.png" alt="ePal avatar" class="w-[352px] h-[228px] rounded-full">
      <div class="text-center md:text-left">
        <h2 class="text-3xl font-bold">What's an ePal?</h2>
        <p class="mt-4 text-lg">ePals are freelancers who provide gaming or social interaction services.</p>
      </div>
    </div>
  </div>

  <!-- Benefits Section -->
  <div class="bg-gray-800 text-white py-16">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 text-center">
      <!-- High Income -->
      <div class="flex flex-col items-center space-y-4">
        <img src="https://g.epal.gg/entry/us/static/pic_1.084689d8.png" alt="High Income Icon" class="w-[352px] h-[128px]">
        <h3 class="text-2xl font-semibold">High income</h3>
        <p>Earn more than 5,000 USD per month while enjoying what you do.</p>
      </div>

      <!-- Flexible -->
      <div class="flex flex-col items-center space-y-4">
        <img src="https://g.epal.gg/entry/us/static/pic_4.28bff725.png" alt="Flexible Icon" class="w-[352px] h-[128px]">
        <h3 class="text-2xl font-semibold">Flexible</h3>
        <p>Anytime, Anywhere.</p>
      </div>

      <!-- Make Friends -->
      <div class="flex flex-col items-center space-y-4">
        <img src="https://g.epal.gg/entry/us/static/pic_3.cc8f3792.png" alt="Make Friends Icon" class="w-[352px] h-[128px]">
        <h3 class="text-2xl font-semibold">Make Friends</h3>
        <p>Meet gamers from all over the world.</p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-8 rounded-lg text-center max-w-sm w-full">
      <h2 class="text-3xl font-bold text-green-600">Congratulations!</h2>
      <p class="mt-4 text-xl">You are now an ePal!</p>
      <button @click="closeModal" class="mt-6 bg-black text-white py-2 px-6 rounded">Close</button>
    </div>
  </div>
</template>

<script>
import Header from "../common/header/Header.vue";
import axios from "axios";
import {useAuthStore} from "../../stores/auth.js";

export default {
  name: "BecomeEpal",
  components: {Header},

  data() {
    return {
      isModalVisible: false, // Modal visibility state
    };
  },

  methods: {
    async becomeEpal() {

      try {
        const headers = { 'Authorization': 'Bearer ' + useAuthStore().token };
        const response = await axios.patch("http://localhost:5033/api/profile", null,{headers});
        if (response.status === 200) {
          this.isModalVisible = true; // Show modal if response is OK
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },

    closeModal() {
      this.isModalVisible = false; // Hide modal when button is clicked
    },
  },
};
</script>

<style scoped>
/* Modal styling */
.fixed {
  position: fixed;
}

.bg-gray-800 {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: white;
}

.max-w-sm {
  max-width: 400px;
}

.z-50 {
  z-index: 50;
}
</style>
