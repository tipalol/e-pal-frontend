<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <Header />

    <!-- Banner -->
    <section
        class="relative bg-purple-700 p-10 bg-center bg-no-repeat bg-cover h-[400px] flex items-center"
        :style="{ backgroundImage: `url('banner.webp')` }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-40"></div>

      <!-- Left-aligned, vertically centered text -->
      <h1 class="text-4xl font-bold text-white relative z-10 font-display ml-10">
        FIRST RECHARGE BONUS!
      </h1>
    </section>


    <!-- Catalog Section -->
    <section class="p-8">
      <h2 class="text-2xl font-bold mb-6">All Services</h2>

      <!-- Service Cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="service in services" :key="service.name" class="bg-gray-800 rounded-lg p-4 text-center">
          <img :src="service.image" :alt="service.name" class="h-40 w-full object-cover rounded-lg mb-4" />
          <h3 class="font-bold text-lg">{{ service.name }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../common/header/Header.vue";

export default {
  components: {Header},
  data() {
    return {
      services: [
        { name: "Make Friends", image: "https://static-oss.epal.gg/data/static/v3/img10_MakeFriends.png" },
        { name: "E-Chat", image: "https://static-oss.epal.gg/data/static/v4/img10_E_Chat.png" },
        { name: "Valorant", image: "valorant.png" },
        { name: "League of Legends", image: "lol.png" },
        { name: "Movie", image: "movie.png" },
        { name: "Fortnite", image: "fortnite.png" },
      ],
    };
  },
};
</script>

<style scoped>

</style>