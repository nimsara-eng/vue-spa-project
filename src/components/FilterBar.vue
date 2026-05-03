<script setup lang="ts">
  import type { Category } from '../type'

  defineProps<{ 
    categories: Category[]
    modelValue: string 
  }>()

  defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
<template>
  <div class="w-full overflow-x-auto px-4 py-4">
    <div class="flex gap-3 min-w-max mx-auto">
      
      <!-- All button -->
      <button
        @click="$emit('update:modelValue', '')"
        :class="[
          'px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200',
          modelValue === '' 
            ? 'bg-luxury-gold text-luxury-black' 
            : 'border border-luxury-gold/40 text-gray-500 dark:text-luxury-muted hover:border-luxury-gold'
        ]"
      >All</button>

      <!-- Category buttons -->
      <button
        v-for="category in categories"
        :key="category.slug"
        @click="$emit('update:modelValue', category.slug)"
        :class="[
          'px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200',
          modelValue === category.slug 
            ? 'bg-luxury-gold text-luxury-black' 
            : 'border border-luxury-gold/40 text-gray-500 dark:text-luxury-muted hover:border-luxury-gold'
        ]"
      >{{ category.name }}</button>

    </div>
  </div>
</template>