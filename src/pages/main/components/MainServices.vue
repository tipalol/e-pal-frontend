<template>
  <div class="flex justify-center">

     <div class="relative mt-10 ml-5 w-[93rem]">
      <!-- Scrollable Row Container -->
      <div class="flex overflow-x-auto space-x-6 items-center no-scrollbar" ref="scrollContainer">
        <div
            v-for="service in services"
            :key="service.name"
            class="min-w-[350px] max-w-[350px] bg-gray-800 rounded-lg flex-shrink-0"
        >
          <img
              @click="handleServiceClick(service.id)"
              class="object-cover bg-center bg-cover rounded-lg cursor-pointer hover:scale-110 transition transform duration-300"
              :src="service.avatar"
              :alt="service.name"
          />
        </div>
      </div>
       <!-- Left Arrow Button -->
       <button
           class="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-75 w-16 h-16
            rounded-full hover:bg-opacity-90 flex items-center justify-center text-white text-6xl"
           @click="scrollLeft"
       >
         <i class="icon-arrow-left mb-3"><</i>
       </button>

       <!-- Right Arrow Button -->
       <button
           class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-75 w-16 h-16
            rounded-full hover:bg-opacity-90 flex items-center justify-center text-white text-6xl"
           @click="scrollRight"
       >
         <i class="icon-arrow-right mb-3">></i>
       </button>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleServiceClick(id) {
      this.$router.push("/catalog/" + id);
    },
    scrollLeft() {
      // Scroll left by 200px
      this.$refs.scrollContainer.scrollBy({ left: -370*4, behavior: 'smooth' });
    },
    scrollRight() {
      // Scroll right by 200px
      this.$refs.scrollContainer.scrollBy({ left: 370*4, behavior: 'smooth' });
    },
  }
};
</script>

<style scoped>
/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>