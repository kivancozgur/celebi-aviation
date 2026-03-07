<template>
  <section id="contact" ref="contactRef" class="bg-dark py-[120px] px-20 border-t border-white/5">
    <div class="max-w-screen-xl mx-auto">
      <!-- Top row -->
      <div class="flex items-start justify-between mb-24 gap-12">
        <!-- Tagline -->
        <div ref="contactLeftRef" class="opacity-0 translate-y-10">
          <div class="flex items-center gap-3 mb-6">
            <span ref="contactLineRef" class="h-px w-0 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Iletisim</span>
          </div>
          <h2 class="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight tracking-tight max-w-lg">
            Birlikte<br />
            <span class="text-white/50">ilerleyelim.</span>
          </h2>
        </div>

        <!-- Contact info -->
        <div ref="contactRightRef" class="opacity-0 translate-x-8 pt-2">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="mb-8"
          >
            <div class="text-white/30 text-xs tracking-[2px] uppercase mb-2">{{ info.label }}</div>
            <a
              :href="info.href"
              class="text-white text-base hover:text-brand transition-colors duration-300"
            >
              {{ info.value }}
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom footer bar -->
      <div
        ref="footerBarRef"
        class="flex items-center justify-between pt-8 border-t border-white/10 opacity-0"
      >
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <span class="w-2 h-8 bg-brand rounded-[2px]" />
          <span class="text-white font-bold text-lg tracking-[4px]">CELEBI</span>
        </div>

        <!-- Links -->
        <div class="hidden md:flex items-center gap-10">
          <a
            v-for="link in footerLinks"
            :key="link"
            href="#"
            class="text-white/30 text-sm hover:text-white transition-colors duration-300"
          >
            {{ link }}
          </a>
        </div>

        <!-- Copyright -->
        <p class="text-white/20 text-xs tracking-[1px]">
          © {{ new Date().getFullYear() }} Celebi Aviation
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const contactRef = ref<HTMLElement>()
const contactLeftRef = ref<HTMLElement>()
const contactRightRef = ref<HTMLElement>()
const contactLineRef = ref<HTMLElement>()
const footerBarRef = ref<HTMLElement>()

const contactInfo = [
  { label: 'Genel Merkez', value: 'Istanbul, Turkiye', href: '#' },
  { label: 'E-posta', value: 'info@celebiaviation.com', href: 'mailto:info@celebiaviation.com' },
  { label: 'Telefon', value: '+90 212 000 00 00', href: 'tel:+902120000000' },
]

const footerLinks = ['Gizlilik', 'Kullanim Kosullari', 'Kariyer', 'Basin']

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(contactLineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: contactLeftRef.value,
      start: 'top 80%',
    },
  })

  gsap.to(contactLeftRef.value!, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: contactLeftRef.value,
      start: 'top 80%',
    },
  })

  gsap.to(contactRightRef.value!, {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: contactRightRef.value,
      start: 'top 80%',
    },
  })

  gsap.to(footerBarRef.value!, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: footerBarRef.value,
      start: 'top 90%',
    },
  })
})
</script>
