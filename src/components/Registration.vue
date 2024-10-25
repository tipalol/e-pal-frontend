<template>
  <header class="w-full p-4 flex justify-between items-center fixed">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="../assets/google.png" alt="Logo" class="w-10 h-10">
      <h1 class="text-white text-2xl font-bold ml-2">E-PAL</h1>
    </div>
    <!-- Right-side buttons -->
    <div class="flex items-center space-x-4">
      <button class="text-white font-bold hover:text-purple-300 transition">Contact Us</button>
      <button class="text-white font-bold hover:text-purple-300 transition">
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
        <img src="../assets/google.png" alt="Hero Image" class="mx-auto w-80">
        <h1 class="text-4xl font-bold text-white mt-4">NEVER BATTLE ALONE</h1>
      </div>
    </div>

    <!-- Right Side: Registration Form -->
    <div class="flex-1  flex justify-center items-center">
      <div class="p-8 w-6/12">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Log in or sign up</h2>

        <!-- Input Form -->
        <form @submit.prevent="submitForm" class="space-y-4 w-full">
          <div>
            <label for="email" class="sr-only">Phone or Email</label>
            <input
                v-model="email"
                type="text"
                id="email"
                placeholder="Enter Phone or Email"
                class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
          </div>

          <button
              type="submit"
              class="w-1/3 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition"
          >
            Next
          </button>
        </form>

        <!-- Social Logins -->
        <div class="mt-6">
          <p class="text-gray-400 text-center mb-4">or continue with</p>
          <div class="flex justify-between space-x-4">
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/google.png" alt="Google" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/google.png" alt="Discord" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/google.png" alt="Twitch" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/google.png" alt="Facebook" class="w-6 h-6">
            </button>
            <button class="flex-1 bg-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img src="../assets/google.png" alt="Apple" class="w-6 h-6">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      alert(`Submitted: ${this.email}`);
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
