<template>
  <section id="contact" ref="contactRef" class="bg-gray-50 py-[120px] px-6 md:px-12 lg:px-20 border-t border-gray-100">
    <div class="max-w-screen-xl mx-auto">
      <!-- Top row -->
      <div class="flex flex-col md:flex-row items-start justify-between mb-16 gap-10 md:gap-12">
        <!-- Tagline -->
        <div ref="contactLeftRef" class="opacity-0 translate-y-10">
          <div class="flex items-center gap-3 mb-6">
            <span ref="contactLineRef" class="h-px w-0 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">{{ t('contact.label') }}</span>
          </div>
          <h2 class="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-lg">
            {{ t('contact.titleLine1') }}<br />
            <span class="text-gray-400">{{ t('contact.titleLine2') }}</span>
          </h2>
        </div>

        <!-- Contact info -->
        <div ref="contactRightRef" class="opacity-0 translate-x-8 pt-2">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="mb-8"
          >
            <div class="text-gray-400 text-xs tracking-[2px] uppercase mb-2">{{ info.label }}</div>
            <a
              :href="info.href"
              class="text-gray-700 text-base hover:text-brand transition-colors duration-300"
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
          {{ t('contact.form.success') }}
        </div>

        <!-- Error alert -->
        <div
          v-if="status === 'error'"
          role="alert"
          class="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-5 py-4 text-red-400 text-sm"
        >
          {{ t('contact.form.error') }}
        </div>

        <form
          novalidate
          :aria-label="t('contact.label')"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <!-- Ad Soyad -->
            <div ref="field0Ref" class="opacity-0 translate-y-8">
              <label for="contact-name" class="block text-gray-500 text-xs tracking-[2px] uppercase mb-2">
                {{ t('contact.form.name') }} <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                :placeholder="t('contact.form.name')"
                aria-describedby="contact-name-error"
                :aria-invalid="!!errors.name"
                class="w-full bg-white border rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60"
                :class="errors.name ? 'border-red-400' : 'border-gray-200 hover:border-gray-300 focus:border-brand/60'"
              />
              <p v-if="errors.name" id="contact-name-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.name }}
              </p>
            </div>

            <!-- E-posta -->
            <div ref="field1Ref" class="opacity-0 translate-y-8">
              <label for="contact-email" class="block text-gray-500 text-xs tracking-[2px] uppercase mb-2">
                {{ t('contact.form.email') }} <span class="text-brand" aria-hidden="true">*</span>
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
                class="w-full bg-white border rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60"
                :class="errors.email ? 'border-red-400' : 'border-gray-200 hover:border-gray-300 focus:border-brand/60'"
              />
              <p v-if="errors.email" id="contact-email-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.email }}
              </p>
            </div>

            <!-- Konu -->
            <div ref="field2Ref" class="opacity-0 translate-y-8 md:col-span-2">
              <label for="contact-subject" class="block text-gray-500 text-xs tracking-[2px] uppercase mb-2">
                {{ t('contact.form.subject') }} <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                required
                :placeholder="t('contact.form.subject')"
                aria-describedby="contact-subject-error"
                :aria-invalid="!!errors.subject"
                class="w-full bg-white border rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60"
                :class="errors.subject ? 'border-red-400' : 'border-gray-200 hover:border-gray-300 focus:border-brand/60'"
              />
              <p v-if="errors.subject" id="contact-subject-error" role="alert" class="mt-1.5 text-red-400 text-xs">
                {{ errors.subject }}
              </p>
            </div>

            <!-- Mesaj -->
            <div ref="field3Ref" class="opacity-0 translate-y-8 md:col-span-2">
              <label for="contact-message" class="block text-gray-500 text-xs tracking-[2px] uppercase mb-2">
                {{ t('contact.form.message') }} <span class="text-brand" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                required
                rows="5"
                :placeholder="t('contact.form.message')"
                aria-describedby="contact-message-error"
                :aria-invalid="!!errors.message"
                class="w-full bg-white border rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-brand/60 resize-none"
                :class="errors.message ? 'border-red-400' : 'border-gray-200 hover:border-gray-300 focus:border-brand/60'"
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
              {{ status === 'loading' ? t('contact.form.sending') : t('contact.form.submit') }}
            </button>
          </div>
        </form>
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
const formSectionRef = ref<HTMLElement>()
const field0Ref = ref<HTMLElement>()
const field1Ref = ref<HTMLElement>()
const field2Ref = ref<HTMLElement>()
const field3Ref = ref<HTMLElement>()
const field4Ref = ref<HTMLElement>()

const { t } = useI18n()

const contactInfo = computed(() => [
  { label: t('contact.hq'), value: t('contact.hqValue'), href: '#' },
  { label: t('contact.email'), value: 'info@celebiaviation.com', href: 'mailto:info@celebiaviation.com' },
  { label: t('contact.phone'), value: '+90 212 000 00 00', href: 'tel:+902120000000' },
])

// ── Form state ────────────────────────────────────────────────────────────────

const form = reactive({ name: '', email: '', subject: '', message: '' })

const errors = reactive({ name: '', email: '', subject: '', message: '' })

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

function validate(): boolean {
  errors.name = form.name.trim() ? '' : t('contact.form.errors.nameRequired')
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : t('contact.form.errors.emailInvalid')
  errors.subject = form.subject.trim() ? '' : t('contact.form.errors.subjectRequired')
  errors.message = form.message.trim().length >= 10 ? '' : t('contact.form.errors.messageMin')
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

})
</script>
