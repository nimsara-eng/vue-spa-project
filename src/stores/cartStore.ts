import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../type'

export const useCartStore = defineStore('cart', () => {
  
  // The cart items array — holds all added products
  const cartItems = ref<Product[]>([])

  // Total number of items in cart
  const cartCount = computed(() => cartItems.value.length)

  // Total price of all items
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price, 0).toFixed(2)
  })

  // Add a product to cart
  const addToCart = (product: Product) => {
    cartItems.value.push(product)
  }

  // Remove a product from cart by index
  const removeFromCart = (index: number) => {
    cartItems.value.splice(index, 1)
  }

  // Clear entire cart
  const clearCart = () => {
    cartItems.value = []
  }

  return { cartItems, cartCount, cartTotal, addToCart, removeFromCart, clearCart }
})