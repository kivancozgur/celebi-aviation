<template>
  <div
    v-show="open"
    ref="menuRef"
    class="fixed inset-0 z-[100] bg-dark flex flex-col justify-center px-20"
    @click.self="emit('close')"
  >
    <!-- Close button -->
    <button
      class="absolute top-7 right-20 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
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
        class="block text-[clamp(2.5rem,6vw,5rem)] font-bold text-white/20 hover:text-white transition-colors duration-300 leading-tight tracking-tight"
        @click="emit('close')"
      >
        {{ link.label }}
      </a>
    </nav>

    <!-- Bottom logo -->
    <div class="absolute bottom-12 left-20 flex items-center gap-3">
      <span class="w-2 h-8 bg-brand rounded-[2px]" />
      <span class="text-white font-bold text-lg tracking-[4px]">CELEBI</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

const menuRef = ref<HTMLElement | null>(null)
const linksRef = ref<HTMLElement[]>([])

const menuLinks = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Uçak Filosu', href: '#ucak-filosu' },
  { label: 'Hakkında', href: '#hakkinda' },
  { label: 'İletişim', href: '#iletisim' },
]

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
