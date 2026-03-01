<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import type { Product } from './type';
  import NavBar from './components/NavBar.vue';
  import ProductCard from './components/ProductCard.vue';

  const products = ref<Product[]>([]);
  const FetchProducts = async () => {
    try{
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      products.value = data.products;

    }catch(error){
      console.error('Error fetching error:', error)
    }
  };
  onMounted(() => {
    console.log('App component mounted');
    FetchProducts();
  })
</script>
<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <NavBar/>
      <div class="grid grid-cols-4 gap-4 p-4">
        <ProductCard 
          v-for="product in products" 
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>