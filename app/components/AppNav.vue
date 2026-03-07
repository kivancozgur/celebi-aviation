<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 h-20"
    :class="{ 'nav-scrolled': isScrolled }"
  >
    <!-- Logo (KAN-16) — kurumsal placeholder, gerçek logo marka ekibinden gelecek -->
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- C harfi + kanat formu — kurumsal placeholder -->
        <circle cx="16" cy="16" r="15" stroke="#003DA5" stroke-width="1.5"/>
        <path d="M20 10.5C18.5 9.5 16.8 9 15 9C11.134 9 8 12.134 8 16C8 19.866 11.134 23 15 23C16.8 23 18.5 22.5 20 21.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 13L22 10L19 16L22 22L12 19" stroke="#003DA5" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>
      <span class="text-white font-bold text-lg tracking-tight">ÇELEBİ</span>
    </NuxtLink>

    <!-- Nav Links -->
    <ul class="hidden md:flex items-center gap-12">
      <li v-for="link in links" :key="link.key">
        <a
          :href="link.href"
          class="nav-link text-white/50 hover:text-white text-[13px] tracking-[0.5px] transition-colors duration-300"
        >
          {{ $t(link.key) }}
        </a>
      </li>
    </ul>

    <!-- Right Side -->
    <div class="flex items-center gap-6">
      <!-- Utility links (KAN-15) — sadece md ve üzeri -->
      <div class="hidden md:flex items-center gap-5 mr-4 border-r border-white/10 pr-5">
        <!-- Kayıp Eşya Takibi -->
        <a href="#" class="flex items-center gap-1.5 text-white/40 hover:text-white text-xs tracking-wide transition-colors group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span class="hidden lg:inline">{{ $t('nav.lostItem') }}</span>
        </a>
        <!-- Kargo Takibi -->
        <a href="#" class="flex items-center gap-1.5 text-white/40 hover:text-white text-xs tracking-wide transition-colors group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <span class="hidden lg:inline">{{ $t('nav.cargoTracking') }}</span>
        </a>
      </div>
      <div class="text-white text-xs font-medium tracking-[1px] hidden md:flex items-center gap-1">
        <button @click="setLocale('tr')" :class="locale === 'tr' ? 'opacity-100' : 'opacity-40'" class="transition-opacity duration-200 cursor-pointer">TR</button>
        <span class="opacity-30">/</span>
        <button @click="setLocale('en')" :class="locale === 'en' ? 'opacity-100' : 'opacity-40'" class="transition-opacity duration-200 cursor-pointer">EN</button>
      </div>
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
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}

nav.nav-scrolled {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
