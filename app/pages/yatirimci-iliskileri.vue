<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kurumsal</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Yatırımcı İlişkileri
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">Şeffaf, Hesap Verebilir, Güvenilir.</p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20">
        <div class="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <span class="h-px w-10 bg-brand" />
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Paydaş İlişkileri</span>
            </div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-6">
              Güvenilir Bir Yatırım Ortağı
            </h2>
            <p class="text-white/55 text-[17px] leading-[1.9] mb-8">
              Çelebi Havacılık, tüm paydaşlarıyla şeffaf, dürüst ve sürdürülebilir ilişkiler kurmayı temel ilke olarak benimsemektedir. Yatırımcılarımıza yönelik güncel finansal bilgiler, raporlar ve kurumsal yönetim bilgileri için resmi yatırımcı ilişkileri sitemizi ziyaret edebilirsiniz.
            </p>
            <a
              href="https://celebiyatirimci.com/tr/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
            >
              Yatırımcı Sitesine Git
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="item in highlights" :key="item.label" class="bg-white/[0.03] border border-white/8 rounded-xl p-6 hover:border-brand/30 transition-all duration-300">
              <div class="text-brand font-bold text-2xl mb-2">{{ item.value }}</div>
              <div class="text-white/45 text-sm">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-3 gap-6 border-t border-white/5 pt-16">
          <div v-for="principle in principles" :key="principle.title" class="bg-white/[0.03] border border-white/8 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300">
            <h3 class="text-white font-bold text-lg mb-3">{{ principle.title }}</h3>
            <p class="text-white/45 text-sm leading-relaxed">{{ principle.desc }}</p>
          </div>
        </div>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Yatırımcı İlişkileri | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık yatırımcı ilişkileri — şeffaf, hesap verebilir ve güvenilir paydaş iletişimi.' }] })
const highlights = [
  { value: '1958', label: 'Kuruluş Yılı' },
  { value: '6', label: 'Ülke' },
  { value: '70+', label: 'İstasyon' },
  { value: '15K+', label: 'Çalışan' },
]
const principles = [
  { title: 'Şeffaflık', desc: 'Finansal ve operasyonel bilgilerimizi tüm paydaşlarımızla açık ve zamanında paylaşıyoruz.' },
  { title: 'Hesap Verebilirlik', desc: 'Her kararımızın arkasında durur, sonuçlarına sahip çıkarız.' },
  { title: 'Güvenilirlik', desc: 'Uzun vadeli ilişkiler kurar, verdiğimiz taahhütleri yerine getiririz.' },
]
</script>
