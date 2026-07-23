<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useTheme } from '../composables/useTheme';
  import { useCartStore } from '../stores/cartStore'
  import { useAuthStore } from '../stores/authStore'

  const auth = useAuthStore()
  const cart = useCartStore()
  const cartCount = computed(() => cart.cartCount)
  const isProfileOpen = ref(false)
  const profileRef = ref<HTMLElement | null>(null)
  const isMenuOpen = ref(false)

  defineProps<{ modelValue: string }>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'open-cart'): void
    (e: 'open-login'): void
    (e: 'open-profile'): void
    (e: 'open-orders'): void
    (e: 'open-settings'): void
    (e: 'logout'): void
  }>();

  const { isDark, toggleTheme } = useTheme();
  const isHidden = ref(false);
  const isHoveredTop = ref(false);
  const lastScrollY = ref(0);

  const handleScroll = () => {
    const currentY = window.scrollY;
    isHidden.value = currentY > lastScrollY.value && currentY > 80;
    lastScrollY.value = currentY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    isHoveredTop.value = e.clientY < 60;
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (!isProfileOpen.value || !profileRef.value) return

    const target = e.target as Node
    if (!profileRef.value.contains(target)) {
      isProfileOpen.value = false
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    isMenuOpen.value = false;
  };

  const handleProfileMenu = (action: 'profile' | 'orders' | 'settings' | 'logout') => {
    isProfileOpen.value = false

    if (action === 'profile') emit('open-profile')
    if (action === 'orders') emit('open-orders')
    if (action === 'settings') emit('open-settings')
    if (action === 'logout') emit('logout')
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleDocumentClick);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleDocumentClick);
  });
</script>

<template>
  <nav :class="['fixed top-0 left-0 right-0 z-50 border-b border-luxury-gold/40 backdrop-blur-md transition-all duration-300 bg-white/95 dark:bg-luxury-surface/95',
      (isHidden && !isHoveredTop) ? '-translate-y-full' : 'translate-y-0']">

    <div class="px-6 py-3 flex items-center justify-between">
      <img
        src="../assets/logo.jpg"
        alt="logo"
        class="h-16 w-auto object-contain cursor-pointer"
        @click="scrollTo('home')"
      />

      <div class="hidden md:flex items-center gap-8">
        <button @click="scrollTo('home')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Home</button>
        <button @click="scrollTo('features')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Features</button>
        <button @click="scrollTo('about')" class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">About Us</button>
      </div>

      <div class="hidden md:block relative">
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
        >Search products</label>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="toggleTheme"
          class="text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-xl"
          aria-label="Toggle theme"
        >{{ isDark ? '☀️' : '🌙' }}</button>

        <button
          @click="emit('open-cart')"
          class="relative text-gray-500 dark:text-luxury-muted text-2xl hover:scale-110 transition-transform duration-200"
          aria-label="Open cart"
        >
          🛒
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {{ cartCount }}
          </span>
        </button>

        <button
          v-if="!auth.isLoggedIn"
          @click="emit('open-login')"
          class="hidden md:block text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase"
        >Login</button>

        <div v-if="auth.isLoggedIn" ref="profileRef" class="relative">
          <button
            @click="isProfileOpen = !isProfileOpen"
            class="w-9 h-9 rounded-full bg-luxury-gold text-luxury-black font-bold text-sm flex items-center justify-center hover:brightness-110 transition-all duration-200"
            aria-label="Open profile menu"
          >
            {{ auth.user?.firstName?.[0] }}{{ auth.user?.lastName?.[0] }}
          </button>

          <div
            v-if="isProfileOpen"
            class="absolute right-0 top-12 w-56 bg-white dark:bg-luxury-surface rounded-xl shadow-2xl border border-luxury-gold/20 z-50 overflow-hidden"
          >
            <div class="px-4 py-3 border-b border-luxury-gold/20">
              <p class="text-gray-900 dark:text-luxury-text font-bold text-sm">{{ auth.user?.firstName }} {{ auth.user?.lastName }}</p>
              <p class="text-gray-500 dark:text-luxury-muted text-xs">@{{ auth.user?.username }}</p>
            </div>
            <div class="py-1">
              <button
                @click="handleProfileMenu('profile')"
                class="w-full text-left px-4 py-2 text-gray-700 dark:text-luxury-muted hover:bg-gray-50 dark:hover:bg-luxury-black text-sm transition-colors duration-200"
              >👤 My Profile</button>
              <button
                @click="handleProfileMenu('orders')"
                class="w-full text-left px-4 py-2 text-gray-700 dark:text-luxury-muted hover:bg-gray-50 dark:hover:bg-luxury-black text-sm transition-colors duration-200"
              >📦 My Orders</button>
              <button
                @click="handleProfileMenu('settings')"
                class="w-full text-left px-4 py-2 text-gray-700 dark:text-luxury-muted hover:bg-gray-50 dark:hover:bg-luxury-black text-sm transition-colors duration-200"
              >⚙️ Settings</button>
              <div class="border-t border-luxury-gold/20 mt-1"/>
              <button
                @click="handleProfileMenu('logout')"
                class="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 dark:hover:bg-luxury-black text-sm transition-colors duration-200"
              >🚪 Logout</button>
            </div>
          </div>
        </div>

        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-2xl"
          aria-label="Toggle menu"
        >{{ isMenuOpen ? '✕' : '☰' }}</button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden border-t border-luxury-gold/20 px-6 py-4 flex flex-col gap-4 bg-white/95 dark:bg-luxury-surface/95">
      <input
        placeholder="Search products..."
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full border border-luxury-gold/40 bg-transparent text-gray-900 dark:text-luxury-text rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"
      />

      <button @click="scrollTo('home')" class="text-left text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Home</button>
      <button @click="scrollTo('features')" class="text-left text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Features</button>
      <button @click="scrollTo('about')" class="text-left text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">About Us</button>

      <button
        v-if="!auth.isLoggedIn"
        @click="emit('open-login'); isMenuOpen = false"
        class="text-left text-gray-500 dark:text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase"
      >Login</button>
    </div>
  </nav>
</template>
