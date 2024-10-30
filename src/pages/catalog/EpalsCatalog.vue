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
        <!-- User Profile Picture -->
        <img
            :src="user.avatar"
            alt="user profile"
            class="w-16 h-16 rounded-full absolute -top-8 left-4 border-4 border-gray-900"
        />

        <!-- Online Status Dot -->
        <div class="absolute top-2 left-12 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>

        <!-- Play Icon -->
        <div class="absolute top-4 right-4">
          <button class="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
            ▶
          </button>
        </div>

        <!-- User Details -->
        <div class="mt-8">
          <h3 class="font-semibold text-lg">{{ user.username }}</h3>
          <div class="flex items-center text-sm text-yellow-400 mt-1">
            <span>{{ user.rating }} ⭐</span>
            <span class="ml-1 text-gray-400">({{ user.reviews }})</span>
          </div>
          <p class="text-gray-400 text-xs mt-2">{{ user.description }}</p>
        </div>

        <!-- Service Info -->
        <div class="flex items-center justify-between mt-4 text-sm">
          <span class="bg-gray-700 px-2 py-1 rounded-full">{{ user.serviceType }}</span>
          <span class="text-purple-400 font-semibold">{{ user.price }}/{{ user.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../common/header/Header.vue";

export default {
  components: {Header},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      users: [
        {
          id: 1,
          avatar: 'path/to/image1.jpg',
          username: 'LaKimi 💖 🏆',
        },
        {
          id: 1,
          avatar: 'path/to/image1.jpg',
          username: 'LaKimi 💖 🏆',
        },
      ],
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
        const response = await axios.get("http://localhost:5033/api/Catalog/serviceType/"+this.id+"?take=20");
        this.services = response.data;
        this.users = response.data;
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