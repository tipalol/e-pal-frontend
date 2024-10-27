<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center space-x-4">
      <img src="./assets/logo.png" alt="E-Pal Logo" class="h-8" />
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-300 hover:text-white">Play</a>
        <a href="#" class="text-gray-300 hover:text-white">ePals</a>
        <a href="#" class="text-gray-300 hover:text-white">Community</a>
        <a href="#" class="text-gray-300 hover:text-white">App</a>
      </nav>
    </div>
    <div class="flex items-center space-x-4">
      <button class="bg-gray-700 px-4 py-2 rounded-lg">Become an ePal</button>
      <router-link class="text-gray-300 hover:text-white" to="/registration">Log in</router-link>
      <router-link class="bg-purple-500 px-4 py-2 rounded-lg" to="/registration">Sign Up</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
}
</script>