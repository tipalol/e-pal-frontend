<template>
  <div class="flex flex-col items-center justify-center h-screen text-white">
    <h2 class="text-4xl font-bold mb-4">{{ title }}</h2>
    <p class="text-lg mb-6">{{ message }}</p>
    <router-link to="/" class="w-3/12"><button
        @click="goToUrl"
        type="button"
        class="w-3/12 bg-purple-500 text-white py-3 rounded-full font-bold hover:bg-purple-600 transition mt-3"
    >
      Retry
    </button></router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Error',
    },
    message: {
      type: String,
      default: 'Something gone wrong',
    },
    buttonUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToUrl() {
      //this.$router.push(this.buttonUrl);
    },
  },
};
</script>
