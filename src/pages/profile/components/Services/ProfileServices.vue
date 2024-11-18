<template>
  <aside class="w-1/5 space-y-6">
    <!-- Контейнер с цветом фона -->
    <div class="bg-gray-800 p-6 rounded-lg space-y-4">
      <div v-if="isMyProfile">
        <button @click="addServiceBtnClick" class="px-4 py-2 bg-purple-500 rounded-full text-sm hover:bg-purple-600">
          Add new Service
        </button>
      </div>

      <div
          v-for="(service, index) in services"
          :key="index"
          class="p-4 rounded-lg flex items-center justify-between transition duration-300 ease-in-out cursor-pointer"
          :class="[selectedServiceId === service.id ? 'bg-purple-600 border border-purple-300' : 'bg-gray-700', 'hover:bg-gray-600']"
          @click="selectService(service.id)"
      >
        <div class="flex items-center space-x-3">
          <img :src="service.icon" :alt="service.name" class="w-10 h-10 rounded-full" />
          <div>
            <h3 class="text-sm font-bold">{{ service.name }}</h3>
            <p class="text-gray-400 text-xs">{{ service.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-8 rounded-lg text-center max-w-sm w-full">
      <h2 class="text-3xl font-bold text-purple-600">Add new service</h2>

      <!-- Custom Select Dropdown -->
      <div class="mt-4 text-purple-600">
        <label class="block text-gray-700">Select Category</label>
        <div class="relative">
          <button @click="toggleDropdown" class="w-full p-2 border border-gray-300 rounded flex items-center justify-between">
            <span>{{ selectedCategory ? selectedCategory.name : 'Choose a category' }}</span>
            <svg :class="{ 'rotate-180': isDropdownOpen }" class="w-4 h-4 ml-2 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="isDropdownOpen" class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-y-auto">
            <input v-model="searchQuery" type="text" placeholder="Search category" class="w-full p-2 border-b border-gray-300 mb-2 sticky top-0 bg-white z-20">
            <div v-for="category in filteredCategories" :key="category.id" @click="selectCategory(category)" class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
              <img :src="category.avatar" alt="Category Avatar" class="w-12 h-16 mr-2">
              <span>{{ category.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Fields -->
      <div class="mt-4 text-purple-600 ">
        <label class="block text-gray-700">Service name</label>
        <input v-model="serviceName" type="text" placeholder="Enter service name" class="w-full p-2 border border-gray-300 rounded">
        <input v-model="serviceDescription" type="text" placeholder="Enter service description" class="w-full mt-1 p-2 border border-gray-300 rounded">
      </div>

      <button @click="applyModal" class="bg-green-500 mt-6 mr-2 text-white py-2 px-6 rounded-full">Apply</button>
      <button @click="closeModal" class="mt-6 bg-black text-white py-2 px-6 rounded-full">Close</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";

import axios from "axios";
import {useAuthStore} from "../../../../stores/auth.js";

export default {
  name: "ProfileServices",
  props: {
    services: {
      type: Array,
      required: true,
    },
    isMyProfile: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      isDropdownOpen: false,
      categories: [],
      selectedCategory: null,
      serviceName: '',
      serviceDescription: '',
      searchQuery: '',
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
          category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async addServiceBtnClick() {
      try {
        const response = await axios.get("http://localhost:5033/api/catalog/categories");
        this.categories = response.data.data;
        console.log(this.categories);
      } catch (error) {
        console.error("Error fetching service type:", error);
      }
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async applyModal(){
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        await axios.post("http://localhost:5033/api/services", {
          name: this.serviceName,
          description: this.serviceDescription,
          categoryId: this.selectedCategory.id,
        }, { headers });

      } catch (error) {

        console.error("Post service error: ", error);
      }
      finally {
        this.$emit("service-updated"); // Emit an event to parent
        this.closeModal();
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.isDropdownOpen = false;
    }
  },
  setup(props, {emit}) {
    const selectedServiceId = ref(null);

    onMounted(() => {
      if (props.services.length > 0) {
        selectedServiceId.value = props.services[0].id;
        console.log("Selected first service ID:", selectedServiceId.value);
        emit("service-selected", selectedServiceId.value);
      }
    });

    const selectService = (serviceId) => {
      selectedServiceId.value = serviceId;
      console.log("Selected service ID:", selectedServiceId.value);
      emit("service-selected", serviceId);
    };

    watch(
        () => props.services,
        (newCategories) => {
          if (newCategories.length > 0 && !selectedServiceId.value) {
            selectedServiceId.value = newCategories[0].id;
            emit("service-selected", selectedServiceId.value);
          }
        },
        {immediate: true}
    );

    return {
      selectedServiceId,
      selectService,
    };
  },
};
</script>

<style scoped>
/* Add CSS here to style the dropdown arrow, etc., as needed */
</style>
