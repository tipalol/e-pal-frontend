<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <Header />
    <Banner :slides="slidesData" />
    <div class="container-fluid space-y-16" style="padding-bottom:200px">
      <MainServices :services="services" />
      <NewbiesEpals />
      <MoreEpals />
    </div>


  </div>
</template>

<script>
import Header from "../common/header/Header.vue";
import Banner from "./components/Banner.vue";
import MainServices from "./components/MainServices.vue";
import axios from "axios";
import MoreEpals from "./components/MoreEpals.vue";
import NewbiesEpals from "./components/NewbiesEpals.vue";

export default {
  components: {NewbiesEpals, MoreEpals, MainServices, Banner, Header},
  data() {
    return {
      services: [],
      slidesData: [
        {
          heading: 'Welcome to Our Site',
          backgroundImage: 'banner.webp',
        },
        {
          heading: 'Enjoy Our Services',
          backgroundImage: 'banner.webp',
        },
        {
          heading: 'Contact Us Today',
          backgroundImage: 'banner.webp',
        },
      ],
    };
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get("http://localhost:5033/api/catalog/categories?take=10");
        this.services = response.data.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
  },
};
</script>

<style scoped>

</style>