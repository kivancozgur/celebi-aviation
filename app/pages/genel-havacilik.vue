<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />

    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Hizmetler</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Genel Havacılık
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Özel, askeri, devlet ve tarifesiz uçuşlar için kapsamlı FBO ve genel havacılık hizmetleri.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Intro -->
        <section class="py-20 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <span class="h-px w-10 bg-brand" />
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Genel Havacılık</span>
            </div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight">
              Her Uçuş Türüne Özel Çözüm
            </h2>
          </div>
          <p class="text-white/55 text-[17px] leading-[1.9] pt-2">
            Özel jet operasyonlarından devlet uçuşlarına, acil tahliyelerden askeri operasyonlara kadar her türlü genel havacılık ihtiyacına profesyonel çözümler sunuyoruz. Deneyimli ekibimiz, operasyonunuzun her aşamasında yanınızdadır.
          </p>
        </section>

        <!-- Services Grid -->
        <section class="py-8 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Hizmet Listesi</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="service in services"
              :key="service.title"
              class="bg-white/[0.03] border border-white/8 rounded-xl p-6 hover:border-brand/30 transition-all duration-300 group"
            >
              <div class="text-brand mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path :d="service.iconPath" />
                </svg>
              </div>
              <h3 class="text-white font-semibold text-sm mb-2 group-hover:text-brand transition-colors duration-300">{{ service.title }}</h3>
              <p class="text-white/40 text-xs leading-relaxed">{{ service.desc }}</p>
            </div>
          </div>
        </section>

        <!-- Uçuş Türleri -->
        <section class="py-16 border-t border-white/5">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Uçuş Türleri</span>
          </div>
          <div class="grid md:grid-cols-4 gap-6">
            <div v-for="type in flightTypes" :key="type" class="py-6 border-t-2 border-brand/30">
              <p class="text-white font-semibold">{{ type }}</p>
            </div>
          </div>
        </section>

        <!-- Ödeme CTA -->
        <section class="py-16 border-t border-white/5">
          <div class="bg-white/[0.03] border border-white/8 rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 class="text-white font-bold text-3xl md:text-4xl leading-tight mb-3">Hızlı Teklif Alın</h2>
              <p class="text-white/45 text-base leading-relaxed max-w-lg">Genel havacılık operasyonunuz için online ödeme ve teklif imkânı.</p>
            </div>
            <NuxtLink to="/#contact" class="flex-none inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap">
              İletişime Geç
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </NuxtLink>
          </div>
        </section>

      </div>
    </main>
    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Genel Havacılık | Çelebi Havacılık',
  meta: [{ name: 'description', content: 'Özel jet, devlet, askeri ve acil uçuşlar için FBO ve genel havacılık hizmetleri — slot/permit, yakıt, apron transferi ve daha fazlası.' }],
})

const services = [
  { title: 'Slot & Permit Yönetimi', desc: 'İniş izni ve slot başvuru süreçlerinin eksiksiz takibi.', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Apron Transferi', desc: 'Terminalden uçağa güvenli ve konforlu apron taşımacılığı.', iconPath: 'M5 12h14M12 5l7 7-7 7' },
  { title: 'Uçuş Plan Yönetimi', desc: 'Uçuş planlarının hazırlanması, sunulması ve koordinasyonu.', iconPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { title: 'Gözetim & Temsil', desc: 'Havalimanında 7/24 uçuş ve operasyon gözetimi.', iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { title: 'Araç & Limuzin', desc: 'Havalimanı transfer ve VIP ulaşım hizmetleri.', iconPath: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 6l3 4h4l1 3H3l1-3h4l3-4h2zM5 17H3v-3h18v3h-2' },
  { title: 'Yakıt & İkram', desc: 'Jet yakıt temini ve uçuş içi ikram koordinasyonu.', iconPath: 'M12 2a5 5 0 015 5v2H7V7a5 5 0 015-5zM3 14h18l-2 7H5l-2-7z' },
  { title: 'GPU (Harici Güç)', desc: 'Yer güç ünitesi bağlantısı ve elektrik desteği.', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: 'Uçak Temizliği', desc: 'Kabin ve dış yüzey temizlik hizmetleri.', iconPath: 'M4.5 12.75l6 6 9-13.5' },
  { title: 'Tuvalet Servisi', desc: 'Uçak tuvalet boşaltma ve temizlik hizmetleri.', iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { title: 'Park & Çekme', desc: 'Uçak park yeri tahsisi ve çekme hizmetleri.', iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
]

const flightTypes = ['Özel Uçuşlar', 'Askeri Uçuşlar', 'Devlet Uçuşları', 'Acil & Ambulans Uçuşları']
</script>
