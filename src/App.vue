<script setup lang="ts">
  import {ref, onMounted, computed} from 'vue';
  import type { Product } from './type';
  import NavBar from './components/NavBar.vue';
  import ProductCard from './components/ProductCard.vue';
  import FeatureSection from './components/FeatureSection.vue';
  import Toast from './components/Toast.vue';
  import type { ToastItem } from './components/Toast.vue';

  const products = ref<Product[]>([]);
  const searchQuery = ref('');
  const toasts = ref<ToastItem[]>([]);
  const cartItems = ref<Product[]>([]);

  let toastId = 0; 
  const showToast = (message: string) => {
    const id = ++toastId;
    toasts.value.push({ id, message });
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, 3000);
  };
  const handleAddToCart = (product: Product) => {
    cartItems.value.push(product);
    console.log(`Added to cart: ${product.title}`);
    showToast(`Added to cart: ${product.title}`);
  };
  const handleBuyNow = (product: Product) => {
    console.log(`Buying: ${product.title}`);
    showToast(`Purchasing: ${product.title}`);
  };
  const fetchProducts = async () => {
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
    fetchProducts();
  })
  const filteredProducts =computed(() => {
    return products.value.filter(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  const featuredProduct = computed(() => products.value[0] ?? null);
</script>
<template>
  <div>
    <div class="min-h-screen bg-luxury-black">
      <NavBar v-model="searchQuery"/>
      <section id="home" class="pt-28 pb-16 px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
            @buy-now="handleBuyNow"
          />
        </div>
      </section>
      
      <section id="features" >
        <FeatureSection :product="featuredProduct" />
      </section>

      <section id="about" class="py-24 px-6">
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Story</p>
          <h2 class="text-luxury-text text-3xl font-bold mb-8">About Us</h2>
          <div class="w-12 h-px bg-luxury-gold mx-auto mb-10" />
          <p class="text-luxury-text text-base leading-relaxed mb-6">We are a premium marketplace dedicated to bringing you the finest products from around the world.
          Our curated collection spans technology, lifestyle, beauty, and beyond.
          </p>
          <div class="grid grid-cols-3 gap-6 mt-12">
            <div class="border border-luxury-gold/20 rounded-xl p-6">
              <p class="text-luxury-gold text-2xl font-bold mb-1">200+</p>
              <p class="text-luxury-muted text-xs tracking-widest uppercase">Products</p>
            </div>
            <div class="border border-luxury-gold/20 rounded-xl p-6">
              <p class="text-luxury-gold text-2xl font-bold mb-1">50k+</p>
              <p class="text-luxury-muted text-xs tracking-widest uppercase">Customers</p>
            </div>
            <div class="border border-luxury-gold/20 rounded-xl p-6">
              <p class="text-luxury-gold text-2xl font-bold mb-1">4.8★</p>
              <p class="text-luxury-muted text-xs tracking-widest uppercase">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>
      <Toast :toasts="toasts"/>
      
    </div>
  </div>
</template>