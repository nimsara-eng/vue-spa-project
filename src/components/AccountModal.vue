<script setup lang="ts">
  import { computed } from 'vue'
  import { useAuthStore } from '../stores/authStore'
  import { useCartStore } from '../stores/cartStore'
  import { useTheme } from '../composables/useTheme'

  type AccountView = 'profile' | 'orders' | 'settings'

  const props = defineProps<{
    isOpen: boolean
    activeView: AccountView
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'change-view', view: AccountView): void
    (e: 'logout'): void
  }>()

  const auth = useAuthStore()
  const cart = useCartStore()
  const { isDark, toggleTheme } = useTheme()

  const title = computed(() => {
    if (props.activeView === 'orders') return 'My Orders'
    if (props.activeView === 'settings') return 'Settings'
    return 'My Profile'
  })
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen">
      <div class="fixed inset-0 bg-black/60 z-[210]" @click="emit('close')" />
      <div class="fixed inset-0 z-[211] flex items-center justify-center p-4">
        <div class="bg-white dark:bg-luxury-surface rounded-2xl w-full max-w-2xl relative shadow-2xl overflow-hidden">
          <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-luxury-gold text-xl">✕</button>

          <div class="border-b border-luxury-gold/20 px-6 pt-6">
            <p class="text-luxury-gold text-xs font-bold tracking-[0.25em] uppercase mb-2">Account</p>
            <h2 class="text-gray-900 dark:text-luxury-text text-2xl font-bold mb-5">{{ title }}</h2>

            <div class="flex gap-2 overflow-x-auto">
              <button
                @click="emit('change-view', 'profile')"
                :class="[
                  'px-4 py-2 text-xs font-bold tracking-widest uppercase border-b-2 transition-colors duration-200',
                  activeView === 'profile' ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-400 hover:text-luxury-gold'
                ]"
              >Profile</button>
              <button
                @click="emit('change-view', 'orders')"
                :class="[
                  'px-4 py-2 text-xs font-bold tracking-widest uppercase border-b-2 transition-colors duration-200',
                  activeView === 'orders' ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-400 hover:text-luxury-gold'
                ]"
              >Orders</button>
              <button
                @click="emit('change-view', 'settings')"
                :class="[
                  'px-4 py-2 text-xs font-bold tracking-widest uppercase border-b-2 transition-colors duration-200',
                  activeView === 'settings' ? 'border-luxury-gold text-luxury-gold' : 'border-transparent text-gray-400 hover:text-luxury-gold'
                ]"
              >Settings</button>
            </div>
          </div>

          <div class="p-6">
            <div v-if="activeView === 'profile'" class="space-y-5">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-luxury-gold text-luxury-black flex items-center justify-center text-xl font-bold">
                  {{ auth.user?.firstName?.[0] }}{{ auth.user?.lastName?.[0] }}
                </div>
                <div>
                  <p class="text-gray-900 dark:text-luxury-text text-lg font-bold">{{ auth.user?.firstName }} {{ auth.user?.lastName }}</p>
                  <p class="text-gray-500 dark:text-luxury-muted text-sm">@{{ auth.user?.username }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="border border-luxury-gold/20 rounded-xl p-4">
                  <p class="text-gray-400 text-xs tracking-widest uppercase mb-1">First Name</p>
                  <p class="text-gray-900 dark:text-luxury-text font-semibold">{{ auth.user?.firstName || 'Not set' }}</p>
                </div>
                <div class="border border-luxury-gold/20 rounded-xl p-4">
                  <p class="text-gray-400 text-xs tracking-widest uppercase mb-1">Last Name</p>
                  <p class="text-gray-900 dark:text-luxury-text font-semibold">{{ auth.user?.lastName || 'Not set' }}</p>
                </div>
                <div class="border border-luxury-gold/20 rounded-xl p-4">
                  <p class="text-gray-400 text-xs tracking-widest uppercase mb-1">Username</p>
                  <p class="text-gray-900 dark:text-luxury-text font-semibold">{{ auth.user?.username || 'Not set' }}</p>
                </div>
                <div class="border border-luxury-gold/20 rounded-xl p-4">
                  <p class="text-gray-400 text-xs tracking-widest uppercase mb-1">Email</p>
                  <p class="text-gray-900 dark:text-luxury-text font-semibold break-all">{{ auth.user?.email || 'Not set' }}</p>
                </div>
              </div>
            </div>

            <div v-if="activeView === 'orders'" class="space-y-4">
              <div v-if="cart.cartItems.length === 0" class="border border-luxury-gold/20 rounded-xl p-8 text-center">
                <p class="text-gray-900 dark:text-luxury-text font-bold mb-2">No orders yet</p>
                <p class="text-gray-500 dark:text-luxury-muted text-sm">Your completed orders will appear here inside this app.</p>
              </div>

              <div v-else>
                <p class="text-gray-500 dark:text-luxury-muted text-sm mb-4">Items currently ready for checkout:</p>
                <div class="space-y-3 max-h-72 overflow-y-auto pr-1">
                  <div
                    v-for="(item, index) in cart.cartItems"
                    :key="index"
                    class="flex items-center gap-4 border border-luxury-gold/20 rounded-xl p-3"
                  >
                    <img :src="item.thumbnail" class="w-14 h-14 object-cover rounded-lg" :alt="item.title" />
                    <div class="flex-1">
                      <p class="text-gray-900 dark:text-luxury-text font-semibold text-sm">{{ item.title }}</p>
                      <p class="text-luxury-gold font-bold">$ {{ item.price }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeView === 'settings'" class="space-y-4">
              <div class="flex items-center justify-between gap-4 border border-luxury-gold/20 rounded-xl p-4">
                <div>
                  <p class="text-gray-900 dark:text-luxury-text font-bold">Dark Mode</p>
                  <p class="text-gray-500 dark:text-luxury-muted text-sm">Switch the store appearance.</p>
                </div>
                <button
                  @click="toggleTheme"
                  class="min-w-24 bg-luxury-gold text-luxury-black font-bold py-2 px-4 rounded-xl hover:brightness-110 transition-all duration-200"
                >{{ isDark ? 'Light' : 'Dark' }}</button>
              </div>

              <div class="flex items-center justify-between gap-4 border border-luxury-gold/20 rounded-xl p-4">
                <div>
                  <p class="text-gray-900 dark:text-luxury-text font-bold">Session</p>
                  <p class="text-gray-500 dark:text-luxury-muted text-sm">Sign out from this account.</p>
                </div>
                <button
                  @click="emit('logout')"
                  class="min-w-24 border border-red-500 text-red-500 font-bold py-2 px-4 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200"
                >Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
