<template>
  <section
    id="services"
    ref="sectionRef"
    class="carousel-section"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Background accent wash -->
    <div
      class="carousel-bg-wash"
      :style="{
        background: `radial-gradient(ellipse at 70% 50%, ${currentService.accent}18 0%, transparent 70%)`,
      }"
    />

    <div class="carousel-inner">
      <!-- Left: Text Content -->
      <div ref="textRef" class="carousel-content">
        <div class="carousel-content-inner">
          <!-- Label -->
          <div class="carousel-label-row">
            <span ref="lineRef" class="carousel-label-line" />
            <p
              class="carousel-subtitle"
              :class="isTransitioning ? 'transitioning' : 'visible'"
            >
              {{ t('services.label') }}
            </p>
          </div>

          <!-- Title -->
          <h2
            class="carousel-title"
            :class="isTransitioning ? 'transitioning' : 'visible'"
          >
            {{ currentService.title }}
          </h2>

          <!-- Description -->
          <p
            class="carousel-description"
            :class="isTransitioning ? 'transitioning' : 'visible'"
            :style="{ '--carousel-read-more-color': currentService.accent }"
          >
            {{ descPreview.text }}<NuxtLink
              v-if="descPreview.truncated"
              :to="currentService.href"
              class="carousel-read-more"
            >{{ t('services.carouselReadMore') }}</NuxtLink>
          </p>

          <!-- Navigation Arrows -->
          <div class="carousel-nav-arrows">
            <button
              class="carousel-arrow-btn"
              aria-label="Previous slide"
              @click="goPrev"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              class="carousel-arrow-btn"
              aria-label="Next slide"
              @click="goNext"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="carousel-image-container">
        <div class="carousel-image-wrapper">
          <div
            class="carousel-image-frame"
            :class="isTransitioning ? 'transitioning' : 'visible'"
          >
            <img
              :src="currentService.image"
              :alt="currentService.title"
              class="carousel-image"
            />
            <div
              class="carousel-image-overlay"
              :style="{
                background: `linear-gradient(135deg, ${currentService.accent}22 0%, transparent 50%)`,
              }"
            />
          </div>

          <!-- Decorative frame corners -->
          <div class="carousel-frame-corner carousel-frame-corner--tl" :style="{ borderColor: currentService.accent }" />
          <div class="carousel-frame-corner carousel-frame-corner--br" :style="{ borderColor: currentService.accent }" />
        </div>
      </div>
    </div>

    <!-- Progress Indicators -->
    <div class="carousel-progress-bar">
      <button
        v-for="(svc, i) in services"
        :key="i"
        class="carousel-progress-item"
        :class="{ active: i === currentIndex }"
        :aria-label="`Go to slide ${i + 1}`"
        @click="goToSlide(i)"
      >
        <div class="carousel-progress-track">
          <div
            class="carousel-progress-fill"
            :style="{
              width: progressWidth(i),
              backgroundColor: i === currentIndex ? currentService.accent : undefined,
            }"
          />
        </div>
        <span class="carousel-progress-label">{{ svc.title }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()

const { tm, t, rt, locale } = useI18n()

const DESC_MAX_CHARS = 140
const DESC_MIN_WORD_CUT = 72

function truncateDescription(full: string): { text: string; truncated: boolean } {
  const trimmed = full.trim()
  if (trimmed.length <= DESC_MAX_CHARS)
    return { text: trimmed, truncated: false }
  let cut = trimmed.slice(0, DESC_MAX_CHARS)
  const lastSpace = cut.lastIndexOf(' ')
  if (lastSpace >= DESC_MIN_WORD_CUT)
    cut = cut.slice(0, lastSpace)
  return { text: `${cut.trimEnd()}…`, truncated: true }
}

/** Sıra, ilgili dildeki `services.items` ile aynı olmalı */
const servicePathsTr = [
  '/kargo-ve-antrepo',
  '/genel-havacilik',
  '/kopru-operasyonu',
  '/lounge',
  '/platinum',
] as const
const servicePathsEn = [
  '/yer-hizmetleri',
  '/kargo-ve-antrepo',
  '/genel-havacilik',
  '/lounge',
  '/yer-hizmetleri',
] as const

const serviceImagesTr = [
  '/images/cargo-warehouse.jpg',
  '/images/aviation.jpg',
  '/images/ramp-services.jpg',
  '/images/meet-and-greet.jpg',
  '/images/aviation.jpg',
] as const
const serviceImagesEn = [
  '/images/ramp-services.jpg',
  '/images/cargo-warehouse.jpg',
  '/images/aviation.jpg',
  '/images/meet-and-greet.jpg',
  '/images/ramp-services.jpg',
] as const

const currentIndex = ref(0)
const isTransitioning = ref(false)
const direction = ref<'next' | 'prev'>('next')
const progress = ref(0)
const isPaused = ref(false)

const SLIDE_DURATION = 6000
const TRANSITION_DURATION = 800

const accentColors = [
  '#0084ff',
  '#0084ff',
  '#0084ff',
  '#0084ff',
  '#0084ff',
]

const services = computed(() => {
  const loc = locale.value === 'tr' ? 'tr' : 'en'
  const paths = loc === 'tr' ? servicePathsTr : servicePathsEn
  const images = loc === 'tr' ? serviceImagesTr : serviceImagesEn
  const items = tm('services.items') as Array<{ title: string; desc: string }>
  return items.map((item, i) => ({
    title: rt(item.title),
    desc: rt(item.desc),
    href: paths[i] ?? paths[0],
    image: images[i] ?? images[0],
    accent: accentColors[i] || accentColors[0],
  }))
})

const currentService = computed(() =>
  services.value[currentIndex.value] ?? { title: '', desc: '', image: '', accent: '#003DA5', href: '/' },
)

const descPreview = computed(() => truncateDescription(currentService.value.desc))

function progressWidth(i: number): string {
  if (i === currentIndex.value) return `${progress.value}%`
  if (i < currentIndex.value) return '100%'
  return '0%'
}

function goToSlide(index: number, dir?: 'next' | 'prev') {
  if (isTransitioning.value || index === currentIndex.value) return
  direction.value = dir || (index > currentIndex.value ? 'next' : 'prev')
  isTransitioning.value = true
  progress.value = 0

  setTimeout(() => {
    currentIndex.value = index
    setTimeout(() => {
      isTransitioning.value = false
    }, 50)
  }, TRANSITION_DURATION / 2)
}

function goPrev() {
  const prevIndex = (currentIndex.value - 1 + services.value.length) % services.value.length
  goToSlide(prevIndex, 'prev')
}

function goNext() {
  const nextIndex = (currentIndex.value + 1) % services.value.length
  goToSlide(nextIndex, 'next')
}

/* ── Touch / Swipe ─────────────────────────────────────── */
const touchStartX = ref(0)
const touchEndX = ref(0)

function handleTouchStart(e: TouchEvent) {
  const touch = e.targetTouches[0]
  if (touch) touchStartX.value = touch.clientX
}
function handleTouchMove(e: TouchEvent) {
  const touch = e.targetTouches[0]
  if (touch) touchEndX.value = touch.clientX
}
function handleTouchEnd() {
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 60) {
    if (diff > 0) goNext()
    else goPrev()
  }
}

