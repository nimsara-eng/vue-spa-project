<script setup lang="ts">
  import { useAuthStore } from '../stores/authStore'
  import { ref, watch } from 'vue'

  const auth = useAuthStore()
  const props = defineProps<{ isOpen: boolean }>()
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'success', message: string): void
  }>()

  // Form state
  const activeTab = ref<'login' | 'signup'>('login')
  const username = ref('')
  const password = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const signupUsername = ref('')
  const signupPassword = ref('')
  const showPassword = ref(false)
  const showSignupPassword = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  // Clear form when modal closes
  watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
      username.value = ''
      password.value = ''
      firstName.value = ''
      lastName.value = ''
      signupUsername.value = ''
      signupPassword.value = ''
      errorMessage.value = ''
      showPassword.value = false
      showSignupPassword.value = false
      activeTab.value = 'login'
    }
  })

  const handleLogin = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''
      await auth.login(username.value, password.value)
      emit('success', 'signed in successfully')
      emit('close')
    } catch (error) {
      errorMessage.value = 'Invalid username or password'
    } finally {
      isLoading.value = false
    }
  }

  const handleSignup = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''
      await auth.signup(firstName.value, lastName.value, signupUsername.value, signupPassword.value)
      emit('success', 'account created successfully')
      emit('close')
    } catch (error) {
      errorMessage.value = 'Signup failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen">
      <div class="fixed inset-0 bg-black/60 z-[200]" @click="emit('close')"/>
      <div class="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <div class="bg-white dark:bg-luxury-surface rounded-2xl w-full max-w-md p-8 relative">

          <!-- Close button -->
          <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-luxury-gold text-xl">✕</button>

          <!-- Tabs -->
          <div class="flex gap-4 mb-6">
            <button
              @click="activeTab = 'login'; errorMessage = ''"
              :class="['text-sm font-bold tracking-widest uppercase transition-colors duration-200 pb-1',
                activeTab === 'login' ? 'text-luxury-gold border-b-2 border-luxury-gold' : 'text-gray-400']"
            >Login</button>
            <button
              @click="activeTab = 'signup'; errorMessage = ''"
              :class="['text-sm font-bold tracking-widest uppercase transition-colors duration-200 pb-1',
                activeTab === 'signup' ? 'text-luxury-gold border-b-2 border-luxury-gold' : 'text-gray-400']"
            >Sign Up</button>
          </div>

          <!-- LOGIN FORM -->
          <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
            <h2 class="text-gray-900 dark:text-luxury-text text-2xl font-bold mb-6">Welcome Back</h2>

            <div class="mb-4">
              <label class="text-gray-500 dark:text-luxury-muted text-xs font-bold tracking-widest uppercase mb-2 block">Username</label>
              <input
                v-model="username"
                type="text"
                placeholder="Enter your username"
                class="w-full border border-gray-300 dark:border-luxury-gold/40 rounded-lg px-4 py-3 bg-white dark:bg-luxury-black text-gray-900 dark:text-luxury-text focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"
              />
            </div>

            <div class="mb-4">
              <label class="text-gray-500 dark:text-luxury-muted text-xs font-bold tracking-widest uppercase mb-2 block">Password</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="w-full border border-gray-300 dark:border-luxury-gold/40 rounded-lg px-4 py-3 bg-white dark:bg-luxury-black text-gray-900 dark:text-luxury-text focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm pr-12"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-luxury-gold"
                >{{ showPassword ? '🙈' : '👁️' }}</button>
              </div>
            </div>

            <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-luxury-gold text-luxury-black font-bold py-3 rounded-xl hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >{{ isLoading ? 'Logging in...' : 'Login' }}</button>

            <p class="text-gray-400 dark:text-luxury-muted text-xs text-center mt-4">
              Test: <span class="text-luxury-gold">emilys</span> / <span class="text-luxury-gold">emilyspass</span>
            </p>
          </form>

          <!-- SIGNUP FORM -->
          <form v-if="activeTab === 'signup'" @submit.prevent="handleSignup">
            <h2 class="text-gray-900 dark:text-luxury-text text-2xl font-bold mb-6">Create Account</h2>

            <div class="flex gap-3 mb-4">
              <div class="flex-1">
                <label class="text-gray-500 dark:text-luxury-muted text-xs font-bold tracking-widest uppercase mb-2 block">First Name</label>
                <input
                  v-model="firstName"
                  type="text"
                  placeholder="John"
                  class="w-full border border-gray-300 dark:border-luxury-gold/40 rounded-lg px-4 py-3 bg-white dark:bg-luxury-black text-gray-900 dark:text-luxury-text focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"
                />
              </div>
              <div class="flex-1">
                <label class="text-gray-500 dark:text-luxury-muted text-xs font-bold tracking-widest uppercase mb-2 block">Last Name</label>
                <input
                  v-model="lastName"
                  type="text"
                  placeholder="Doe"
                  class="w-full border border-gray-300 dark:border-luxury-gold/40 rounded-lg px-4 py-3 bg-white dark:bg-luxury-black text-gray-900 dark:text-luxury-text focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="text-gray-500 dark:text-luxury-muted text-xs font-bold tracking-widest uppercase mb-2 block">Username</label>
              <input
                v-model="signupUsername"
                type="text"
                placeholder="Choose a username"
                class="w-full border border-gray-300 dark:border-luxury-gold/40 rounded-lg px-4 py-3 bg-white dark:bg-luxury-black text-gray-900 dark:text-luxury-text focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"
              />
            </div>

            <div class="mb-4">
              <label class="text-gray-500 dark:text-luxury-muted text-xs font-bold tracking-widest uppercase mb-2 block">Password</label>
              <div class="relative">
                <input
                  v-model="signupPassword"
                  :type="showSignupPassword ? 'text' : 'password'"
                  placeholder="Choose a password"
                  class="w-full border border-gray-300 dark:border-luxury-gold/40 rounded-lg px-4 py-3 bg-white dark:bg-luxury-black text-gray-900 dark:text-luxury-text focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm pr-12"
                />
                <button
                  type="button"
                  @click="showSignupPassword = !showSignupPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-luxury-gold"
                >{{ showSignupPassword ? '🙈' : '👁️' }}</button>
              </div>
            </div>

            <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-luxury-gold text-luxury-black font-bold py-3 rounded-xl hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >{{ isLoading ? 'Creating account...' : 'Sign Up' }}</button>
          </form>

        </div>
      </div>
    </div>
  </Teleport>
</template>
