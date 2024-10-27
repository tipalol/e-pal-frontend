<template>
  <header class="w-full p-7 flex justify-between items-center fixed z-50 bg-transparent">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="../assets/logo.png" alt="Logo" class="w-10 h-10">
      <h1 class="text-white text-2xl font-bold ml-2">E-PAL</h1>
    </div>
    <!-- Right-side buttons -->
    <div class="flex items-center space-x-4">
      <button class="bg-purple-500 text-white py-1 px-3 rounded-full hover:bg-purple-600 transition text-sm">Contact Us</button>
      <router-link class="bg-gray-700 rounded-full text-white font-bold hover:text-purple-300 transition p-1" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </router-link>
    </div>
  </header>
</template>
