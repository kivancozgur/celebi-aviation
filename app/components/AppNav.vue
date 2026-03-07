<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 h-20"
    :class="{ 'nav-scrolled': isScrolled }"
  >
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <img
        src="https://www.celebiaviation.com/themes/custom/celebi/logo.svg"
        alt="Celebi Aviation"
        class="h-8 w-auto transition-all duration-300"
        :class="isScrolled ? '' : 'brightness-0 invert'"
      />
    </NuxtLink>

    <!-- Nav Links -->
    <ul class="hidden md:flex items-center gap-12">
      <li v-for="link in links" :key="link.key">
        <a
          :href="link.href"
          class="nav-link text-[13px] tracking-[0.5px] transition-colors duration-300"
          :class="isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/85 hover:text-white'"
        >
          {{ $t(link.key) }}
        </a>
      </li>
    </ul>

    <!-- Right Side -->
    <div class="flex items-center gap-6">
      <!-- Utility links -->
      <div
        class="hidden md:flex items-center gap-5 mr-4 pr-5 border-r transition-colors duration-300"
        :class="isScrolled ? 'border-gray-200' : 'border-white/20'"
      >
        <!-- Kayıp Eşya Takibi -->
        <a
          href="#"
          class="flex items-center gap-1.5 text-xs tracking-wide transition-colors group"
          :class="isScrolled ? 'text-gray-400 hover:text-gray-700' : 'text-white/60 hover:text-white'"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span class="hidden lg:inline">{{ $t('nav.lostItem') }}</span>
        </a>
        <!-- Kargo Takibi -->
        <a
          href="#"
          class="flex items-center gap-1.5 text-xs tracking-wide transition-colors group"
          :class="isScrolled ? 'text-gray-400 hover:text-gray-700' : 'text-white/60 hover:text-white'"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <span class="hidden lg:inline">{{ $t('nav.cargoTracking') }}</span>
        </a>
      </div>

      <!-- Language switcher -->
      <div
        class="text-xs font-medium tracking-[1px] hidden md:flex items-center gap-1 transition-colors duration-300"
        :class="isScrolled ? 'text-gray-700' : 'text-white'"
      >
        <button @click="setLocale('tr')" :class="locale === 'tr' ? 'opacity-100' : 'opacity-40'" class="transition-opacity duration-200 cursor-pointer">TR</button>
        <span class="opacity-30">/</span>
        <button @click="setLocale('en')" :class="locale === 'en' ? 'opacity-100' : 'opacity-40'" class="transition-opacity duration-200 cursor-pointer">EN</button>
      </div>

      <!-- Hamburger -->
      <button
        class="flex flex-col gap-[6px] group cursor-pointer"
        aria-label="Menu"
        @click="$emit('menu')"
      >
        <span class="w-7 h-[2px] transition-all duration-300 group-hover:w-5" :class="isScrolled ? 'bg-gray-800' : 'bg-white'" />
        <span class="w-5 h-[2px] transition-all duration-300 group-hover:w-7" :class="isScrolled ? 'bg-gray-800' : 'bg-white'" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineEmits<{ menu: [] }>()

const { locale, setLocale } = useI18n()

const navRef = ref<HTMLElement>()
const isScrolled = ref(false)

const links = [
  { key: 'nav.services', href: '#services' },
  { key: 'nav.aircraft', href: '#aircraft' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
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
  transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
  background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%);
}

nav.nav-scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
