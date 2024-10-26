<template>
  <form @submit.prevent="verifyCode" class="space-y-8 w-full">
    <input
        v-model="verificationCode"
        type="text"
        maxlength="5"
        id="verificationCode"
        placeholder="Enter Verification Code"
        class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
    />
    <p @click="resendCode()" class="text-gray-400 text-center flex justify-start mt-6 cursor-pointer hover:text-purple-500">Resend email confirmation letter</p>
    <div class="flex justify-end mt-6">
      <button
          :disabled="verificationCode.length < 5"
          type="submit"
          class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition disabled:bg-gray-600"
      >
        Verify
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  props: ["email"],
  data() {
    return {
      verificationCode: "",
      error: null,
    };
  },
  methods: {
    async verifyCode() {
      try {
        const response = await axios.post("http://localhost:5033/api/register/confirm", {
          email: this.email,
          code: this.verificationCode,
        });
        if (response.data)
        {
          console.log("Verification successful:", response.data);
          this.$emit("verification-success");
        }
        else {
          this.error = "Invalid verification code. Please try again.";
          console.error("Error during verification:", response.data);
        }
      } catch (error) {
        this.error = "Invalid verification code. Please try again.";
        console.error("Error during verification:", error);
      }
    },
    async resendCode() {
      try {
        const response = await axios.post("http://localhost:5033/api/register/resend?email="+this.email);
        if (response.data) {
          console.log("Resend successful:", response.data);
        } else {
          this.error = "Can't resend email. Please try again later.";
          console.error("Error during resending:", response.data);
        }
      } catch (error) {
        this.error = "Can't resend email. Please try again later.";
        console.error("Error during resending:", error);
      }
    }
  },
};
</script>
