<template>
  <Header />

  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <aside class="w-1/4 p-6">
      <h1 class="text-3xl font-semibold mb-8">Orders</h1>
      <div class="flex space-x-4 mb-6">
        <button
            :class="{
            'text-purple-500 border-b-2 border-purple-500': activeTab === 'Seller',
            'text-gray-400': activeTab !== 'Seller',
          }"
            @click="activeTab = 'Seller'"
            class="text-lg font-medium"
        >
          Seller
        </button>
        <button
            :class="{
            'text-purple-500 border-b-2 border-purple-500': activeTab === 'Buyer',
            'text-gray-400': activeTab !== 'Buyer',
          }"
            @click="activeTab = 'Buyer'"
            class="text-lg font-medium"
        >
          Buyer
        </button>
      </div>

      <!-- Status Filter -->
      <div class="space-y-2">
        <button
            v-for="status in statuses"
            :key="status"
            :class="{
            'text-purple-500': selectedStatus === status,
            'text-gray-400': selectedStatus !== status,
          }"
            @click="selectedStatus = status"
            class="block text-left px-4 py-2 rounded-md hover:bg-gray-700 w-[128px]"
        >
          {{ status }}
        </button>
      </div>
    </aside>

    <!-- Orders List -->
    <main class="w-3/4 p-6 space-y-4">
      <OrderCard
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
          @click="onOrderClick(order.id)"
          class="cursor-pointer hover:bg-gray-600"
      />
    </main>
  </div>
</template>

<script>
import OrderCard from './components/OrderCard.vue';
import Header from "../common/header/Header.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "../../stores/auth.js";

export default {
  name: "Orders",
  components: {Header, OrderCard },
  setup() {
    const orders = ref([]);

    onMounted(async () => {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        const response = await fetch("http://localhost:5033/api/orders", { headers });
        if (response.ok) {
          orders.value = await response.json();
        } else {
          console.error("Failed to fetch orders data");
        }
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    });

    return { orders };
  },
  data() {
    return {
      activeTab: 'Seller',
      selectedStatus: 'Pending',
      statuses: ['Pending', 'Completed', 'In Dispute', 'Canceled'],
    };
  },
  methods: {
    onOrderClick(orderId) {
      console.log("Order click: " + orderId);
      this.$router.push("/orders/" + orderId);
    }
  }
};
</script>