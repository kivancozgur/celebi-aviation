<template>
  <div class="bg-white min-h-screen text-gray-900 font-inter">

    <!-- Page Header -->
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-900 transition-colors duration-300 mb-10 group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="relative">
            Ana Sayfa
            <span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          </span>
        </NuxtLink>

        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kurumsal</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
          1958'den Bu Yana Havacılığın Kalbinde
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">
          Çelebi Havacılık, dünya standartlarında hizmet kalitesiyle 6 ülkede, 70'ten fazla istasyonda, 15.000'i aşkın çalışanıyla havacılık sektörüne yön vermektedir.
        </p>
      </div>
    </header>

    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">

        <!-- Stats Grid -->
        <section class="py-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden my-16">
          <div v-for="stat in stats" :key="stat.label" class="bg-white flex flex-col items-center justify-center py-12 px-6 text-center">
            <div class="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-brand leading-none mb-2">{{ stat.value }}</div>
            <div class="text-gray-400 text-sm tracking-[1px] uppercase">{{ stat.label }}</div>
          </div>
        </section>

        <!-- Şirket Tanıtımı -->
        <section class="py-16 grid md:grid-cols-2 gap-16 items-start border-t border-gray-100">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <span class="h-px w-10 bg-brand" />
              <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Biz Kimiz</span>
            </div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">
              3 Kıtada Güçlü Varlık
            </h2>
          </div>
          <div class="text-gray-500 text-[17px] leading-[1.9] space-y-4 pt-2">
            <p>
              Çelebi Havacılık, 1958 yılında Türkiye'de kurulan ve bugün Avrupa, Asya ve Orta Doğu'da faaliyet gösteren global bir havacılık hizmetleri şirketidir.
            </p>
            <p>
              Yer hizmetleri, kargo ve antrepo, genel havacılık, lounge ve premium hizmetler başta olmak üzere havacılığın her alanında kapsamlı çözümler sunmaktayız. 70'i aşkın istasyonumuz ve 15.000'den fazla uzman çalışanımızla her gün yüzlerce havayoluna hizmet veriyoruz.
            </p>
            <p>
              Cesaret, pragmatizm ve sürekli gelişme anlayışıyla sektörün öncü kuruluşlarından biri olmaya devam ediyoruz.
            </p>
          </div>
        </section>

        <!-- Kilometre Taşları -->
        <section class="py-16 border-t border-gray-100">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Tarihimiz</span>
          </div>
          <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mb-14">
            Kilometre Taşları
          </h2>

          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-[120px] md:left-[160px] top-0 bottom-0 w-px bg-white/8" />

            <div class="flex flex-col gap-12">
              <div
                v-for="milestone in milestones"
                :key="milestone.year"
                class="flex items-start gap-8 md:gap-16"
              >
                <div class="w-[100px] md:w-[130px] flex-none text-right">
                  <span class="text-brand text-[22px] font-bold tracking-tight">{{ milestone.year }}</span>
                </div>
                <div class="relative flex-1 pl-8 md:pl-12 pb-4">
                  <!-- Dot -->
                  <div class="absolute left-[-5px] top-[6px] w-[10px] h-[10px] rounded-full bg-brand" />
                  <h3 class="text-gray-900 font-semibold text-base mb-1">{{ milestone.title }}</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">{{ milestone.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Misyon Vizyon Değerler -->
        <section class="py-16 border-t border-gray-100">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">İlkelerimiz</span>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="item in values"
              :key="item.title"
              class="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300"
            >
              <div class="text-brand mb-4">
                <svg v-if="item.icon === 'mission'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
                </svg>
                <svg v-else-if="item.icon === 'vision'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 class="text-gray-900 font-bold text-xl mb-3">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <!-- Kalite & Emniyet - Sertifikalar -->
        <section class="py-16 border-t border-gray-100">
          <div class="flex items-center gap-3 mb-12">
            <span class="h-px w-10 bg-brand" />
            <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kalite & Emniyet</span>
          </div>
          <div class="grid md:grid-cols-2 gap-16 items-start mb-14">
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Uluslararası Standartlarda Sertifikalı
            </h2>
            <p class="text-gray-500 text-[17px] leading-[1.9] pt-2">
              Tüm operasyonlarımız uluslararası havacılık güvenlik ve kalite standartlarına uygun şekilde yürütülmektedir. Aşağıdaki sertifikalar, kalite taahhüdümüzün somut göstergesidir.
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="cert in certificates"
              :key="cert.name"
              class="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-2 hover:border-brand/30 transition-all duration-300"
            >
              <span class="text-brand font-bold text-lg">{{ cert.name }}</span>
              <span class="text-gray-400 text-xs leading-relaxed">{{ cert.desc }}</span>
            </div>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer spacer -->
    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Hakkımızda | Çelebi Havacılık',
  meta: [
    {
      name: 'description',
      content: '1958\'den bu yana havacılığın kalbinde yer alan Çelebi Havacılık — misyon, vizyon, kilometre taşları ve sertifikalar.',
    },
  ],
})

