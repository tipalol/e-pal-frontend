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
      <div class="flex">
        <h3 class="text-lg font-semibold"> Services details • {{ serviceOptions.length }} • </h3>
        <div v-if="isMyProfile">
          <button @click="onAddNewDetailsBtnClick" class="px-4 py-1 ml-2 bg-purple-500 rounded-full text-sm hover:bg-purple-600">
            Add new
          </button>

        </div>
      </div>

      <div
          v-for="(type, index) in serviceOptions"
          :key="index"
          @click="this.$emit('service-option-chosen', type)"
          class="flex items-center justify-between bg-gray-700 p-3 rounded-md cursor-pointer"
      >
        <span class="mr-auto">{{ type.name }}</span>
        <span class="text-purple-500">{{ type.price }}</span>
      </div>
    </div>
  </section>


  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50" >
    <div class="bg-white p-8 rounded-lg text-center max-w-sm w-full">
      <h2 class="text-3xl font-bold text-purple-600">Add new service details</h2>
      <!-- Input Fields -->
      <div class="mt-4 text-purple-600 ">
        <label class="block text-gray-700">Service name</label>
        <input v-model="detailsName" type="text" placeholder="Enter details name" class="w-full p-2 border border-gray-300 rounded">
        <input v-model="price" type="number" placeholder="Enter price" class="w-full mt-1 p-2 border border-gray-300 rounded" step="0.1">
      </div>

      <button @click="applyModal" class="bg-green-500 mt-6 mr-2 text-white py-2 px-6 rounded-full">Apply</button>
      <button @click="closeModal" class="mt-6 bg-black text-white py-2 px-6 rounded-full">Close</button>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "../../../stores/auth.js";
import axios from "axios";

export default {
  name: "serviceOptions",
  props: {
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    serviceOptions: {
      type: Array,
      required: true,
    },
    serviceId: {
      type: String,
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
      detailsName: '',
      price: null,
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    onAddNewDetailsBtnClick(){
      this.isModalVisible = true;
    },
    async applyModal() {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        const response = await axios.post("http://localhost:5033/api/ServiceOptions", {
          name: this.detailsName,
          price: this.price,
          description: " ",
          ServiceId: this.serviceId,
        }, { headers });

        this.$emit("service-option-updated", this.serviceId); // Emit an event to parent

      } catch (error) {
        console.error("Post details error: ", error);
      }
      finally {
        this.closeModal();
      }
    },
  },

};
</script>