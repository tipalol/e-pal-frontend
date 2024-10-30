<template>
  <!-- Banner -->
  <section
      class="relative bg-purple-700 p-10 bg-center bg-no-repeat bg-cover h-[400px] flex items-center overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-40"></div>

    <!-- Transition Wrapper -->
    <transition name="slide" mode="out-in">
      <div
          :key="currentSlideIndex"
          class="w-full h-full flex items-center absolute inset-0 bg-center bg-cover"
          :style="{ backgroundImage: `url(${slides[currentSlideIndex].backgroundImage})` }"
      >
        <!-- Left-aligned, vertically centered text -->
        <h1 class="text-4xl font-bold text-white relative z-10 font-display ml-10">
          {{ slides[currentSlideIndex].heading }}
        </h1>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Banner",
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentSlideIndex: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.startSlider();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    startSlider() {
      this.intervalId = setInterval(() => {
        this.currentSlideIndex =
            (this.currentSlideIndex + 1) % this.slides.length;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