/* ── Auto-play interval ────────────────────────────────── */
let slideInterval: ReturnType<typeof setInterval> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

function clearTimers() {
  if (slideInterval) { clearInterval(slideInterval); slideInterval = null }
  if (progressInterval) { clearInterval(progressInterval); progressInterval = null }
}

function startTimers() {
  clearTimers()
  progress.value = 0

  progressInterval = setInterval(() => {
    if (progress.value >= 100) return
    progress.value += 100 / (SLIDE_DURATION / 50)
  }, 50)

  slideInterval = setInterval(() => {
    goNext()
  }, SLIDE_DURATION)
}

watch([currentIndex, isPaused], () => {
  if (isPaused.value) {
    clearTimers()
  }
  else {
    startTimers()
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  if (textRef.value) {
    gsap.fromTo(textRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          once: true,
        },
      },
    )
  }

  gsap.to(lineRef.value!, {
    width: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%',
      once: true,
    },
  })

  startTimers()
})

onUnmounted(() => {
  clearTimers()
})
</script>

<style scoped>
.carousel-section {
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
  padding: 120px 1.5rem 80px;
}

@media (min-width: 768px) {
  .carousel-section {
    padding: 120px 3rem 80px;
  }
}

@media (min-width: 1024px) {
  .carousel-section {
    padding: 120px 5rem 80px;
  }
}

