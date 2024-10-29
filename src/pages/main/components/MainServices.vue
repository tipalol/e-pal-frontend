<template>
  <section class="p-8 mx-auto">
    <h2 class="text-2xl font-bold mb-6">All Services</h2>

    <!-- Service Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
      <div v-for="service in services" :key="service.name" class="bg-gray-800 rounded-lg h-[273px] w-[210px]">
        <img @click="handleServiceClick(service.id)"
             class="object-cover bg-cover rounded-lg mb-4 cursor-pointer hover:scale-110"
             :src="service.avatar"
             :alt="service.name"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleServiceClick(id) {
      this.$router.push("/catalog/" + id);
    }
  }
};
</script>