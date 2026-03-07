<template>
  <section
    id="services"
    ref="sectionRef"
    class="bg-gray-50 py-[120px]"
  >
    <div class="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

      <!-- Section header: left label+title / right subtitle -->
      <div
        ref="headerRef"
        class="flex flex-col lg:flex-row gap-10 lg:gap-24 mb-16 opacity-0 translate-y-12"
      >
        <!-- Left -->
        <div class="flex-shrink-0">
          <div class="flex items-center gap-3 mb-5">
            <span class="h-px bg-brand" ref="svcLineRef" style="width:0" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('services.label') }}</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            {{ t('services.title') }}
          </h2>
        </div>

        <!-- Right -->
        <div class="flex items-end max-w-md">
          <p class="text-gray-500 text-base leading-7">
            {{ t('services.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Service cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="card in services"
          :key="card.id"
          ref="cardRefs"
          class="group bg-white border border-gray-100 shadow-sm rounded-2xl p-8 flex flex-col justify-between min-h-[220px] cursor-pointer transition-all duration-300 hover:border-brand/30 hover:shadow-md opacity-0 translate-y-8"
          :class="card.id === 5 ? 'lg:col-span-1' : ''"
        >
          <!-- Number -->
          <div>
            <span class="block text-5xl font-bold text-brand/20 leading-none mb-6 select-none">
              {{ card.num }}
            </span>
            <h3 class="text-gray-900 font-semibold text-lg leading-snug mb-3">{{ card.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ card.desc }}</p>
          </div>

          <!-- Arrow -->
          <div class="flex justify-end mt-6">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full border border-brand/20 text-brand transition-all duration-300 group-hover:bg-brand group-hover:border-brand group-hover:text-white">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const svcLineRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])

const { tm, t, rt } = useI18n()

const services = computed(() => {
  const items = tm('services.items') as Array<{ title: string; desc: string }>
  return items.map((item, i) => ({
    id: i + 1,
    num: String(i + 1).padStart(2, '0'),
    title: rt(item.title),
    desc: rt(item.desc),
  }))
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const section = sectionRef.value!
  const header = headerRef.value!
  const line = svcLineRef.value!

  // Header reveal
  gsap.to(header, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
  })

  // Decorative line width
  gsap.to(line, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
  })

  // Cards stagger reveal
  gsap.to(cardRefs.value, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
    },
  })
})
</script>
