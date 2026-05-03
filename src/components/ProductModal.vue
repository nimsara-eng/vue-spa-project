<script setup lang="ts">
  import type { Product } from '../type'
  import { useCartStore } from '../stores/cartStore'

  const cart = useCartStore()

  defineProps<{ product: Product | null, isOpen: boolean }>()
  defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4" @click.self="$emit('close')">
        <Transition name="scale">
          <div v-if="isOpen" class="bg-white dark:bg-luxury-surface rounded-2xl w-full max-w-3xl relative overflow-hidden shadow-2xl">
            
            <div class="flex flex-col md:flex-row">
              <!-- Left — Image -->
              <div class="w-full md:w-2/5 bg-gray-100 dark:bg-luxury-black">
                <img :src="product?.thumbnail" class="w-full h-full object-cover max-h-96"/>
              </div>

              <!-- Right — Details -->
              <div class="w-full md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-luxury-gold text-xl">✕</button>
                  
                  <p class="text-luxury-gold text-[10px] font-bold tracking-widest uppercase mb-2">{{ product?.category }} · {{ product?.brand }}</p>
                  <h2 class="text-gray-900 dark:text-luxury-text text-xl font-bold mb-2">{{ product?.title }}</h2>
                  <p class="text-yellow-400 text-sm mb-3">★ {{ product?.rating }}</p>
                  <p class="text-gray-500 dark:text-luxury-muted text-sm leading-relaxed mb-4">{{ product?.description }}</p>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-4">
                    <p class="text-green-600 dark:text-green-400 font-bold text-2xl">${{ product?.price }}</p>
                    <p class="text-gray-400 text-xs">Stock: {{ product?.stock }} left</p>
                  </div>
                  <div class="flex gap-3">
                    <button
                      @click="product && cart.addToCart(product)"
                      class="flex-1 border border-luxury-gold text-luxury-gold py-2.5 rounded-xl hover:bg-luxury-gold hover:text-luxury-black transition-all duration-200 font-semibold text-sm"
                    >Add to Cart</button>
                    <button
                      class="flex-1 bg-luxury-gold text-luxury-black py-2.5 rounded-xl hover:brightness-110 transition-all duration-200 font-semibold text-sm"
                    >Buy Now</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scale-enter-active, .scale-leave-active { transition: all 0.3s ease; }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.9); }
</style>