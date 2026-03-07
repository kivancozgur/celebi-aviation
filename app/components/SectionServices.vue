<template>
  <!-- Outer wrapper — height drives horizontal scroll duration -->
  <section
    id="services"
    ref="outerRef"
    class="relative bg-gray-50"
  >
    <!-- Sticky container: pinned during horizontal scroll -->
    <div
      ref="stickyRef"
      class="h-screen overflow-hidden flex flex-col justify-center"
    >
      <!-- Section header -->
      <div
        ref="headerRef"
        class="px-6 md:px-12 lg:px-20 mb-14 flex items-end justify-between opacity-0 translate-y-12"
      >
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="h-px w-0 bg-brand" ref="svcLineRef" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('services.label') }}</span>
          </div>
          <h2 class="text-[56px] font-bold text-gray-900 tracking-[-2px]">{{ t('services.title') }}</h2>
        </div>
        <p class="text-gray-500 text-base leading-7 text-right hidden lg:block">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Horizontal cards track -->
      <div class="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pl-6 md:pl-20 pr-0" style="-webkit-overflow-scrolling: touch;">
        <div ref="trackRef" class="flex gap-5 w-max will-change-transform">
          <article
            v-for="card in services"
            :key="card.id"
            class="service-card snap-start group flex-none w-[300px] sm:w-[340px] md:w-[380px] h-[500px] relative rounded-2xl overflow-hidden cursor-pointer"
          >
            <!-- Image -->
            <img
              :src="card.image"
              :alt="card.title"
              class="card-img absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700"
            />

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

            <!-- Hover border glow -->
            <div
              class="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-brand/40 transition-all duration-500"
            />

            <!-- Content -->
            <div class="absolute bottom-7 left-7 right-7">
              <span class="text-brand text-xs tracking-[2px] font-medium block mb-2">{{ card.num }}</span>
              <h3 class="text-white text-xl font-semibold leading-tight">{{ card.title }}</h3>
              <p class="text-white/40 text-sm mt-2 leading-relaxed max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-20">
                {{ card.desc }}
              </p>
            </div>

            <!-- Arrow icon on hover -->
            <div
              class="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </article>

          <!-- Right padding spacer -->
          <div class="flex-none w-20 h-1" />
        </div>
      </div>

      <!-- Progress indicator -->
      <div class="px-6 md:px-20 mt-10 flex items-center gap-4">
        <div class="flex gap-2">
          <span
            v-for="(_, i) in services"
            :key="i"
            class="h-px transition-all duration-300"
            :class="i === 0 ? 'w-8 bg-brand' : 'w-4 bg-gray-300'"
          />
        </div>
        <span class="text-gray-400 text-xs tracking-[1px]">{{ services.length }} {{ t('services.label').toLowerCase() }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const outerRef = ref<HTMLElement>()
const stickyRef = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const svcLineRef = ref<HTMLElement>()

const { tm, t } = useI18n()

const services = computed(() => {
  const items = tm('services.items') as Array<{ title: string; desc: string }>
  return items.map((item, i) => ({
    id: i + 1,
    num: String(i + 1).padStart(2, '0'),
    title: item.title,
    desc: item.desc,
    image: [
      'https://images.unsplash.com/photo-1610908609985-3079199f3f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      'https://images.unsplash.com/photo-1610289472363-8659447c9d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      'https://images.unsplash.com/photo-1700811476970-2b42838f5f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      'https://images.unsplash.com/photo-1759462692380-08be88ad26f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
      'https://images.unsplash.com/photo-1728134960580-eadd36183dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    ][i],
  }))
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const outer = outerRef.value!
  const sticky = stickyRef.value!
  const track = trackRef.value!
  const header = headerRef.value!

  // Section header reveal on scroll into view
  gsap.to(header, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: outer,
      start: 'top 80%',
    },
  })

  gsap.to(svcLineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: outer,
      start: 'top 80%',
    },
  })

  // Horizontal scroll via pin + scrub
  const getScrollDistance = () => track.scrollWidth - window.innerWidth + 80

  gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: sticky,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      invalidateOnRefresh: true,
    },
  })
})
</script>
