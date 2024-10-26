
<template>
  <header class="w-full p-7 flex justify-between items-center fixed z-50 bg-transparent">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="../assets/mascot%20copy.png" alt="Logo" class="w-10 h-10">
      <h1 class="text-white text-2xl font-bold ml-2">E-PAL</h1>
    </div>
    <!-- Right-side buttons -->
    <div class="flex items-center space-x-4">
      <button class="bg-purple-500 text-white py-1 px-3 rounded-full hover:bg-purple-600 transition text-sm">Contact Us</button>
      <button @click="closeForm" class="bg-gray-700 rounded-full text-white font-bold hover:text-purple-300 transition p-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </header>

  <div class="flex h-screen" v-if="!registrationSuccessful">
    <!-- Left Side: Hero Section -->
    <section class="flex-1 bg-purple-600 flex flex-col justify-center items-center">
      <div class="text-center">
        <img src="../assets/mascot1.svg" alt="Hero Image" class="mx-auto w-80">
        <h1 class="text-6xl font-bold text-white mt-4">NEVER BATTLE ALONE</h1>
      </div>
    </section>

    <!-- Right Side: Registration Form -->
    <section class="flex-1 flex justify-center items-center mb-10">
      <div class="min-w-[418px] max-w-[544px] w-[544px]">
        <h2 class="text-4xl font-bold text-white mb-20">Log in or sign up</h2>

        <!-- Input Form -->
        <form @submit.prevent="showPasswordFields ? handleNext() : verifyCode()" class="space-y-8 w-full">
          <div v-if="!showVerificationPage">
            <div v-if="!showPasswordFields">
              <input
                  v-model="email"
                  type="text"
                  id="email"
                  placeholder="Enter Phone or Email"
                  class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              />
              <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
            </div>
            <div v-if="showPasswordFields" class="space-y-6">
              <input
                  v-model="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              />
              <input
                  v-model="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              />
              <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
            </div>

            <div class="flex justify-end">
              <button
                  v-if="!showPasswordFields"
                  @click="validateEmail"
                  type="button"
                  class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-5"
              >
                Next
              </button>
              <button
                  v-if="showPasswordFields"
                  type="submit"
                  class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-5"
              >
                Submit
              </button>
            </div>
          </div>
          <!-- Verification Page -->
          <div v-if="showVerificationPage">
            <input
                v-model="verificationCode"
                type="text"
                maxlength="6"
                id="verificationCode"
                placeholder="Enter Verification Code"
                class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
            <div class="flex justify-end mt-6">
              <button
                  type="submit"
                  class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition"
              >
                Verify
              </button>
            </div>
            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
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
    </section>
  </div>
  <!-- Success Page -->
  <div v-if="registrationSuccessful" class="flex flex-col items-center justify-center h-screen bg-green-600 text-white">
    <h2 class="text-4xl font-bold mb-4">Registration Successful!</h2>
    <p class="text-lg mb-6">Thank you for verifying your email. You can now log in to your account.</p>
    <button @click="redirectToLogin" class="bg-white text-green-600 py-2 px-6 rounded-full font-bold hover:bg-gray-200 transition">Go to Login</button>
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
      showVerificationPage: false,
      verificationCode: "",
      registrationSuccessful: false,
      error: null
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error = "Please enter a valid email address.";
      } else {
        this.error = null;
        this.showPasswordFields = true;
      }
    },
    async handleNext() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
      } else {
        this.error = null;
        try {
          const response = await axios.post("http://localhost:5033/api/register", {
            email: this.email,
            password: this.password,
          });
          console.log("Registration successful:", response.data);
          this.showVerificationPage = true;
          this.showPasswordFields = false;
        } catch (error) {
          this.error = "Error during registration. Please try again.";
          console.error("Error during registration:", error);
        }
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post("http://localhost:5033/api/register/confirm", {
          email: this.email,
          code: this.verificationCode,
        });
        console.log("Verification successful:", response.data);
        // Proceed to the next step in your application flow
        this.registrationSuccessful = true;
      } catch (error) {
        this.error = "Invalid verification code. Please try again.";
        console.error("Error during verification:", error);
      }
    },
    redirectToLogin() {
      // Add logic to redirect the user to the login page
      // For example, this could be:
      //this.$router.push("/login");
    },
    closeForm() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.verificationCode = "";
      this.showPasswordFields = false;
      this.showVerificationPage = false;
      this.registrationSuccessful = false;
      this.error = null;
    }
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
