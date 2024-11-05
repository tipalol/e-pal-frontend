<template>
  <div class="bg-gray-800 p-4 rounded-lg flex justify-between items-center space-x-4">
    <img src="https://via.placeholder.com/50" alt="User avatar" class="w-12 h-12 rounded-full" />
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ order.user }}</h3>
      <p class="text-gray-400">{{ order.game }}</p>
      <p class="text-gray-500 text-sm">{{ order.created }}</p>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-purple-500 text-xl font-semibold">{{ order.price }}</span>
      <span class="text-green-500" v-if="order.status === 'Completed'">{{ order.status }}</span>
      <button
          v-if="order.status === 'Completed'"
          class="bg-purple-600 px-3 py-1 rounded-md text-sm font-medium"
      >
        Fast Review
      </button>
      <button class="text-gray-400">
        <!-- Icon Placeholder -->
        <span class="material-icons">more_horiz</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
};
</script>