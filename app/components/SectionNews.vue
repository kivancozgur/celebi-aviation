<template>
  <section
    id="haberler"
    ref="sectionRef"
    class="bg-white px-4 py-12 sm:py-16 md:py-20"
  >
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div ref="headerRef" class="mb-8 sm:mb-12 opacity-0 translate-y-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div class="text-center sm:text-left">
          <div class="flex items-center gap-3 mb-3 sm:mb-4">
            <span ref="lineRef" class="h-px w-0 bg-brand" />
            <p class="text-brand text-[11px] font-medium tracking-[3px] uppercase">
              {{ t('news.label') }}
            </p>
          </div>
          <h2 class="text-[40px] sm:text-[48px] md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-[-2px] mb-6">
            {{ t('news.title') }}
          </h2>
        </div>

        <!-- Arrow Buttons -->
        <div class="flex items-center gap-2 self-center sm:self-auto">
          <button
            aria-label="Previous"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-transparent text-gray-700 transition-all duration-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-transparent text-gray-700 transition-all duration-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <!-- News Grid -->
      <div ref="gridRef" class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="item in news"
          :key="item.id"
          class="news-card cursor-pointer border border-gray-300/50 bg-white/50 shadow-none backdrop-blur-sm transition-shadow hover:shadow-md opacity-0 translate-y-10"
        >
          <!-- Image + Category Badge -->
          <div class="relative mb-4 sm:mb-6">
            <img
              :src="item.image"
              :alt="item.title"
              class="aspect-square h-64 w-full object-cover sm:h-72 md:h-80"
            />
            <span
              class="absolute top-0 left-0 bg-white px-2 py-0.5 font-medium text-[10px] text-black uppercase sm:px-3 sm:py-1 sm:text-xs"
            >
              #{{ item.category }}
            </span>
          </div>

          <!-- Content -->
          <div class="px-3 pb-3 sm:px-4 sm:pb-4">
            <h3 class="mb-2 font-normal text-base text-gray-900 tracking-tight sm:text-lg md:text-2xl">
              {{ item.title }}
            </h3>
            <p class="mb-4 text-gray-600 text-xs leading-relaxed sm:mb-6 sm:text-sm">
              {{ item.summary }}
            </p>

            <!-- Read More + Date -->
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                :href="`/haberler/${item.slug}`"
                class="group relative flex items-center font-medium text-gray-900 text-xs transition-colors hover:text-gray-700 sm:text-sm"
              >
                <span class="relative mr-2 overflow-hidden border border-gray-200 p-2 transition-colors duration-300 ease-in group-hover:bg-black group-hover:text-white sm:p-3">
                  <!-- Arrow that slides out -->
                  <svg
                    class="h-3 w-3 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover:translate-x-8 group-hover:opacity-0 sm:h-4 sm:w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <!-- Arrow that slides in -->
                  <svg
                    class="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-2 sm:-left-5 sm:h-4 sm:w-4 sm:group-hover:left-3"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                {{ t('news.readMore') }}
              </a>
              <span class="flex items-center gap-2 text-[10px] text-gray-500 sm:gap-3 sm:text-xs">
                {{ formatDate(item.date) }}
                <span class="w-6 border-t border-gray-300 sm:w-16" />
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Dot Indicators -->
      <div class="mt-8 flex justify-center gap-2">
        <button
          v-for="(item, index) in news"
          :key="index"
          class="h-2 w-2 rounded-full transition-colors"
          :class="index === 0 ? 'bg-brand' : 'bg-brand/20'"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>

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
const gridRef = ref<HTMLElement>()

const news = newsData

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(headerRef.value!, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%',
      once: true,
    },
  })

  gsap.to(lineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%',
      once: true,
    },
  })

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
      once: true,
    },
  })

})
</script>
