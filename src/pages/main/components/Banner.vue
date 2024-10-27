<template>
  <!-- Banner -->
  <section
      class="relative bg-purple-700 p-10 bg-center bg-no-repeat bg-cover h-[400px] flex items-center"
      :style="{ backgroundImage: `url('banner.webp')` }"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-40"></div>

    <!-- Left-aligned, vertically centered text -->
    <h1 class="text-4xl font-bold text-white relative z-10 font-display ml-10">
      FIRST RECHARGE BONUS!
    </h1>
  </section>
</template>

<script>
export default {
  name: "Banner"
}
</script>