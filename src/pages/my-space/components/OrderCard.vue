<template>
  <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
    <!-- Seller Avatar and Name -->
    <div class="flex items-center space-x-4">
      <router-link :to=getSellerProfileUrl(order.seller.name)><img
          :src="order.seller.avatar"
          alt="Seller Avatar"
          class="w-14 h-14 rounded-full"
      /></router-link>
      <OrderInfo
          :sellerName="order.seller.name"
          :serviceName="order.service.name"
          :quantity="order.quantity"
          :price="order.total"
      />
    </div>
  </div>
</template>

<script>
import OrderInfo from "./OrderInfo.vue";

export default {
  components: {
    OrderInfo,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getSellerProfileUrl(sellerId) {
      return "/profile/" + sellerId;
    }
  }
};
</script>
