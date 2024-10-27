<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header Section -->
    <header class="bg-gradient-to-r from-purple-800 to-purple-700 py-6 px-8 flex items-center justify-between relative">
      <div class="flex items-center space-x-4">
        <img src="../registration/assets/logo.png" alt="E-PAL Logo" class="w-12 h-12" />
        <nav class="space-x-6 hidden lg:flex">
          <a href="#" class="text-gray-200 hover:text-white">Play</a>
          <a href="#" class="text-gray-200 hover:text-white">ePals</a>
          <a href="#" class="text-gray-200 hover:text-white">Community</a>
          <a href="#" class="text-gray-200 hover:text-white">App</a>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-sm bg-purple-600 py-1 px-4 rounded-full text-white">Become an ePal</button>
        <button class="text-sm text-white">Log In</button>
        <button class="text-sm bg-purple-500 py-1 px-4 rounded-full text-white">Sign Up</button>
      </div>
    </header>

    <!-- Profile Banner Section -->
    <section class="bg-gray-800 py-8 px-8 text-center relative">
      <div class="flex flex-col items-center space-y-4">
        <img src="./assets/avatar.webp" alt="User Avatar" class="w-24 h-24 rounded-full" />
        <h1 class="text-2xl font-bold">dopameanie</h1>
        <p class="text-gray-400 text-sm">@dopameanie • 日本語/English</p>
        <div class="flex items-center space-x-2 text-sm">
          <span class="text-green-400">Online</span>
          <span class="text-yellow-500">VIP</span>
          <span class="text-purple-400">estar 2</span>
        </div>
        <div class="flex justify-center space-x-6 mt-4">
          <a href="#" class="text-white">Achievements</a>
          <a href="#" class="text-white border-b-2 border-purple-500">Services</a>
          <a href="#" class="text-white">Album</a>
          <a href="#" class="text-white">Wish</a>
          <a href="#" class="text-white">Feeds</a>
        </div>
        <button class="absolute top-4 right-4 bg-purple-600 py-1 px-3 rounded-full text-sm text-white">Subscribe: 20% Off</button>
      </div>
    </section>

    <!-- Main Content Section -->
    <div class="flex space-x-8 px-8 py-6">
      <!-- Sidebar Services List -->
      <aside class="w-1/4 space-y-6">
        <div v-for="(service, index) in services" :key="index" class="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img :src="service.icon" :alt="service.name" class="w-10 h-10 rounded-full" />
            <div>
              <h3 class="text-sm font-bold">{{ service.name }}</h3>
              <p class="text-gray-400 text-xs">{{ service.price }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Service Detail Content -->
      <section class="w-2/4 space-y-6">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h2 class="text-lg font-semibold">E-Chat</h2>
          <p class="text-yellow-500 text-sm">5.0 • 1759 Served</p>
          <p class="mt-4 text-gray-400 text-sm">
            Indulge in a personal voice call or texting session on Discord with dopa
          </p>
          <p class="text-sm text-gray-400">Styles: Talkative</p>
        </div>

        <!-- Service Types -->
        <div class="bg-gray-800 p-6 rounded-lg space-y-4">
          <h3 class="text-lg font-semibold">Service Types • 4</h3>
          <div v-for="(type, index) in serviceTypes" :key="index" class="flex items-center justify-between bg-gray-700 p-3 rounded-md">
            <span>{{ type.name }}</span>
            <span class="text-purple-500">{{ type.price }}</span>
          </div>
        </div>
      </section>

      <!-- User Profile Actions -->
      <aside class="w-1/4 space-y-6">
        <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
          <img src="./assets/avatar.webp" alt="User Profile" class="w-24 h-24 rounded-full mb-4" />
          <button class="bg-purple-600 py-2 px-4 rounded-full text-sm">Chat</button>
          <button class="bg-purple-500 py-2 px-4 rounded-full text-sm mt-2">Order</button>
          <p class="mt-2 text-gray-400 text-xs text-center">
            Avg. IM Response Time ≤ 5 mins
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      services: [
        { name: "Adding Socials", price: "66.66 / Time", icon: "https://static-oss.epal.gg/data/static/v3/img7_card_AddingSocials_m.png" },
        { name: "E-Chat", price: "66.66 / Time", icon: "https://static-oss.epal.gg/data/static/v3/img7_card_E-Chat_m.png" },
        { name: "Dead by Daylight", price: "6.66 / Game", icon: "https://static-oss.epal.gg/data/static/v2/img7_v2_card_DeadbyDaylight_m.png" },
        // Add more services as needed
      ],
      serviceTypes: [
        { name: "text chat w dopa", price: "66.66 / Time" },
        { name: "voice call w dopa", price: "66.66 / 15Min" },
        { name: "asmr sleep call w dopa", price: "666.66 / 15Min" },
        { name: "daily dose of dopa", price: "76.66 / Time" },
      ],
    };
  },
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
