<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <Header />

    <Banner />

    <!-- Catalog Section -->
    <section class="p-8 mx-auto">
      <h2 class="text-2xl font-bold mb-6">All Services</h2>

      <!-- Service Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1">
        <div v-for="service in services" :key="service.name" class="bg-gray-800 rounded-lg h-[273px] w-[210px] ">
          <img :src="service.image" :alt="service.name" class="object-cover bg-cover rounded-lg mb-4" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../common/header/Header.vue";
import Banner from "./components/Banner.vue";

export default {
  components: {Banner, Header},
  data() {
    return {
      services: [
        { name: "Make Friends", image: "https://static-oss.epal.gg/data/static/v3/img10_MakeFriends.png" },
        { name: "E-Chat", image: "https://static-oss.epal.gg/data/static/v4/img10_E_Chat.png" },
        { name: "Valorant", image: "https://static-oss.epal.gg/data/static/v2/img10_v2_Valorant.png" },
        { name: "League of Legends", image: "https://static-oss.epal.gg/data/static/v2/img10_v2_LeagueofLegends.png" },
        { name: "Movie", image: "https://static-oss.epal.gg/data/static/v3/img10_Movie.png" },
        { name: "Fortnite", image: "https://static-oss.epal.gg/data/static/v2/img10_v2_Fortnite.png" },
      ],
    };
  },
};
</script>

<style scoped>

</style>