const stats = [
  { value: '1958', label: 'Kuruluş Yılı' },
  { value: '15.000+', label: 'Çalışan' },
  { value: '70+', label: 'İstasyon' },
  { value: '6', label: 'Ülke' },
]

const milestones = [
  { year: '1958', title: 'Kuruluş', desc: 'Çelebi Havacılık, İstanbul\'da yer hizmetleri alanında faaliyetlerine başladı.' },
  { year: '1975', title: 'Kargo Operasyonları', desc: 'Hava kargo ve antrepo hizmetleri portföye eklendi.' },
  { year: '1990', title: 'Uluslararası Genişleme', desc: 'Yurt dışı operasyonlarıyla uluslararası arenaya adım atıldı.' },
  { year: '2000', title: 'Lounge Hizmetleri', desc: 'Premium yolcu deneyimi için lounge operasyonları başlatıldı.' },
  { year: '2008', title: '50. Yıl & ISO Sertifikaları', desc: 'Kuruluşun 50. yılında ISO9001 ve ISO14001 sertifikaları alındı.' },
  { year: '2012', title: 'ISAGO Sertifikasyonu', desc: 'IATA Yer Hizmetleri Güvenlik Denetimi (ISAGO) sertifikası kazanıldı.' },
  { year: '2018', title: 'Global Büyüme', desc: '3 kıtada 70+ istasyon ve 15.000+ çalışan ile rekor büyüme.' },
]

const values = [
  {
    icon: 'mission',
    title: 'Misyon',
    desc: 'Havacılık sektöründe güvenli, güvenilir ve yenilikçi yer hizmetleri sunarak müşterilerimizin operasyonel mükemmelliğine katkı sağlamak.',
  },
  {
    icon: 'vision',
    title: 'Vizyon',
    desc: 'Dünyanın en saygın ve tercih edilen yer hizmetleri şirketi olmak; sürdürülebilir büyüme ile sektöre liderlik etmek.',
  },
  {
    icon: 'values',
    title: 'Değerlerimiz',
    desc: 'Güvenlik, kalite, dürüstlük, inovasyon ve insan odaklılık; tüm operasyonlarımızın temel taşlarıdır.',
  },
]

const certificates = [
  { name: 'ISAGO', desc: 'IATA Yer Hizmetleri Güvenlik Denetimi' },
  { name: 'ISO 9001', desc: 'Kalite Yönetim Sistemi' },
  { name: 'ISO 14001', desc: 'Çevre Yönetim Sistemi' },
  { name: 'OHSAS 18001', desc: 'İş Sağlığı ve Güvenliği' },
  { name: 'RA3', desc: 'Onaylı Hava Kargo Acente Sertifikası' },
  { name: 'ISO 27001', desc: 'Bilgi Güvenliği Yönetim Sistemi' },
  { name: 'CIEV', desc: 'Ekipman Doğrulama Sertifikası' },
  { name: 'PAS 99', desc: 'Entegre Yönetim Sistemi' },
]
</script>
