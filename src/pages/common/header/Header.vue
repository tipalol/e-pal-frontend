<template>
  <header class="bg-gradient-to-r from-purple-800 to-purple-700 py-6 px-8 flex items-center justify-between relative">
    <div class="flex items-center space-x-4">
      <img src="./assets/logo.png" alt="E-PAL Logo" class="w-12 h-12" />
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
</template>

<script>
export default {
  name: "Header",
}
</script>