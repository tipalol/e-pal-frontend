<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans">
    <!-- Header Section -->
    <header class="bg-purple-800 py-4 px-6 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <img src="./assets/avatar.jpg" alt="User Avatar" class="w-12 h-12 rounded-full" />
        <div>
          <h1 class="text-xl font-bold">Valyra</h1>
          <p class="text-sm text-gray-300">Deutsch/English</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 text-sm">
        <span class="bg-green-500 rounded-full w-3 h-3"></span>
        <span>Online</span>
        <span class="text-gray-400">•</span>
        <span>ePal 2</span>
      </div>
    </header>

    <!-- Main Content Section -->
    <div class="flex space-x-6 px-6 py-4">
      <!-- Sidebar -->
      <aside class="w-1/4 space-y-6">
        <nav class="space-y-4">
          <div class="bg-gray-800 p-4 rounded-lg">
            <h2 class="text-sm font-bold">Like Service</h2>
            <button class="text-purple-500 mt-2">Bestellung kostenlos</button>
          </div>

          <div class="bg-gray-800 p-4 rounded-lg space-y-2">
            <h2 class="text-sm font-bold">Counter-Strike 2</h2>
            <p class="text-gray-400 text-xs">€2.00/Spiel</p>
          </div>

          <div class="bg-gray-800 p-4 rounded-lg space-y-2">
            <h2 class="text-sm font-bold">Minecraft</h2>
            <p class="text-gray-400 text-xs">€4.00/Stunde</p>
          </div>

          <div class="bg-gray-800 p-4 rounded-lg space-y-2">
            <h2 class="text-sm font-bold">E-Chat</h2>
            <p class="text-gray-400 text-xs">€5.00/30 Min.</p>
          </div>
        </nav>
      </aside>

      <!-- Main Profile Content -->
      <section class="w-2/4 space-y-6">
        <!-- Game Card -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h2 class="text-lg font-semibold">Counter-Strike 2</h2>
          <div class="mt-4">
            <img src="./assets/hero_banner.webp" alt="Counter-Strike" class="w-full rounded-lg" />
          </div>
          <p class="mt-4 text-gray-400 text-sm">
            Ready to level up your CS2 experience? Let's team up and dominate the virtual battlefield together!
            🌟 Preferring Duo-Queue!
          </p>
          <div class="flex items-center space-x-2 mt-4 text-sm">
            <span class="text-gray-500">Rang</span>
            <span class="text-white">Silver</span>
            <span class="text-gray-500">•</span>
            <span class="text-white">Europe/EU West</span>
          </div>
        </div>

        <!-- Service Types -->
        <div class="bg-gray-800 p-6 rounded-lg space-y-4">
          <h3 class="text-lg font-semibold">Dienstarten - 3</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span>Duo Queue MM</span>
              <span class="text-purple-500">€3.00/Spiel</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Wingman</span>
              <span class="text-purple-500">€2.00/Spiel</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Group-Queue MM</span>
              <span class="text-purple-500">€7.00/Spiel</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Profile Settings Section -->
      <aside class="w-1/4 space-y-6">
        <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
          <img src="./assets/avatar.jpg" alt="User Profile" class="w-24 h-24 rounded-full mb-4" />
          <button class="bg-purple-600 py-2 px-4 rounded-full text-sm">Dienste-Einstellungen</button>
          <p class="mt-2 text-gray-400 text-xs text-center">
            Durchschnittl. IM Reaktionszeit 5-10 Minuten
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
