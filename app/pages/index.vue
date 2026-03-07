<template>
  <main class="bg-dark min-h-screen font-inter">
    <AppNav @menu="menuOpen = !menuOpen" />
    <SectionHero />
    <SectionServices />
    <SectionAbout />
    <SectionAircraft />
    <SectionContact />

    <!-- Mobile menu overlay -->
    <Transition name="menu">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex flex-col justify-center px-20"
        @click.self="menuOpen = false"
      >
        <button
          class="absolute top-7 right-20 text-white/50 hover:text-white transition-colors"
          @click="menuOpen = false"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <nav class="space-y-2">
          <a
            v-for="(link, i) in menuLinks"
            :key="link.label"
            :href="link.href"
            class="menu-link block text-[clamp(2.5rem,6vw,5rem)] font-bold text-white/20 hover:text-white transition-colors duration-300 leading-tight tracking-tight"
            :style="{ transitionDelay: `${i * 50}ms` }"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="absolute bottom-12 left-20 flex items-center gap-3">
          <span class="w-2 h-8 bg-brand rounded-[2px]" />
          <span class="text-white font-bold text-lg tracking-[4px]">CELEBI</span>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const menuLinks = [
  { label: 'Intro', href: '#hero' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'Hakkinda', href: '#about' },
  { label: 'Iletisim', href: '#contact' },
]
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
