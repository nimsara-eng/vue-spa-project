<script setup lang="ts"></script>
<template>
  <nav class="bg-white shadow-md px-6 py-4 flex items-center justify-between ">
    <img src="../assets/logo.png" alt="logo.png" class="h-32 w-auto">
    <div class="relative">
      <input 
        id="search" 
        placeholder=" " 
        class="peer border border-gray-300 rounded-lg px-4 pt-5 pb-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-400" 
      />
      <label 
        for="search"
        class="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm bg-white px-1"
      >
      Search products
      </label> 

    </div>
    <button class="text-2xl hover:scale-110 transition-transform duration-200">
      🛒
    </button>
  </nav>
</template>