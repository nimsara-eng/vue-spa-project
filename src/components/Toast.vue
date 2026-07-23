<script setup lang="ts">
  export interface ToastItem {
    id: number;
    message: string;
    type?: 'success' | 'info';
  }

  defineProps<{ toasts: ToastItem[] }>();
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-8 right-8 z-[999] flex flex-col-reverse gap-3 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'px-5 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-3 pointer-events-auto min-w-[260px] border',
            toast.type === 'success'
              ? 'bg-green-600 text-white border-green-400'
              : 'bg-luxury-gold text-luxury-black border-luxury-gold'
          ]"
        >
          <span class="flex h-5 w-5 items-center justify-center rounded-full bg-white text-green-600 text-xs">✓</span>
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
  .toast-enter-active {
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .toast-leave-active {
    transition: all 0.25s ease-in;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
</style>
