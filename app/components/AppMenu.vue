<template>
  <div
    v-show="open"
    ref="menuRef"
    class="fixed inset-0 z-[100] bg-white flex flex-col justify-center px-20"
    @click.self="emit('close')"
  >
    <!-- Close button -->
    <button
      class="absolute top-7 right-20 text-gray-400 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
      aria-label="Menüyü kapat"
      @click="emit('close')"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>

    <!-- Nav links -->
    <nav class="space-y-2">
      <a
        v-for="link in menuLinks"
        :key="link.label"
        :ref="(el) => { if (el) linksRef.push(el as HTMLElement) }"
        :href="link.href"
        class="block text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-200 hover:text-gray-900 transition-colors duration-300 leading-tight tracking-tight"
        @click="emit('close')"
      >
        {{ link.label }}
      </a>
    </nav>

    <!-- Bottom logo -->
    <div class="absolute bottom-12 left-20">
      <img
        src="https://www.celebiaviation.com/themes/custom/celebi/logo.svg"
        alt="Celebi Aviation"
        class="h-7 w-auto opacity-60"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref, computed } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

const { t } = useI18n()

const menuRef = ref<HTMLElement | null>(null)
const linksRef = ref<HTMLElement[]>([])

const menuLinks = computed(() => [
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.aircraft'), href: '#aircraft' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.contact'), href: '#contact' },
])

watch(
  () => props.open,
  (val) => {
    // Reset linksRef on each open so stale refs don't accumulate
    linksRef.value = []

    if (val) {
      document.body.style.overflow = 'hidden'

      // Ensure element is visible (v-show) before animating
      gsap.fromTo(
        menuRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )

      // Wait a tick for v-show to render links before animating them
      requestAnimationFrame(() => {
        const links = menuRef.value?.querySelectorAll('nav a')
        if (links && links.length) {
          gsap.fromTo(
            links,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, delay: 0.15, duration: 0.5, ease: 'power3.out' }
          )
        }
      })
    } else {
      document.body.style.overflow = ''

      gsap.to(menuRef.value, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      })
    }
  }
)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
