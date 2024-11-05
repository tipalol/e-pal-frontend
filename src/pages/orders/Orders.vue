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
            class="block text-left px-4 py-2 rounded-md hover:bg-gray-700"
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
      />
    </main>
  </div>
</template>

<script>
import OrderCard from './components/OrderCard.vue';
import Header from "../common/header/Header.vue";

export default {
  name: "Orders",
  components: {Header, OrderCard },
  data() {
    return {
      activeTab: 'Seller',
      selectedStatus: 'Completed',
      statuses: ['Pending', 'Completed', 'In Dispute', 'Canceled'],
      orders: [
        {
          user: 'Lester Heng',
          game: 'League of Legends',
          created: 'Jul 20, 2021 5:33 PM',
          price: '2.00',
          status: 'Completed',
        },
        {
          user: 'Kaitou',
          game: 'League of Legends',
          created: 'Mar 23, 2021 12:04 PM',
          price: '4.00',
          status: 'Completed',
        },
        {
          user: 'epa*****@outlook.com',
          game: 'League of Legends',
          created: 'Jul 24, 2020 10:23 PM',
          price: '2.36',
          status: 'Completed',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Custom styling if needed */
</style>
