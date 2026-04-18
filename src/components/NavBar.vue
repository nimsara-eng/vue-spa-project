<script setup lang="ts">

  import{ ref, onMounted, onUnmounted} from 'vue';
  defineProps<{ modelValue: string }>();
  defineEmits<{(e: 'update:modelValue', value: string): void}>();

  const isHidden = ref(false);
  const isHoveredTop = ref(false);
  const lastScrollY = ref(0);

  const handleScroll = () =>{
    const currentY = window.scrollY;
    if(currentY > lastScrollY.value && currentY > 80){
      isHidden.value = true;
    }else{
      isHidden.value = false;
    }
    lastScrollY.value = currentY;
  };
  const handleMouseMove = (e: MouseEvent) =>{
    isHoveredTop.value = e.clientY < 60;
  };
  const scrollTo = (id: string) =>{
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  };

  onMounted(()=>{
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  });

  onUnmounted(()=>{
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
  });

</script>
<template>
  <nav  :class ="['fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between border-b border-luxury-gold/40 backdrop-blur-md transition-transform duration-300 bg-luxury-surface/95',
      (isHidden && !isHoveredTop) ? '-translate-y-full' : 'translate-y-0']">
    <img src="../assets/logo.jpg" alt="logo.jpg" class="h-20 w-auto object-contain cursor-pointer" @click="scrollTo('home')"/>

    <div class="flex items-center gap-8">
      <button @click="scrollTo('home')" class="text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Home</button>
      <button @click="scrollTo('features')" class="text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">Features</button>
      <button @click="scrollTo('about')" class="text-luxury-muted hover:text-luxury-gold transition-colors duration-200 text-sm font-semibold tracking-widest uppercase">About Us</button>
    </div>
    <div class="relative">
      <input 
        id="search" 
        placeholder=" " 
        :value ="modelValue"
        @input ="$emit('update:modelValue', ($event.target as HTMLInputElement).value) "
        class="peer border border-luxury-gold/40 bg-luxury-black text-luxury-text rounded-lg px-4 pt-5 pb-2 w-52 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm"

      />
      <label 
        for="search"
        class="absolute left-4 top-3.5 text-luxury-muted text-xs transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-luxury-gold peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm bg-luxury-black px-1 pointer-events-none"
      >
      Search products
      </label> 

    </div>
    <button class="text-2xl hover:scale-110 transition-transform duration-200">
      🛒
    </button>
  </nav>

</template>