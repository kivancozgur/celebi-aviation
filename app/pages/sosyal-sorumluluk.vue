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
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Sürdürülebilirlik</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">
          Sosyal Sorumluluk
        </h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
          Eğitimden çevreye, sağlıktan toplum kalkınmasına — Çelebi'nin topluma kattığı değerler.
        </p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">
        <section class="py-20 flex flex-col gap-12">
          <div
            v-for="project in projects"
            :key="project.title"
            class="grid md:grid-cols-2 gap-12 items-start py-12 border-t border-white/5"
          >
            <div>
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase block mb-4">{{ project.category }}</span>
              <h2 class="text-white font-bold text-2xl md:text-3xl leading-tight mb-4">{{ project.title }}</h2>
              <p class="text-white/50 text-base leading-relaxed">{{ project.desc }}</p>
            </div>
            <ul class="flex flex-col gap-3 pt-2 md:pt-12">
              <li v-for="detail in project.details" :key="detail" class="flex items-start gap-3 text-white/55 text-sm">
                <span class="mt-[5px] w-[5px] h-[5px] rounded-full bg-brand flex-none" />
                {{ detail }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Sosyal Sorumluluk | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık sosyal sorumluluk projeleri — eğitim, çevre, sağlık ve toplum kalkınması.' }] })
const projects = [
  {
    category: 'Eğitim',
    title: 'Çelebioğlu Sivil Havacılık Yüksek Okulu',
    desc: 'Erzincan Binali Yıldırım Üniversitesi\'nde kurulan Ali Cavit Çelebioğlu Sivil Havacılık Yüksek Okulu, geleceğin havacılık profesyonellerini yetiştiriyor.',
    details: ['16.000 m² modern kampüs', '28 teknik donanımlı derslik', 'Erasmus uluslararası değişim programları', 'Sektörle entegre staj imkânları'],
  },
  {
    category: 'Sosyal Proje',
    title: '"Evimdeyim" Projesi',
    desc: 'İhtiyaç sahibi öğretmenlere yönelik konut desteği sağlayan "Evimdeyim" projesiyle toplumun her kesimine ulaşıyoruz.',
    details: ['50 öğretmen evi hedefi', '36 öğretmen evine ulaşıldı', 'Eğitime ve öğretmenlere destek misyonu'],
  },
  {
    category: 'Toplum & Çocuk',
    title: '"Bir Şey Değişir, Her Şey Değişir" Kampanyası',
    desc: 'TOÇEV (Türkiye Çocukları Koruma Vakfı) işbirliğiyle hayata geçirilen bu kampanya, dezavantajlı çocuklara umut taşıyor.',
    details: ['TOÇEV işbirliği', 'Okul kırtasiye yardımları', 'Çocukların eğitim hayatına katkı'],
  },
  {
    category: 'Çevre',
    title: 'Yeşil Kuruluş & Çevre Duyarlılığı',
    desc: 'Çevresel sürdürülebilirlik taahhüdümüz kapsamında somut adımlar atıyor, gelecek nesillere daha temiz bir dünya bırakıyoruz.',
    details: ['ISO 14001 Çevre Yönetim Sistemi', 'Dalaman\'da orman dikimi kampanyası', 'Yeşil Kuruluş Belgesi tescili', 'Enerji verimliliği ve atık azaltma programları'],
  },
  {
    category: 'Sağlık',
    title: 'Lokman Hekim Sağlık Vakfı Desteği',
    desc: 'Sağlık alanındaki sosyal sorumluluk çalışmaları kapsamında Lokman Hekim Sağlık Vakfı\'na destek sağlıyoruz.',
    details: ['Sağlık hizmetlerine erişimin desteklenmesi', 'Vakıf faaliyetlerine katkı'],
  },
]
</script>
