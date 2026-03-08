<template>
  <div
    v-show="open"
    ref="menuRef"
    class="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto"
    @click.self="emit('close')"
  >
    <!-- Top bar -->
    <div class="flex items-center justify-between px-8 md:px-16 lg:px-20 h-20 border-b border-gray-100 flex-shrink-0">
      <img
        src="https://www.celebiaviation.com/themes/custom/celebi/logo.svg"
        alt="Celebi Aviation"
        class="h-7 w-auto"
      />
      <button
        class="text-gray-400 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
        aria-label="Menüyü kapat"
        @click="emit('close')"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- Nav grid -->
    <div class="flex-1 px-8 md:px-16 lg:px-20 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <!-- Kurumsal -->
        <div
          v-for="(category, ci) in menuCategories"
          :key="category.label"
          ref="categoriesRef"
          class="opacity-0"
        >
          <p class="text-[11px] font-semibold tracking-[2px] uppercase text-gray-400 mb-4">
            {{ category.label }}
          </p>
          <ul class="space-y-1">
            <li v-for="link in category.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="block text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:translate-x-1 transition-all duration-200 py-1.5"
                @click="emit('close')"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom strip -->
    <div class="flex-shrink-0 border-t border-gray-100 px-8 md:px-16 lg:px-20 py-6 flex items-center justify-between">
      <div class="flex items-center gap-6 text-xs text-gray-400">
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
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref, computed } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

const { t, locale, setLocale } = useI18n()

const menuRef = ref<HTMLElement | null>(null)
const categoriesRef = ref<HTMLElement[]>([])

const menuCategories = computed(() => [
  {
    label: t('menu.corporate'),
    links: [
      { label: t('menu.about'), to: '/hakkimizda' },
      { label: t('menu.numbers'), to: '/rakamlarla-celebi' },
      { label: t('menu.investor'), to: '/yatirimci-iliskileri' },
      { label: t('menu.ethics'), to: '/etik-davranis-ilkeleri' },
      { label: t('menu.infosec'), to: '/bilgi-guvenligi-politikasi' },
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
      { label: t('menu.platinum'), to: '/platinum' },
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

watch(
  () => props.open,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'

      gsap.fromTo(
        menuRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )

      requestAnimationFrame(() => {
        const cats = menuRef.value?.querySelectorAll('.grid > div')
        if (cats && cats.length) {
          gsap.fromTo(
            cats,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.07, delay: 0.1, duration: 0.45, ease: 'power3.out' }
          )
        }
      })
    } else {
      document.body.style.overflow = ''
      gsap.to(menuRef.value, { opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }
)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
