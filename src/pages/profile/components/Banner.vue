<!-- UserBanner.vue -->
<template>
  <section class="bg-gray-800 py-8 px-8 text-center relative">
    <div class="flex flex-col items-center space-y-4">
      <img :src="avatar" alt="User Avatar" class="w-24 h-24 rounded-full" />
      <h1 class="text-2xl font-bold">{{ username }}</h1>
      <p class="text-gray-400 text-sm">{{ languages }}</p>
      <div class="flex justify-center space-x-6 mt-4">
        <a href="#" class="text-white">Achievements</a>
        <a href="#" class="text-white border-b-2 border-purple-500">Services</a>
        <a href="#" class="text-white">Album</a>
        <a href="#" class="text-white">Wish</a>
        <a href="#" class="text-white">Feeds</a>
      </div>
      <button class="absolute top-4 right-4 bg-purple-600 py-1 px-3 rounded-full text-sm text-white">
        Subscribe: 20% Off
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProfileBanner",
  props: {
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
  },
};
</script>