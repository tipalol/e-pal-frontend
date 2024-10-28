<template>
  <Header v-if="!this.registrationSuccessful"/>

  <div class="flex h-screen" v-if="!registrationSuccessful">
    <LeftHero />

    <section class="flex-1 flex justify-center items-center mb-10">
      <div class="min-w-[418px] max-w-[544px] w-[544px]">
        <h2 class="text-4xl font-bold text-white mb-20">Log in or sign up</h2>

        <RegistrationForm
            v-if="currentStep === 'registration'"
            v-model="email"
            @registration-success="handleRegistrationSuccess"
            @login-success="handleLoginSuccess"
        />

        <VerificationPage
            v-else-if="currentStep === 'verification'"
            :email="email"
            @verification-success="handleVerificationSuccess"
        />

        <SocialsBlock />
      </div>
    </section>
  </div>

  <CreateUsername v-if="registrationSuccessful && !usernameChosen" @username-chosen="handleUsernameChoose"/>
  <SuccessView v-if="registrationSuccessful && usernameChosen"  button-url="/"
               :title="this.getSuccessTitle()"
               :message="this.getSuccessMessage()"/>
</template>

<script>
import Header from "./views/Header.vue";
import SocialsBlock from "./views/SocialsBlock.vue";
import SuccessView from "./views/SuccessView.vue";
import LeftHero from "./views/LeftHero.vue";
import RegistrationForm from "./views/RegistrationForm.vue";
import VerificationPage from "./views/VerificationPage.vue";
import { useAuthStore } from '../../stores/auth.js';
import CreateUsername from "./views/CreateUsername.vue";

export default {
  components: {
    CreateUsername,
    Header,
    LeftHero,
    SocialsBlock,
    SuccessView,
    RegistrationForm,
    VerificationPage,
  },
  data() {
    return {
      email: "",
      registrationSuccessful: false,
      usernameChosen: false,
      currentStep: "registration",
    };
  },
  methods: {
    handleRegistrationSuccess(token) {
      this.currentStep = "verification";
      const authStore = useAuthStore();
      authStore.setToken(token);
    },
    handleVerificationSuccess() {
      this.registrationSuccessful = true;
    },
    handleLoginSuccess(token) {
      this.currentStep = "login_success";
      this.registrationSuccessful = true;
      this.usernameChosen = true;
      const authStore = useAuthStore();
      authStore.setToken(token);
    },
    handleUsernameChoose() {
      console.log("Username choose success")
      this.usernameChosen = true;
      this.$router.push('/');
    },
    getSuccessTitle() {
      return this.currentStep === "login_success"
          ? "Login Successful!"
          : "Registration Successful!";
    },
    getSuccessMessage() {
      return this.currentStep === "login_success"
          ? "Login Successful! Now you will be redirected to the main page."
          : "Thank you for verifying your email. You can now log in to your account.";
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>
