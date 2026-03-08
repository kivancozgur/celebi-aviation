<template>
  <nav ref="navRef" class="nav-root fixed top-0 left-0 right-0 z-50">
    <!-- Top utility bar -->
    <div class="utility-bar hidden md:flex items-center justify-end gap-6 px-8 lg:px-20 h-9 border-b border-gray-100 text-[11px] text-gray-400 tracking-wide overflow-hidden">
      <a href="#" class="hover:text-brand transition-colors flex items-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        {{ $t('nav.lostItem') }}
      </a>
      <span class="w-px h-3 bg-gray-200" />
      <a href="#" class="hover:text-brand transition-colors flex items-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        {{ $t('nav.cargoTracking') }}
      </a>
      <span class="w-px h-3 bg-gray-200" />
      <div class="flex items-center gap-1 font-medium tracking-[1.5px]">
        <button @click="setLocale('tr')" :class="locale === 'tr' ? 'text-gray-900' : 'text-gray-300'" class="transition-colors cursor-pointer hover:text-gray-900">TR</button>
        <span class="text-gray-200">/</span>
        <button @click="setLocale('en')" :class="locale === 'en' ? 'text-gray-900' : 'text-gray-300'" class="transition-colors cursor-pointer hover:text-gray-900">EN</button>
      </div>
    </div>

    <!-- Main nav bar -->
    <div class="main-bar flex items-center justify-between px-6 md:px-8 lg:px-20 h-16 bg-white border-b border-gray-100">
      <!-- Logo -->
      <NuxtLink to="/" class="flex-none">
        <img
          src="https://www.celebiaviation.com/themes/custom/celebi/logo.svg"
          alt="Celebi Aviation"
          class="h-7 w-auto"
        />
      </NuxtLink>

      <!-- Desktop links -->
      <ul class="hidden lg:flex items-center h-full">
        <li
          v-for="link in links"
          :key="link.key"
          class="relative h-full flex items-center group"
        >
          <NuxtLink
            :to="link.to"
            class="flex items-center gap-1 px-4 h-full text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors relative"
            active-class="text-gray-900"
          >
            {{ $t(link.key) }}
            <svg v-if="link.children" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="mt-px opacity-40 group-hover:opacity-80 group-hover:translate-y-px transition-all duration-150">
              <path d="M6 9l6 6 6-6"/>
            </svg>
            <!-- active indicator -->
            <span class="absolute bottom-0 left-4 right-4 h-[2px] bg-brand scale-x-0 group-[.router-link-active]:scale-x-100 transition-transform duration-200 origin-left" />
          </NuxtLink>

          <!-- Dropdown -->
          <div
            v-if="link.children"
            class="dropdown-panel absolute top-full left-0 pt-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 -translate-y-1 transition-all duration-200"
          >
            <div class="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 py-2 min-w-[220px]">
              <NuxtLink
                v-for="child in link.children"
                :key="child.to"
                :to="child.to"
                class="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors group/item"
                active-class="text-brand bg-blue-50/60"
              >
                <span class="w-1 h-1 rounded-full bg-gray-300 group-hover/item:bg-brand transition-colors flex-none" />
                {{ $t(child.key) }}
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <!-- Mobile lang -->
        <div class="flex lg:hidden items-center gap-1 text-[11px] font-medium tracking-[1.5px] text-gray-400">
          <button @click="setLocale('tr')" :class="locale === 'tr' ? 'text-gray-900' : ''" class="transition-colors cursor-pointer">TR</button>
          <span class="text-gray-200">/</span>
          <button @click="setLocale('en')" :class="locale === 'en' ? 'text-gray-900' : ''" class="transition-colors cursor-pointer">EN</button>
        </div>

        <!-- CTA button (desktop) -->
        <NuxtLink
          to="/iletisim"
          class="hidden lg:inline-flex items-center gap-2 bg-brand text-white text-[12px] font-semibold tracking-wide px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors"
        >
          {{ $t('menu.contact') }}
        </NuxtLink>

        <!-- Hamburger -->
        <button
          class="flex flex-col justify-center gap-[5px] w-9 h-9 cursor-pointer group"
          aria-label="Menu"
          @click="$emit('menu')"
        >
          <span class="w-5 h-[1.5px] bg-gray-700 transition-all duration-300 group-hover:w-6" />
          <span class="w-6 h-[1.5px] bg-gray-700 transition-all duration-300 group-hover:w-5" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits<{ menu: [] }>()

const { locale, setLocale } = useI18n()
const navRef = ref<HTMLElement>()

const links = [
  {
    key: 'menu.corporate',
    to: '/hakkimizda',
    children: [
      { key: 'menu.about', to: '/hakkimizda' },
      { key: 'menu.numbers', to: '/rakamlarla-celebi' },
      { key: 'menu.investor', to: '/yatirimci-iliskileri' },
      { key: 'menu.ethics', to: '/etik-davranis-ilkeleri' },
      { key: 'menu.csr', to: '/sosyal-sorumluluk' },
    ],
  },
  {
    key: 'menu.services',
    to: '/yer-hizmetleri',
    children: [
      { key: 'menu.ground', to: '/yer-hizmetleri' },
      { key: 'menu.cargo', to: '/kargo-ve-antrepo' },
      { key: 'menu.ga', to: '/genel-havacilik' },
      { key: 'menu.bridge', to: '/kopru-operasyonu' },
      { key: 'menu.lounge', to: '/lounge' },
      { key: 'menu.platinum', to: '/platinum' },
    ],
  },
  {
    key: 'menu.media',
    to: '/haberler',
    children: [
      { key: 'menu.news', to: '/haberler' },
      { key: 'menu.announcements', to: '/duyurular' },
      { key: 'menu.events', to: '/etkinlikler' },
      { key: 'menu.corpcomm', to: '/kurumsal-iletisim' },
    ],
  },
  {
    key: 'menu.careers',
    to: '/kariyer',
    children: [
      { key: 'menu.career', to: '/kariyer' },
      { key: 'menu.openpos', to: '/acik-pozisyonlar' },
      { key: 'menu.hrpolicy', to: '/ik-politikalari' },
      { key: 'menu.academy', to: '/celebi-akademi' },
    ],
  },
]

onMounted(() => {
  if (!navRef.value) return
  import('gsap').then(({ gsap }) => {
    gsap.from(navRef.value, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
  })
})
</script>

<style scoped>
.nav-root {
  font-family: inherit;
}

.utility-bar {
  transition: height 0.3s ease, opacity 0.3s ease;
}

.dropdown-panel {
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.06));
}
</style>