/* ── Background Accent Wash ──────────────────────────── */
.carousel-bg-wash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.8s ease;
}

/* ── Inner Layout ────────────────────────────────────── */
.carousel-inner {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .carousel-inner {
    flex-direction: row;
    align-items: flex-start;
    gap: 4rem;
  }
}

@media (min-width: 1024px) {
  .carousel-inner {
    gap: 6rem;
  }
}

/* ── Left: Content ────────────────────────────────────── */
.carousel-content {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  max-width: 560px;
  padding-top: 1rem;
}

@media (min-width: 1024px) {
  .carousel-content {
    padding-top: 2rem;
  }
}

.carousel-subtitle {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #003DA5;
  margin-bottom: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.carousel-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.carousel-label-line {
  display: block;
  width: 0;
  height: 1px;
  background: #003DA5;
  flex-shrink: 0;
}

.carousel-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

.carousel-subtitle.transitioning {
  opacity: 0;
  transform: translateY(-8px);
}

.carousel-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #111827;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.carousel-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.carousel-title.transitioning {
  opacity: 0;
  transform: translateY(10px);
}

.carousel-description {
  font-size: 17px;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 2.5rem;
  max-width: 340px;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.carousel-description.visible {
  opacity: 1;
  transform: translateY(0);
}

.carousel-description.transitioning {
  opacity: 0;
  transform: translateY(8px);
}

.carousel-read-more {
  display: inline;
  margin-left: 0.2em;
  font-weight: 600;
  color: var(--carousel-read-more-color, #003DA5);
  text-decoration: none;
  white-space: nowrap;
}

.carousel-read-more:hover {
  text-decoration: underline;
}

/* ── Navigation Arrows ────────────────────────────────── */
.carousel-nav-arrows {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.carousel-arrow-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: all 0.25s ease;
}

.carousel-arrow-btn:hover {
  border-color: #111827;
  background: #111827;
  color: #ffffff;
}

/* ── Right: Image ─────────────────────────────────────── */
.carousel-image-container {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.carousel-image-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.carousel-image-frame.visible {
  opacity: 1;
  transform: scale(1);
}

.carousel-image-frame.transitioning {
  opacity: 0;
  transform: scale(0.97);
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-image-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* ── Image Wrapper ────────────────────────────────────── */
.carousel-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 560px;
}

/* ── Decorative Frame Corners ─────────────────────────── */
.carousel-frame-corner {
  position: absolute;
  width: 48px;
  height: 48px;
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  opacity: 0.5;
  transition: border-color 0.6s ease;
}

.carousel-frame-corner--tl {
  top: -12px;
  left: -12px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.carousel-frame-corner--br {
  bottom: -12px;
  right: -12px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

@media (max-width: 767px) {
  .carousel-frame-corner {
    display: none;
  }
}

/* ── Collection Number ─────────────────────────────────── */
/* ── Progress Bar ──────────────────────────────────────── */
.carousel-progress-bar {
  position: relative;
  display: none;
  max-width: 1400px;
  margin: 4rem auto 0;
  gap: 1rem;
}

@media (min-width: 768px) {
  .carousel-progress-bar {
    display: flex;
  }
}

.carousel-progress-item {
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.carousel-progress-track {
  width: 100%;
  height: 2px;
  background: #e5e7eb;
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 0.625rem;
}

.carousel-progress-fill {
  height: 100%;
  background: #9ca3af;
  border-radius: 1px;
  transition: width 0.05s linear;
}

.carousel-progress-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #9ca3af;
  transition: color 0.3s ease;
}

.carousel-progress-item.active .carousel-progress-label {
  color: #111827;
}

.carousel-progress-item:hover .carousel-progress-label {
  color: #6b7280;
}

.carousel-progress-item.active:hover .carousel-progress-label {
  color: #111827;
}
</style>
