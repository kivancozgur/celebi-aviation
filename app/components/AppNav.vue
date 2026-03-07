<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 h-20"
    :class="{ 'nav-scrolled': isScrolled }"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <span class="w-2 h-8 bg-brand rounded-[2px]" />
      <span class="text-white font-bold text-lg tracking-[4px]">CELEBI</span>
    </div>

    <!-- Nav Links -->
    <ul class="hidden md:flex items-center gap-12">
      <li v-for="link in links" :key="link.label">
        <a
          :href="link.href"
          class="nav-link text-white/50 hover:text-white text-[13px] tracking-[0.5px] transition-colors duration-300"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>

    <!-- Right Side -->
    <div class="flex items-center gap-6">
      <span class="text-white/40 text-xs font-medium tracking-[1px] hidden md:block">TR / EN</span>
      <button
        class="flex flex-col gap-[6px] group cursor-pointer"
        aria-label="Menu"
        @click="$emit('menu')"
      >
        <span class="w-7 h-[2px] bg-white transition-all duration-300 group-hover:w-5" />
        <span class="w-5 h-[2px] bg-white transition-all duration-300 group-hover:w-7" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineEmits<{ menu: [] }>()

const navRef = ref<HTMLElement>()
const isScrolled = ref(false)

const links = [
  { label: 'Intro', href: '#hero' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'Hakkinda', href: '#about' },
  { label: 'Iletisim', href: '#contact' },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Entrance animation
  gsap.from(navRef.value!, {
    y: -80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.3,
  })

  // Nav background on scroll
  ScrollTrigger.create({
    start: 100,
    onEnter: () => (isScrolled.value = true),
    onLeaveBack: () => (isScrolled.value = false),
  })
})
</script>

<style scoped>
nav {
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}

nav.nav-scrolled {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
