<template>

  <Header />

  <div class="flex h-screen" v-if="!registrationSuccessful">
    <LeftHero />

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

        <SocialsBlock />

      </div>
    </section>
  </div>

  <SuccessView v-if="registrationSuccessful" />

</template>

<script>
import axios from "axios";
import Header from "./views/Header.vue";
import SocialsBlock from "./views/SocialsBlock.vue";
import SuccessView from "./views/SuccessView.vue";
import LeftHero from "./views/LeftHero.vue";

export default {
  components: {LeftHero, SuccessView, SocialsBlock, Header},
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
