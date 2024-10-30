<template>
  <router-link :to=getProfileUrl()>
  <img
      :src="this.avatar"
      alt="user profile"
      class="w-16 h-16 rounded-full absolute -top-8 left-4 border-4 border-gray-900"
  />

  <div class="absolute top-2 left-12 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>

  <div class="mt-8">
    <h3 class="font-semibold text-lg">{{ this.username }}</h3>
    <div class="flex items-center text-sm text-yellow-400 mt-1">
      <span>{{ 8.7 }} ⭐</span>
    </div>
    <p class="text-gray-400 text-xs mt-2">{{ this.bio }}</p>
  </div>

  <div class="flex items-center justify-between mt-4 text-sm">
    <span class="bg-gray-700 px-2 py-1 rounded-full">Chill</span>
    <span class="text-purple-400 font-semibold">{{ 6.66 }}/time</span>
  </div>
  </router-link>
</template>

<script>
export default {
  name: "EpalCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  methods: {
    getProfileUrl() {
      return "/profile/" + this.username;
    }
  }
}
</script>