<template>
  <section id="contact" ref="contactRef" class="bg-dark py-[120px] px-6 md:px-12 lg:px-20 border-t border-white/5">
    <div class="max-w-screen-xl mx-auto">
      <!-- Top row -->
      <div class="flex flex-col md:flex-row items-start justify-between mb-16 gap-10 md:gap-12">
        <!-- Tagline -->
        <div ref="contactLeftRef" class="opacity-0 translate-y-10">
          <div class="flex items-center gap-3 mb-6">
            <span ref="contactLineRef" class="h-px w-0 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">İletişim</span>
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

      <!-- Contact Form -->
      <div ref="formSectionRef" class="mb-24">
        <!-- Success alert -->
        <div
          v-if="status === 'success'"
          role="alert"
          class="mb-6 rounded-xl bg-green-500/10 border border-green-500/30 px-5 py-4 text-green-400 text-sm"
        >
          Mesajınız iletildi! En kısa sürede dönüş yapacağız.
        </div>

        <!-- Error alert -->
        <div
          v-if="status === 'error'"
          role="alert"
          class="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-5 py-4 text-red-400 text-sm"
        >
          Bir hata oluştu. Lütfen tekrar deneyin.
        </div>

        <form
          novalidate
          aria-label="İletişim formu"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <!-- Ad Soyad -->
            <div ref="field0Ref" class="opacity-0 translate-y-8">
              <label for="contact-name" class="block text-white/40 text-xs tracking-[2px] uppercase mb-2">
                Ad Soyad <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                placeholder="Adınız Soyadınız"
                aria-describedby="contact-name-error"
                :aria-invalid="!!errors.name"
                class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60"
                :class="errors.name ? 'border-red-500/60' : 'border-white/10 hover:border-white/20 focus:border-brand/60'"
              />
              <p v-if="errors.name" id="contact-name-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.name }}
              </p>
            </div>

            <!-- E-posta -->
            <div ref="field1Ref" class="opacity-0 translate-y-8">
              <label for="contact-email" class="block text-white/40 text-xs tracking-[2px] uppercase mb-2">
                E-posta <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                placeholder="ornek@firma.com"
                aria-describedby="contact-email-error"
                :aria-invalid="!!errors.email"
                class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60"
                :class="errors.email ? 'border-red-500/60' : 'border-white/10 hover:border-white/20 focus:border-brand/60'"
              />
              <p v-if="errors.email" id="contact-email-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.email }}
              </p>
            </div>

            <!-- Konu -->
            <div ref="field2Ref" class="opacity-0 translate-y-8 md:col-span-2">
              <label for="contact-subject" class="block text-white/40 text-xs tracking-[2px] uppercase mb-2">
                Konu <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                required
                placeholder="Mesajınızın konusu"
                aria-describedby="contact-subject-error"
                :aria-invalid="!!errors.subject"
                class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60"
                :class="errors.subject ? 'border-red-500/60' : 'border-white/10 hover:border-white/20 focus:border-brand/60'"
              />
              <p v-if="errors.subject" id="contact-subject-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.subject }}
              </p>
            </div>

            <!-- Mesaj -->
            <div ref="field3Ref" class="opacity-0 translate-y-8 md:col-span-2">
              <label for="contact-message" class="block text-white/40 text-xs tracking-[2px] uppercase mb-2">
                Mesaj <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                required
                rows="5"
                placeholder="Mesajınızı buraya yazın... (en az 10 karakter)"
                aria-describedby="contact-message-error"
                :aria-invalid="!!errors.message"
                class="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60 resize-none"
                :class="errors.message ? 'border-red-500/60' : 'border-white/10 hover:border-white/20 focus:border-brand/60'"
              />
              <p v-if="errors.message" id="contact-message-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.message }}
              </p>
            </div>
          </div>

          <!-- Submit -->
          <div ref="field4Ref" class="opacity-0 translate-y-8">
            <button
              type="submit"
              :disabled="status === 'loading'"
              class="inline-flex items-center gap-2 bg-brand hover:bg-brand/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-8 py-3.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:ring-offset-2 focus:ring-offset-dark"
            >
              <svg
                v-if="status === 'loading'"
                class="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              {{ status === 'loading' ? 'Gönderiliyor...' : 'Gönder' }}
            </button>
          </div>
        </form>
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
const formSectionRef = ref<HTMLElement>()
const field0Ref = ref<HTMLElement>()
const field1Ref = ref<HTMLElement>()
const field2Ref = ref<HTMLElement>()
const field3Ref = ref<HTMLElement>()
const field4Ref = ref<HTMLElement>()

const contactInfo = [
  { label: 'Genel Merkez', value: 'İstanbul, Türkiye', href: '#' },
  { label: 'E-posta', value: 'info@celebiaviation.com', href: 'mailto:info@celebiaviation.com' },
  { label: 'Telefon', value: '+90 212 000 00 00', href: 'tel:+902120000000' },
]

const footerLinks = ['Gizlilik', 'Kullanım Koşulları', 'Kariyer', 'Basın']

// ── Form state ────────────────────────────────────────────────────────────────

const form = reactive({ name: '', email: '', subject: '', message: '' })

const errors = reactive({ name: '', email: '', subject: '', message: '' })

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Ad Soyad zorunludur'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Geçerli bir e-posta girin'
  errors.subject = form.subject.trim() ? '' : 'Konu zorunludur'
  errors.message = form.message.trim().length >= 10 ? '' : 'Mesaj en az 10 karakter olmalıdır'
  return !Object.values(errors).some(Boolean)
}

async function handleSubmit() {
  if (!validate()) return
  status.value = 'loading'
  try {
    // EmailJS entegrasyonu için placeholder — gerçek service ID ile değiştirilecek
    await new Promise(resolve => setTimeout(resolve, 1000))
    status.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    status.value = 'error'
  }
}

// ── Animations ────────────────────────────────────────────────────────────────

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

  // Form fields stagger animation
  const fieldRefs = [field0Ref.value!, field1Ref.value!, field2Ref.value!, field3Ref.value!, field4Ref.value!]
  gsap.to(fieldRefs, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: formSectionRef.value,
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
