<template>
  <section class="w-2/4 space-y-6">
    <!-- card -->
    <div lable="card" class="bg-gray-800 p-6 rounded-lg">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="text-yellow-500 text-sm">5.0 • 1759 Served</p>
      <p class="mt-4 text-gray-400 text-sm">{{ text }}</p>
      <p class="text-sm text-gray-400">Styles: Talkative</p>
    </div>

    <!-- Service Types -->
    <div class="bg-gray-800 p-6 rounded-lg space-y-4">
      <h3 class="text-lg font-semibold"> Services • {{ serviceOptions.length }}</h3>
      <div
          v-for="(type, index) in serviceOptions"
          :key="index"
          @click="this.$emit('service-chosen', type)"
          class="flex items-center justify-between bg-gray-700 p-3 rounded-md cursor-pointer"
      >
        <span>{{ type.name }}</span>
        <span class="text-purple-500">{{ type.price }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "serviceOptions",
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    serviceOptions: {
      type: Array,
      required: true,
    },
  },
};
</script>