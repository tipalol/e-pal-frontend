<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click="handleOutsideClick">
    <div class="rounded-lg w-full max-w-md p-6 relative" @click.stop style="background-color: rgb(19, 19, 26)">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600" @click="closeModal">
        &times;
      </button>
      <div class="flex items-center space-x-4 mb-4">
        <img src="https://static-oss.epal.gg/data/static/v2/img10_v2_LeagueofLegends.png" alt="Game Image" class="w-12 h-12 rounded-md" />
        <div>
          <h2 class="text-lg font-semibold text-purple-50">{{ title }}</h2>
          <p class="text-gray-500 text-sm">{{ description }}</p>
        </div>
      </div>
      <div class="flex justify-between items-center mb-4">
        <p class="text-gray-500">2.00/Game</p>
        <p class="text-purple-500 font-semibold">⚡</p>
      </div>

      <div class="flex items-center justify-between mb-4">
        <label class="text-gray-600">Rounds</label>
        <div class="flex items-center space-x-2 text-purple-50">
          <button @click="decrementRounds" class="px-2 py-1 border border-gray-300 rounded-md">-</button>
          <span>{{ rounds }}</span>
          <button @click="incrementRounds" class="px-2 py-1 border border-gray-300 rounded-md">+</button>
        </div>
      </div>

      <hr class="my-4" />

      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Subtotal</span>
        <span class="text-purple-500 font-semibold">⚡{{ (rounds * 2).toFixed(2) }}</span>
      </div>

      <div class="flex justify-between mb-4">
        <span class="text-gray-600">Promo Code</span>
        <button class="text-purple-600 underline text-sm">I have a Promo Code</button>
      </div>

      <hr class="my-4" />

      <div class="flex justify-between mb-6">
        <span class="text-gray-700 font-semibold">Final Price</span>
        <span class="text-purple-500 font-semibold">⚡{{ (rounds * 2).toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <button @click="closeModal" class="px-4 py-2 bg-gray-700 text-gray-300  rounded-md">Cancel</button>
        <button @click="confirmOrder" class="px-4 py-2 bg-purple-500 hover:bg-purple-600  text-white rounded-md">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rounds: 1,
    };
  },
  methods: {
    incrementRounds() {
      this.rounds++;
    },
    decrementRounds() {
      if (this.rounds > 1) this.rounds--;
    },
    closeModal() {
      this.$emit("close");
    },
    confirmOrder() {
      // Handle order confirmation logic
      this.$emit("confirm-order");
      console.log("Order confirmed");
      this.closeModal();
    },
    handleOutsideClick(event) {
      // Close the modal if the user clicks outside the content area
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>

