<template>
  <Header />

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

  <SuccessView v-if="registrationSuccessful"  button-url="#"
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

export default {
  components: {
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
      currentStep: "registration",
    };
  },
  methods: {
    handleRegistrationSuccess() {
      this.currentStep = "verification";
    },
    handleVerificationSuccess() {
      this.registrationSuccessful = true;
    },
    handleLoginSuccess(token) {
      this.currentStep = "login_success";
      this.registrationSuccessful = true;
      const authStore = useAuthStore();
      authStore.setToken(token);
      localStorage.setItem('authToken', data.token);
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
