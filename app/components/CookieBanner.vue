<script setup lang="ts">
const accepted = ref(false)
const rejected = ref(false)
const bannerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const stored = localStorage.getItem('cookie-consent')
  if (stored === 'accepted' || stored === 'rejected') {
    accepted.value = true
    return
  }

  // Slide-in animation
  if (bannerRef.value) {
    const { gsap } = useNuxtApp().$gsap
      ? useNuxtApp()
      : { $gsap: null }

    if (typeof window !== 'undefined') {
      import('gsap').then(({ gsap }) => {
        gsap.fromTo(
          bannerRef.value,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      })
    }
  }
})

function slideOut(callback: () => void) {
  if (bannerRef.value) {
    import('gsap').then(({ gsap }) => {
      gsap.to(bannerRef.value, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: callback,
      })
    })
  } else {
    callback()
  }
}

function accept() {
  slideOut(() => {
    localStorage.setItem('cookie-consent', 'accepted')
    accepted.value = true
  })
}

function reject() {
  slideOut(() => {
    localStorage.setItem('cookie-consent', 'rejected')
    rejected.value = true
    accepted.value = true
  })
}
</script>

<template>
  <div
    v-if="!accepted"
    ref="bannerRef"
    class="fixed bottom-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-t border-white/10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p class="text-sm text-white/80 leading-relaxed">
          Bu site, deneyiminizi iyileştirmek için çerezler kullanmaktadır.
          <NuxtLink
            to="/cerez-politikasi"
            class="underline text-white hover:text-brand transition-colors"
          >
            Çerez Politikası
          </NuxtLink>
          hakkında daha fazla bilgi alabilirsiniz.
        </p>
        <div class="flex items-center gap-3 shrink-0">
          <button
            class="px-5 py-2 rounded text-sm font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
            @click="accept"
          >
            Kabul Et
          </button>
          <button
            class="px-5 py-2 rounded text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
            @click="reject"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
