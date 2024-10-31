<template>
  <div class="flex justify-center">
    <div class="relative mt-10  w-full overflow-hidden">
      <!-- Scrollable Row Container -->
      <div class="ml-10 mr-10 flex space-x-6 items-center overflow-x-auto no-scrollbar" ref="scrollContainer">
        <div
            v-for="service in services"
            :key="service.name"
            :style="{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }"
            class="bg-gray-800 rounded-lg flex-shrink-0"
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
          class="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-75 w-16 h-16
                 rounded-full hover:bg-opacity-90 flex items-center justify-center text-white text-6xl"
          @click="scrollLeft"
      >
        <i class="icon-arrow-left mb-3"><</i>
      </button>

      <!-- Right Arrow Button -->
      <button
          class="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-75 w-16 h-16
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
  data() {
    return {
      cardWidth: 300, // Initial card width; this will be adjusted based on screen width
    };
  },
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    // Adjust card width based on window size
    this.updateCardWidth();
    window.addEventListener("resize", this.updateCardWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateCardWidth);
  },
  methods: {
    handleServiceClick(id) {
      this.$router.push("/catalog/" + id);
    },
    scrollLeft() {
      const scrollAmount = this.getScrollAmount();
      this.$refs.scrollContainer.scrollBy({left: -scrollAmount, behavior: "smooth"});
    },
    scrollRight() {
      const scrollAmount = this.getScrollAmount();
      this.$refs.scrollContainer.scrollBy({left: scrollAmount, behavior: "smooth"});
    },
    getScrollAmount() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        return this.cardWidth * 4.5; // Show more cards on large screens
      } else if (screenWidth >= 1024) {
        return this.cardWidth * 3.5; // Medium screens
      } else if (screenWidth >= 768) {
        return this.cardWidth * 3;  // Small screens
      } else {
        return this.cardWidth * 2;
      }
    },
    updateCardWidth() {
      // Adjust the width of each card based on the screen width to control the number of visible items
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        this.cardWidth = 250; // Show more cards on large screens
      } else if (screenWidth >= 1024) {
        this.cardWidth = 300; // Medium screens
      } else if (screenWidth >= 768) {
        this.cardWidth = 350; // Small screens
      } else {
        this.cardWidth = 400; // Extra small screens
      }
    },
  },
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

/* Restrict container to horizontal scrolling only */
.overflow-x-auto {
  overflow-y: hidden; /* Disable vertical scroll */
}
</style>
