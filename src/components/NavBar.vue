<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useTheme } from '../composables/useTheme';
  import { useCartStore } from '../stores/cartStore'
  const cart = useCartStore()
  const cartCount = computed(() => cart.cartCount)
  
  defineProps<{ modelValue: string }>();
  defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'open-cart'): void
  }>();

  const { isDark, toggleTheme } = useTheme();
  const isHidden = ref(false);
  const isHoveredTop = ref(false);
  const lastScrollY = ref(0);

  const handleScroll = () => {
    const currentY = window.scrollY;
    if(currentY > lastScrollY.value && currentY > 80){
      isHidden.value = true;
    } else {
      isHidden.value = false;
    }
    lastScrollY.value = currentY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    isHoveredTop.value = e.clientY < 60;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
  });
</script>

<template>
  <nav :class="['fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between border-b border-luxury-gold/40 backdrop-blur-md transition-all duration-300 bg-white/95 dark:bg-luxury-surface/95',
      (isHidden && !isHoveredTop) ? '-translate-y-full' : 'translate-y-0']">

    <img src="../assets/logo.jpg" alt="logo.jpg" class="h-20 w-auto object-contain cursor-pointer" @click="scrollTo('home')"/>

    <div class="flex items-center gap-8">
      <button @click="scrollTo('home')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Home</button>
      <button @click="scrollTo('features')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Features</button>
      <button @click="scrollTo('about')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">About Us</button>
    </div>

    <div class="relative">
      <input 
        id="search" 
        placeholder=" " 
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="peer border border-luxury-gold/40 bg-transparent text-gray-900 dark:text-luxury-text rounded-lg px-4 pt-5 pb-2 w-52 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"
      />
      <label 
        for="search"
        class="absolute left-3 top-3.5 text-gray-400 dark:text-luxury-muted text-xs transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-luxury-gold peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm pointer-events-none px-1 bg-white dark:bg-luxury-surface"
      >
        Search products
      </label> 
    </div>

    <div class="flex items-center gap-4">
      <button 
        @click="toggleTheme" 
        class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-xl"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>
     <button 
      @click="$emit('open-cart')"
      class="relative text-gray-500 dark:text-luxury-muted text-2xl hover:scale-110 transition-transform duration-200"
    >
      🛒
      <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {{ cartCount }}
      </span>
    </button>
    </div>

  </nav>
</template>