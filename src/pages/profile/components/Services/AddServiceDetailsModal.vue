<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-8 rounded-lg text-center max-w-sm w-full">
      <h2 class="text-3xl font-bold text-purple-600">Add new service details</h2>
      <!-- Input Fields -->
      <div class="mt-4 text-purple-600">
        <label class="block text-gray-700">Service name</label>
        <input v-model="detailsName" type="text" placeholder="Enter details name" class="w-full p-2 border border-gray-300 rounded">
        <input v-model="price" type="number" placeholder="Enter price" class="w-full mt-1 p-2 border border-gray-300 rounded" step="0.1">
      </div>
      <!-- Buttons -->
      <button @click="apply" class="bg-green-500 mt-6 mr-2 text-white py-2 px-6 rounded-full">Apply</button>
      <button @click="$emit('close')" class="mt-6 bg-black text-white py-2 px-6 rounded-full">Close</button>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "../../../../stores/auth.js";
import axios from "axios";

export default {
  name: "AddServiceDetailsModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailsName: "",
      price: null,
    };
  },
  methods: {
    async apply() {
      try {
        const headers = { Authorization: "Bearer " + useAuthStore().token };
        await axios.post(
            "http://localhost:5033/api/ServiceOptions",
            {
              name: this.detailsName,
              price: this.price,
              description: " ",
              ServiceId: this.serviceId,
            },
            { headers }
        );
        this.$emit("service-option-added");
      } catch (error) {
        console.error("Error adding service option:", error);
      } finally {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
/* Add any modal-specific styles here */
</style>
