<template>
  <aside class="w-1/4 space-y-6">
    <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
      <img :src="avatar" alt="User Profile" class="w-24 h-24 rounded-full mb-4" />
      <h3 class="text-lg font-semibold">{{ username }}</h3>
      <button class="bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-full text-sm">Chat</button>
      <button class="bg-purple-500 hover:bg-purple-600  py-2 px-4 rounded-full text-sm mt-2">Order</button>
      <p class="mt-2 text-gray-400 text-xs text-center">
        Avg. IM Response Time ≤ 5 mins
      </p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "ProfileActions",
  props: {
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
};
</script>