<template>
  <Header />
  <div class="min-h-screen bg-gray-900 text-white px-6 py-4">
    <!-- Page Title -->
    <div class="h-[150px]">
      <div class="text-center text-3xl font-bold mb-4">{{serviceType.name}}</div>
      <div class="text-center text-gray-400 text-sm mb-6">1.1k ePals</div>
    </div>

    <!-- Filters and Sorting -->
    <div class="flex flex-wrap justify-center gap-3 mb-6">
      <button class="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600">eStar</button>
      <button class="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600">New ePals</button>
      <button class="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600">1st Order Free</button>
      <button class="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600">Discount</button>
      <button class="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600">Buy X Get Y</button>
      <button class="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-gray-600">More filters</button>
      <div class="flex items-center ml-auto">
        <span class="text-sm mr-2">Sort by</span>
        <select class="bg-gray-700 text-sm px-2 py-1 rounded-lg">
          <option>General</option>
          <option>Popularity</option>
          <option>Price</option>
        </select>
      </div>
    </div>

    <!-- User Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="user in users"
          :key="user.id"
          class="bg-gray-800 p-4 rounded-lg relative overflow-hidden"
      >

        <EpalCard
            :id="user.id"
            :bio="user.bio"
            :avatar="user.avatar"
            :username="user.username"
        />

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../common/header/Header.vue";
import EpalCard from "../common/EpalCard.vue";

export default {
  components: {EpalCard, Header},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      users: [],
      serviceType: {
        name: ""
      },
    };
  },
  mounted() {
    this.fetchServiceType();
    this.fetchEpalsCatalog();
  },
  methods: {
    async fetchEpalsCatalog() {
      try {
        const response = await axios.get("http://localhost:5033/api/catalog/epals?serviceTypeId="+this.id+"&take=20");
        this.services = response.data.data;
        this.users = response.data.data;
        console.log(this.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    async fetchServiceType() {
      try {
        const response = await axios.get("http://localhost:5033/api/services/category/"+this.id);
        this.serviceType = response.data.data;
        console.log(this.services);
      } catch (error) {
        console.error("Error fetching service type:", error);
      }
    },
  }
};
</script>