<template>
  <div class="flex flex-col">
    <h2 class="text-xl font-medium">{{ sellerName }}</h2>
    <p class="text-sm text-gray-400">Service: {{ serviceName }}</p>

    <div class="flex items-center space-x-6 mt-2">
      <div>
        <p class="text-sm text-gray-400">Quantity</p>
        <p class="text-lg font-semibold">{{ quantity }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Price</p>
        <p class="text-lg font-semibold text-purple-300">{{ price }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sellerName: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>
