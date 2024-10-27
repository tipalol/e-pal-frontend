<template>
  <aside class="w-1/4 space-y-6">
    <div
        v-for="(service, index) in services"
        :key="index"
        class="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
    >
      <div class="flex items-center space-x-3">
        <img :src="service.icon" :alt="service.name" class="w-10 h-10 rounded-full" />
        <div>
          <h3 class="text-sm font-bold">{{ service.name }}</h3>
          <p class="text-gray-400 text-xs">{{ service.price }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "ProfileServices",
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
};
</script>