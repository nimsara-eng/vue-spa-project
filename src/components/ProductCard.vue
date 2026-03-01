<script setup lang="ts">
  import type { Product } from '../type';

  defineProps<{ product: Product }>();
</script>
<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
    <img :src="product.thumbnail" class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="font-bold text-lg">{{ product.title }}</h2>
      <p class="text-green-600 font-semibold">$ {{ product.price }}</p>
      <p class="text-yellow-400">★ {{ product.rating }}</p>
    </div>

  </div>
</template>