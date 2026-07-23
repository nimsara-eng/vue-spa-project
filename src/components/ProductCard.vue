<script setup lang="ts">
  import type { Product } from '../type';

  defineProps<{ product: Product }>()

  const emit = defineEmits<{
    (e: 'add-to-cart', product: Product): void
    (e: 'buy-now', product: Product): void
  }>()
</script>
<template>
  <div class="bg-gray-100 dark:bg-luxury-surface rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
    <img :src="product.thumbnail" class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="font-bold text-lg text-gray-900 dark:text-luxury-text">{{ product.title }}</h2>
      <p class="text-green-600 dark:text-green-400 font-semibold">$ {{ product.price }}</p>
      <p class="text-yellow-400 dark:text-yellow-400">★ {{ product.rating }}</p>

      <div class="flex gap-2 mt-3">
        <button
          @click.stop="emit('add-to-cart', product)"
          class="flex-1 border border-luxury-gold text-luxury-gold text-xs py-2 rounded-lg hover:bg-luxury-gold hover:text-luxury-black transition-all duration-200 font-semibold"
        >
          Add to Cart
        </button>
        <button 
          @click.stop="emit('buy-now', product)"
          class="flex-1 bg-luxury-gold text-luxury-black text-xs py-2 rounded-lg hover:brightness-110 transition-all duration-200 font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>

  </div>
</template>
