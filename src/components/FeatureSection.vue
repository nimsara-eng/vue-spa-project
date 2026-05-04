<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { Product } from '../type';

  defineProps<{ product: Product | null }>();

  const sectionRef = ref<HTMLElement | null>(null);
  const isVisible = ref(false);

  const features: { label: string; desc: string }[] = [
   {
    label: 'PREMIUM QUALITY',
    desc: 'Every item is sourced from top-tier brands and verified for authenticity.',
   },
   {
    label: 'FAST DELIVERY',
    desc: 'Lightning-fast shipping to your doorstep, anywhere in the world.',
   },
   {
    label: 'EASY RETURNS',
    desc: 'Hassle-free 30-day returns. No questions asked.',
   },
   {
    label: 'SECURE CHECKOUT',
    desc: 'Your payment info is encrypted and always protected.',
   }
  ]

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisible.value = entry.isIntersecting;
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.value) {
      observer.observe(sectionRef.value);
    }
  });
</script>

<template>
  <div ref="sectionRef" class="relative w-full py-24 bg-gray-50 dark:bg-luxury-black overflow-hidden transition-colors duration-300">
    
    <h2 :class="['text-center text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase mb-16 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']">
      Why Choose Us
    </h2>

    <!-- Mobile layout -->
    <div class="md:hidden flex flex-col items-center gap-8 px-6">
      
      <div :class="['w-36 h-36 rounded-full overflow-hidden border border-luxury-gold/40 transition-all duration-700', isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50']"
        style="animation: float 5s ease-in-out infinite;">
        <img v-if="product" :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full bg-gray-200 dark:bg-luxury-surface flex items-center justify-center text-luxury-gold text-4xl">✦</div>
      </div>

      <div 
        v-for="(feature, index) in features" 
        :key="feature.label"
        :class="['text-center transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']"
        :style="{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }"
      >
        <p class="text-luxury-gold text-[10px] font-bold tracking-[0.2em] mb-1">{{ feature.label }}</p>
        <p class="text-gray-500 dark:text-luxury-muted text-[11px] leading-relaxed max-w-xs mx-auto">{{ feature.desc }}</p>
      </div>

    </div>

    <!-- Desktop layout -->
    <div class="hidden md:flex relative items-center justify-center" style="min-height: 420px;">

      <div :class="['absolute rounded-full border border-luxury-gold/25 transition-all duration-1000', isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0']"
        style="width: 340px; height: 340px;" />

      <div :class="['relative z-10 w-44 h-44 rounded-full overflow-hidden border border-luxury-gold/40 transition-all duration-700', isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50']"
        style="animation: float 5s ease-in-out infinite;">
        <img v-if="product" :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full bg-gray-200 dark:bg-luxury-surface flex items-center justify-center text-luxury-gold text-4xl">✦</div>
      </div>

      <div :class="['absolute text-right w-48 transition-all duration-700 delay-300', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6']"
        style="top: 40px; right: calc(50% + 200px);">
        <p class="text-luxury-gold text-[10px] font-bold tracking-[0.2em] mb-1">{{ features[0]?.label }}</p>
        <p class="text-gray-500 dark:text-luxury-muted text-[11px] leading-relaxed">{{ features[0]?.desc }}</p>
      </div>

      <div :class="['absolute text-left w-48 transition-all duration-700 delay-500', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6']"
        style="top: 40px; left: calc(50% + 200px);">
        <p class="text-luxury-gold text-[10px] font-bold tracking-[0.2em] mb-1">{{ features[1]?.label }}</p>
        <p class="text-gray-500 dark:text-luxury-muted text-[11px] leading-relaxed">{{ features[1]?.desc }}</p>
      </div>

      <div :class="['absolute text-right w-48 transition-all duration-700 delay-700', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6']"
        style="bottom: 40px; right: calc(50% + 200px);">
        <p class="text-luxury-gold text-[10px] font-bold tracking-[0.2em] mb-1">{{ features[2]?.label }}</p>
        <p class="text-gray-500 dark:text-luxury-muted text-[11px] leading-relaxed">{{ features[2]?.desc }}</p>
      </div>

      <div :class="['absolute text-left w-48 transition-all duration-700 delay-1000', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6']"
        style="bottom: 40px; left: calc(50% + 200px);">
        <p class="text-luxury-gold text-[10px] font-bold tracking-[0.2em] mb-1">{{ features[3]?.label }}</p>
        <p class="text-gray-500 dark:text-luxury-muted text-[11px] leading-relaxed">{{ features[3]?.desc }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
</style>