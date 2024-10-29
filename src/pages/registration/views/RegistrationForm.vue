<template>
  <div class="space-y-8 w-full">
    <div v-if="!showPasswordFields">
      <input
          v-model="localEmail"
          type="text"
          id="email"
          placeholder="Enter Phone or Email"
          class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
      />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>
    <div v-else class="space-y-6">
      <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Password"
          class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-purple-400"
      />
      <input
          v-model="confirmPassword"
          v-if="!loginMode"
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
          class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-3"
      >
        Next
      </button>
      <button
          v-if="showPasswordFields"
          @click="handleSubmit"
          type="button"
          class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-3"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      localEmail: this.modelValue || "",
      password: "",
      confirmPassword: "",
      showPasswordFields: false,
      loginMode: false,
      userStatus: null,
      error: null,
    };
  },
  watch: {
    localEmail(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
  methods: {
    async validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.localEmail)) {
        //this.error = "Please enter a valid email address.";

        this.loginMode = true;
        console.log("Login mode:", this.loginMode);
        this.showPasswordFields = true;

      } else {
        this.error = null;

        const response = await axios.get(
            "http://localhost:5033/api/userstatus?email="+this.localEmail);
        console.log("Check user status:", response.data);

        this.loginMode = response.data.exists;
        this.userStatus = response.data.status;

        console.log("Login mode:", this.loginMode);
        this.showPasswordFields = true;
      }
    },
    async handleSubmit() {
      if (!this.loginMode && this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
      } else {
        this.error = null;
        if (this.loginMode)
        {
          try {
            const response = await axios.post("http://localhost:5033/api/auth", {
              login: this.localEmail,
              password: this.password,
            });
            if (this.userStatus === "Created")
            {
              console.log("Logged in, verification continue:", response.data);

              this.$emit("registration-success", response.data);
              return;
            }
            console.log("Login successful:", response.data);
            this.$emit("login-success", response.data);
          } catch (error) {
            this.error = "Error during login. Please try again.";
            console.error("Error during login:", error);
          }

          return;
        }
        try {
          const response = await axios.post("http://localhost:5033/api/register", {
            email: this.localEmail,
            password: this.password,
          });
          console.log("Registration successful:", response.data);
          this.$emit("registration-success", response.data);
        } catch (error) {
          this.error = "Error during registration. Please try again.";
          console.error("Error during registration:", error);
        }
      }
    },
  },
};
</script>
