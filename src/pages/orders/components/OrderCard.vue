<template>
  <div class="bg-gray-800 p-4 rounded-lg flex justify-between items-center space-x-4">
    <img :src=order.service.icon alt="User avatar" class="w-16 h-24 rounded-xl" />
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ order.service.name }}</h3>
      <p class="text-gray-400">{{ order.service.description }}</p>
      <p class="text-gray-500 text-sm">Created at {{ order.date }}</p>
      <span class="text-purple-500 text-xl font-semibold">{{ order.total }}</span>
    </div>
    <div class="flex flex-col items-center space-x-2">
      <span class="text-gray-400 font-menu">{{ order.status }}</span>
      <div class="h-12"></div>
      <button class="text-gray-400">
        <!-- Icon Placeholder -->
        <span class="material-icons">{{ order.seller.name }}</span>
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