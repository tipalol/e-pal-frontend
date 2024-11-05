<template>
  <Header />

  <div class="min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-semibold mb-4 text-purple-300">My Orders</h1>
    <div class="grid grid-cols-1 gap-6">
      <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
      />
    </div>
  </div>
</template>

<script>
import Header from "../common/header/Header.vue";
import OrderCard from "./components/OrderCard.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "../../stores/auth.js";

export default {
  name: "MySpace",
  components: {OrderCard, Header},
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
  }
};
</script>