<script setup lang="ts">
  import { useCartStore } from '../stores/cartStore';
  const cart = useCartStore();

  defineProps<{ isOpen: boolean }>();
  defineEmits<{
     (e: 'close'): void 
     (e: 'checkout'): void
     }>();
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-black/50 z-[100]"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide">
      <div 
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-96 bg-white dark:bg-luxury-surface z-[101] flex flex-col shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-luxury-gold/30">
          <h2 class="text-gray-900 dark:text-luxury-text font-bold text-lg">Your Cart</h2>
          <button @click="$emit('close')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold text-2xl">✕</button>
        </div>

        <!-- Empty state -->
        <div v-if="cart.cartItems.length === 0" class="flex-1 flex flex-col items-center justify-center gap-4">
          <p class="text-5xl">🛒</p>
          <p class="text-gray-500 dark:text-luxury-muted">Your cart is empty</p>
        </div>

        <!-- Cart items -->
        <div v-else class="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          <div 
            v-for="(item, index) in cart.cartItems" 
            :key="index"
            class="flex gap-4 items-center border-b border-luxury-gold/20 pb-4"
          >
            <img :src="item.thumbnail" class="w-16 h-16 object-cover rounded-lg"/>
            <div class="flex-1">
              <p class="text-gray-900 dark:text-luxury-text font-semibold text-sm">{{ item.title }}</p>
              <p class="text-luxury-gold font-bold">$ {{ item.price }}</p>
            </div>
            <button 
              @click="cart.removeFromCart(index)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >✕</button>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cart.cartItems.length > 0" class="px-6 py-4 border-t border-luxury-gold/30">
          <div class="flex justify-between mb-4">
            <p class="text-gray-500 dark:text-luxury-muted">Total</p>
            <p class="text-luxury-gold font-bold text-lg">${{ cart.cartTotal }}</p>
          </div>
          <button 
          @click="$emit('checkout')"
          class="w-full bg-luxury-gold text-luxury-black font-bold py-3 rounded-xl hover:brightness-110 transition-all duration-200">
            Checkout
          </button>
          <button 
            @click="cart.clearCart()"
            class="w-full mt-2 border border-luxury-gold/40 text-gray-500 dark:text-luxury-muted font-semibold py-3 rounded-xl hover:border-luxury-gold transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>