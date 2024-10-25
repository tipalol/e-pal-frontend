<template>
  <header class="w-full p-7 flex justify-between items-center fixed z-50">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="../assets/mascot%20copy.png" alt="Logo" class="w-10 h-10">
      <h1 class="text-white text-2xl font-bold ml-2">E-PAL</h1>
    </div>
    <!-- Right-side buttons -->
    <div class="flex items-center space-x-4">
      <button class="bg-purple-500 text-white py-1 px-3 rounded-full  hover:bg-purple-600 transition text-sm">Contact Us</button>
      <button class="bg-gray-700 rounded-full text-white font-bold hover:text-purple-300 transition p-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </header>
  <div class="flex h-screen">
    <!-- Left Side: Hero Section -->
    <div class="flex-1 bg-purple-600 flex flex-col justify-center items-center relative">
      <div class="text-center">
<!--          <img src="../assets/mascot.webp" alt="Hero Image" class="mx-auto w-80">-->
          <img src="../assets/mascot1.svg" alt="Hero Image" class="mx-auto w-80">
        <h1 class="text-6xl font-bold text-white mt-4 font-display">NEVER BATTLE ALONE</h1>
      </div>
    </div>

    <!-- Right Side: Registration Form -->
    <div class="flex-1 flex justify-center items-center mb-[10%]">
      <div class="min-w-[418px] max-w-[544px] w-[544px]">
        <h2 class="text-4xl font-bold text-white mb-20 text-left">Log in or sign up</h2>

        <!-- Input Form -->
        <form @submit.prevent="submitForm" class="space-y-8 w-full">
          <div v-if="!showPasswordFields">
            <label for="email" class="sr-only">Phone or Email</label>
            <input
                v-model="email"
                type="text"
                id="email"
                placeholder="Enter Phone or Email"
                class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
          </div>
          <div v-if="showPasswordFields" class="space-y-6">
            <!-- Password Field -->
            <label for="password" class="sr-only">Password</label>
            <input
                v-model="password"
                type="password"
                id="password"
                placeholder="Password"
                class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />

            <!-- Confirm Password Field -->
            <label for="confirmPassword" class="sr-only">Confirm Password</label>
            <input
                v-model="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
          </div>

          <div class="flex justify-end">
            <button
                v-if="!showPasswordFields"
                type="submit"
                @click="showPasswordFields = true"
                class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition"
            >
              Next
            </button>
            <button
                v-if="showPasswordFields"
                type="submit"
                @click="handleNext()"
                class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition"
            >
              Submit
            </button>
          </div>
        </form>

        <!-- Social Logins -->
        <div class="mt-6">
          <p class="text-gray-400 text-center mb-4">or continue with</p>
          <div class="flex justify-between space-x-4">
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/icons8-google.svg" alt="Google" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/Discord.svg" alt="Discord" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/Twitch.svg" alt="Twitch" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/Telegram.svg" alt="Telegram" class="w-10 h-10">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      showPasswordFields: false,
    };
  },
  methods: {
    async handleNext() {
      if (this.showPasswordFields) {
        // Handle form submission logic here
        //alert(`Email: ${this.email}, Password: ${this.password}, Confirm Password: ${this.confirmPassword}`);

        try {
          const response = await axios.post("http://localhost:5033/api/register", {
            "email": this.email,
            "password": this.password,
          });
          console.log("Registration successful:", response.data);
          // Handle successful registration (e.g., redirect or show a success message)
        } catch (error) {
          console.error("Error during registration:", error);
          // Handle registration error (e.g., show an error message)
        }
      } else {
        this.showPasswordFields = true;
      }
    },
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>
