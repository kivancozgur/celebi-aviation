<template>
  <header>
    <nav
      ref="navRef"
      :data-state="menuOpen ? 'active' : undefined"
      class="fixed z-50 w-full px-3 md:px-4 pt-2"
    >
      <div class="mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 backdrop-blur-xl bg-gray-950/50 px-3">
        <div class="relative flex flex-wrap items-center justify-between gap-3 py-3 px-3 md:px-5">
          <!-- Left: Logo + Mobile Hamburger -->
          <div class="flex w-full justify-between lg:w-auto">
            <NuxtLink to="/" aria-label="home" class="flex items-center gap-2">
              <img
                src="https://www.celebiaviation.com/themes/custom/celebi/logo.svg"
                alt="Celebi Aviation"
                class="h-7 w-auto z-10 brightness-0 invert"
              />
            </NuxtLink>
            <div class="flex gap-2 lg:hidden">
              <button
                @click="menuOpen = !menuOpen"
                :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
                class="relative z-20 cursor-pointer p-2.5"
              >
                <span class="flex flex-col justify-center items-center w-5 h-5 relative">
                  <span
                    class="block w-5 h-[1.5px] transition-all duration-300 absolute"
                    :class="menuOpen ? 'rotate-45 bg-gray-900' : '-translate-y-[4px] bg-white'"
                  />
                  <span
                    class="block w-5 h-[1.5px] transition-all duration-300 absolute"
                    :class="menuOpen ? '-rotate-45 bg-gray-900' : 'translate-y-[4px] bg-white'"
                  />
                </span>
              </button>
            </div>
          </div>

          <!-- Center: Desktop Nav Links -->
          <div class="absolute inset-0 m-auto hidden lg:flex items-center justify-center w-fit h-fit top-1/2 -translate-y-1/2">
            <ul class="flex items-center gap-1">
              <li
                v-for="link in links"
                :key="link.key"
                class="relative group"
              >
                <NuxtLink
                  :to="link.to"
                  class="inline-flex items-center gap-1 rounded-md px-4 py-2 text-xs font-medium transition-colors text-white/70 hover:text-white hover:bg-white/10"
                  active-class="!text-white"
                >
                  {{ $t(link.key) }}
                  <svg
                    v-if="link.children"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    class="mt-px opacity-50 group-hover:opacity-80 transition-opacity duration-150"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </NuxtLink>

                <!-- Dropdown -->
                <div
                  v-if="link.children"
                  class="absolute top-full left-0 pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 -translate-y-1 transition-all duration-200"
                >
                  <div class="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 py-2 min-w-[220px]">
                    <NuxtLink
                      v-for="child in link.children"
                      :key="child.to"
                      :to="child.to"
                      class="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      active-class="text-brand bg-blue-50/60"
                    >
                      <span class="w-1 h-1 rounded-full bg-gray-300 flex-none" />
                      {{ $t(child.key) }}
                    </NuxtLink>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Right: Dark Mode Toggle + Lang + CTA -->
          <div class="hidden lg:flex items-center gap-2">
            <!-- Language Switcher -->
            <div class="flex items-center gap-1 text-[11px] font-medium tracking-[1.5px] text-white/40">
              <button
                @click="setLocale('tr')"
                :class="locale === 'tr' ? 'text-white' : ''"
                class="transition-colors cursor-pointer hover:text-white"
              >TR</button>
              <span class="text-white/20">/</span>
              <button
                @click="setLocale('en')"
                :class="locale === 'en' ? 'text-white' : ''"
                class="transition-colors cursor-pointer hover:text-white"
              >EN</button>
            </div>

            <!-- CTA -->
            <NuxtLink
              to="/iletisim"
              class="ml-1 inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
            >
              {{ $t('menu.contact') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Mobile Panel (inline) -->
          <div
            v-show="menuOpen"
            ref="mobilePanelRef"
            class="w-full lg:hidden border border-gray-100 bg-white rounded-lg p-4 shadow-lg mt-1"
          >
            <div class="space-y-6">
              <NuxtLink
                to="/platinum"
                class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                @click="menuOpen = false"
              >
                {{ $t('menu.platinum') }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </NuxtLink>
              <div v-for="category in mobileCategories" :key="category.label">
                <p class="text-[11px] font-semibold tracking-[2px] uppercase text-gray-400 mb-3">
                  {{ category.label }}
                </p>
                <ul class="space-y-1">
                  <li v-for="link in category.links" :key="link.to">
                    <NuxtLink
                      :to="link.to"
                      class="block text-sm font-medium text-gray-700 hover:text-gray-900 hover:translate-x-1 transition-all duration-200 py-1.5"
                      @click="menuOpen = false"
                    >
                      {{ link.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Mobile bottom: lang + utilities -->
            <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-4 text-xs text-gray-400">
                <a href="#" class="hover:text-gray-700 transition-colors">{{ $t('nav.lostItem') }}</a>
                <a href="#" class="hover:text-gray-700 transition-colors">{{ $t('nav.cargoTracking') }}</a>
              </div>
              <div class="text-xs font-medium tracking-[1px] text-gray-400 flex items-center gap-1">
                <button @click="setLocale('tr')" :class="locale === 'tr' ? 'text-gray-900' : 'opacity-40'" class="transition-opacity cursor-pointer">TR</button>
                <span class="opacity-30">/</span>
                <button @click="setLocale('en')" :class="locale === 'en' ? 'text-gray-900' : 'opacity-40'" class="transition-opacity cursor-pointer">EN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const { t, locale, setLocale } = useI18n()

const navRef = ref<HTMLElement>()
const mobilePanelRef = ref<HTMLElement>()
const menuOpen = ref(false)

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
    ],
  },
  {
    key: 'menu.platinum',
    to: '/platinum',
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

const mobileCategories = computed(() => [
  {
    label: t('menu.corporate'),
    links: [
      { label: t('menu.about'), to: '/hakkimizda' },
      { label: t('menu.numbers'), to: '/rakamlarla-celebi' },
      { label: t('menu.investor'), to: '/yatirimci-iliskileri' },
      { label: t('menu.ethics'), to: '/etik-davranis-ilkeleri' },
      { label: t('menu.csr'), to: '/sosyal-sorumluluk' },
    ],
  },
  {
    label: t('menu.services'),
    links: [
      { label: t('menu.ground'), to: '/yer-hizmetleri' },
      { label: t('menu.cargo'), to: '/kargo-ve-antrepo' },
      { label: t('menu.ga'), to: '/genel-havacilik' },
      { label: t('menu.bridge'), to: '/kopru-operasyonu' },
      { label: t('menu.lounge'), to: '/lounge' },
    ],
  },
  {
    label: t('menu.media'),
    links: [
      { label: t('menu.news'), to: '/haberler' },
      { label: t('menu.announcements'), to: '/duyurular' },
      { label: t('menu.events'), to: '/etkinlikler' },
      { label: t('menu.corpcomm'), to: '/kurumsal-iletisim' },
    ],
  },
  {
    label: t('menu.careers'),
    links: [
      { label: t('menu.career'), to: '/kariyer' },
      { label: t('menu.openpos'), to: '/acik-pozisyonlar' },
      { label: t('menu.hrpolicy'), to: '/ik-politikalari' },
      { label: t('menu.academy'), to: '/celebi-akademi' },
      { label: t('menu.contact'), to: '/iletisim' },
    ],
  },
])

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false
}

watch(menuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      if (mobilePanelRef.value) {
        gsap.fromTo(
          mobilePanelRef.value,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' },
        )
      }
    })
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  gsap.from(navRef.value!, {
    y: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
