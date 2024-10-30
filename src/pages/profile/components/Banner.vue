<template>
  <section class="bg-gray-800 py-8 px-8 text-center relative">
    <div class="flex flex-col items-center space-y-3 font-bold">
      <img :src="avatar" alt="User Avatar" class="w-36 h-36 rounded-full" />
      <h1 class="text-2xl">{{ username }}</h1>
      <!-- Используем динамическое свойство для цвета текста -->
      <p :style="{ color: genderTextColor }" class="text-sm text-xl">{{ gender }}</p>
      <p class="text-gray-400 text-sm">{{ languages }}</p>
      <div class="flex justify-center space-x-6 mt-4">
        <a href="#" class="text-white">Achievements</a>
        <a href="#" class="text-white border-b-2 border-purple-500">Services</a>
        <a href="#" class="text-white">Album</a>
        <a href="#" class="text-white">Wish</a>
        <a href="#" class="text-white">Feeds</a>
      </div>
      <router-link class="absolute top-4 right-4 bg-purple-600 py-1 px-3 rounded-full text-sm text-white" to="/profile/settings">
        Edit Profile
      </router-link>
    </div>
  </section>
</template>
<script>
import { computed } from "vue";

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
    gender: {
      type: String,
      default: "--",
      required: false,
    },
  },
  setup(props) {
    // Определяем цвет текста в зависимости от пола
    const genderTextColor = computed(() => {
      return props.gender === "Woman" ? "#ff00cc" : props.gender === "Man" ? "#2968ff" : "#999999";
    });

    return { genderTextColor };
  },
};
</script>
