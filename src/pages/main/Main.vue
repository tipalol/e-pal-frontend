<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <Header />
    <Banner />

    <MainServices :services="services" />

  </div>
</template>

<script>
import Header from "../common/header/Header.vue";
import Banner from "./components/Banner.vue";
import MainServices from "./components/MainServices.vue";
import axios from "axios";
import EpalsCatalog from "../catalog/EpalsCatalog.vue";

export default {
  components: {EpalsCatalog, MainServices, Banner, Header},
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get("http://localhost:5033/api/Catalog/serviceTypes?take=6");
        this.services = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
  },
};
</script>

<style scoped>

</style>