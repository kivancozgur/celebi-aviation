<template>
  <section
    id="haberler"
    ref="sectionRef"
    class="bg-dark py-[120px] px-6 md:px-12 lg:px-20"
  >
    <!-- Section header -->
    <div ref="headerRef" class="flex flex-col md:flex-row items-start justify-between mb-16 gap-8 opacity-0 translate-y-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span ref="lineRef" class="h-px w-0 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('news.label') }}</span>
        </div>
        <h2 class="text-[56px] font-bold text-white tracking-[-2px] leading-[1.05]">{{ t('news.title') }}</h2>
      </div>
      <p class="text-white/40 text-base leading-7 md:text-right hidden lg:block pt-2">
        {{ t('news.subtitle') }}
      </p>
    </div>

    <!-- Divider -->
    <div ref="dividerRef" class="h-px bg-white/10 mb-16 origin-left scale-x-0" />

    <!-- News grid -->
    <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="item in news"
        :key="item.id"
        class="news-card group opacity-0 translate-y-10 flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/[0.03] hover:border-brand/30 transition-colors duration-500"
      >
        <!-- Image -->
        <div class="relative h-[220px] overflow-hidden">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
        </div>

        <!-- Content -->
        <div class="flex flex-col flex-1 p-7">
          <!-- Date -->
          <time
            :datetime="item.date"
            class="text-brand text-[11px] tracking-[2px] font-medium uppercase mb-3 block"
          >
            {{ formatDate(item.date) }}
          </time>

          <!-- Title -->
          <h3 class="text-white text-lg font-semibold leading-snug mb-3 group-hover:text-brand/90 transition-colors duration-300">
            {{ item.title }}
          </h3>

          <!-- Summary -->
          <p class="text-white/40 text-sm leading-relaxed flex-1 mb-6">
            {{ item.summary }}
          </p>

          <!-- Read more link -->
          <a
            :href="`/haberler/${item.slug}`"
            class="inline-flex items-center gap-2 text-white/60 text-sm font-medium group/link hover:text-brand transition-colors duration-300 self-start"
          >
            <span class="relative">
              {{ t('news.readMore') }}
              <span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-400 group-hover/link:w-full" />
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="transition-transform duration-300 group-hover/link:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#003DA5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </article>
    </div>

    <!-- CTA -->
    <div ref="ctaRef" class="mt-16 flex justify-center opacity-0 translate-y-6">
      <a
        href="/haberler"
        class="inline-flex items-center gap-3 border border-brand/40 hover:border-brand hover:bg-brand/10 text-white text-sm font-medium px-8 py-4 rounded-full transition-all duration-400 group"
      >
        {{ t('news.allNews') }}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          class="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#003DA5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import newsData from '@@/data/news.json'

const { t, locale } = useI18n()

const sectionRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const dividerRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const news = newsData

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Header reveal
  ScrollTrigger.create({
    trigger: headerRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(lineRef.value!, {
        width: 40,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.to(headerRef.value!, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
    },
    once: true,
  })

  // Divider draws left to right
  gsap.to(dividerRef.value!, {
    scaleX: 1,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: dividerRef.value,
      start: 'top 90%',
    },
  })

  // News cards stagger
  const cards = gridRef.value!.querySelectorAll('.news-card')
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: gridRef.value,
      start: 'top 80%',
    },
  })

  // CTA reveal
  gsap.to(ctaRef.value!, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: ctaRef.value,
      start: 'top 90%',
    },
  })
})
</script>
