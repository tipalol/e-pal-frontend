<template>
  <div class="flex flex-col items-center justify-center h-screen text-white">
    <h2 class="text-4xl font-bold mb-4">{{ title }}</h2>
    <p class="text-lg mb-6">{{ message }}</p>
    <button
        @click="goToUrl"
        class="bg-white text-green-600 py-2 px-6 rounded-full font-bold hover:bg-gray-200 transition"
    >
      Press me
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Registration Successful!',
    },
    message: {
      type: String,
      default: 'Thank you for verifying your email. You can now log in to your account.',
    },
    buttonUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToUrl() {
      // If you're using Vue Router, use this.$router.push
      // Otherwise, use window.location.href
      if (this.$router) {
        this.$router.push(this.buttonUrl);
      } else {
        window.location.href = this.buttonUrl;
      }
    },
  },
};
</script>
