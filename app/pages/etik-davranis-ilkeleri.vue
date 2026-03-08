<template>
  <div class="bg-white min-h-screen text-gray-900 font-inter">
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-900 transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Ana Sayfa<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kurumsal Yönetim</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
          Etik Davranış İlkeleri
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">
          Tüm çalışanlarımız ve iş ortaklarımızla ilişkilerimizde rehber aldığımız 11 temel etik ilke.
        </p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20">
        <!-- TEİD üyelik -->
        <div class="mb-16 p-6 bg-brand/5 border border-brand/20 rounded-xl inline-flex items-center gap-4">
          <div class="text-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p class="text-gray-600 text-sm">Çelebi Havacılık, Türkiye Etik ve İtibar Derneği (TEİD) üyesidir.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-5">
          <div
            v-for="(principle, i) in principles"
            :key="principle.title"
            class="flex items-start gap-5 p-7 bg-gray-50 border border-gray-200 rounded-2xl hover:border-brand/30 transition-all duration-300"
          >
            <div class="w-8 h-8 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center flex-none text-brand font-bold text-sm">
              {{ i + 1 }}
            </div>
            <div>
              <h3 class="text-gray-900 font-bold text-base mb-2">{{ principle.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ principle.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Etik Davranış İlkeleri | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık etik davranış ilkeleri — TEİD üyesi olarak benimsenen 11 temel etik ilke.' }] })
const principles = [
  { title: 'Amaca ve Misyona Bağlılık', desc: 'Şirketin belirlediği misyon ve vizyon doğrultusunda hareket eder, kurumsal amaçlara sadık kalırız.' },
  { title: 'Yasalara ve Hizmet Standartlarına Uyum', desc: 'Faaliyet gösterdiğimiz tüm ülkelerin yasal düzenlemelerine ve uluslararası havacılık standartlarına eksiksiz uyarız.' },
  { title: 'Dürüstlük, Objektiflik ve Eşitlik', desc: 'Tüm iş ve ilişkilerimizde dürüst, tarafsız ve adaletli davranırız; ayrımcılığa yer vermeyiz.' },
  { title: 'Nezaket, Saygı, Onur ve Güven', desc: 'Çalışanlarımıza, müşterilerimize ve iş ortaklarımıza saygı ve güven çerçevesinde yaklaşırız.' },
  { title: 'Kaynakların Verimli Kullanımı', desc: 'Şirket kaynaklarını sorumlu ve verimli biçimde kullanır, israfı önleriz.' },
  { title: 'Bilgi Yönetimi ve Gizlilik', desc: 'Ticari sırları ve kişisel verileri korur; bilgiyi yetkili kişilerle paylaşırız.' },
  { title: 'Profesyonellik', desc: 'İşimizi en yüksek mesleki standartlarda yerine getirir, sürekli gelişimi destekleriz.' },
  { title: 'Çıkar Çatışmalarından Kaçınma', desc: 'Kişisel çıkarların kurumsal çıkarlarla çatışmasına yol açacak durumlardan kaçınırız.' },
  { title: 'Çevreye Saygı', desc: 'Çevresel etkilerimizi en aza indirir, sürdürülebilir iş pratikleri uygularız.' },
  { title: 'Adil İş Uygulamaları', desc: 'Tedarikçi, müşteri ve rakiplerle ilişkilerimizde adil rekabet ilkelerine bağlı kalırız.' },
  { title: 'Medyaya Eşit Mesafe', desc: 'Basın ve medya organlarıyla tarafsız ve şeffaf iletişim kurarız.' },
]
</script>
