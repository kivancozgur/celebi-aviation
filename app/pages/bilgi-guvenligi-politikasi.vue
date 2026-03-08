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
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Politikalar</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-gray-900 leading-tight tracking-tight max-w-3xl">
          Bilgi Güvenliği Politikası
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mt-6 max-w-2xl">
          ISO 27001 sertifikalı Bilgi Güvenliği Yönetim Sistemi çerçevesinde veri güvenliği taahhütlerimiz.
        </p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20">
        <!-- ISO 27001 badge -->
        <div class="mb-16 p-6 bg-brand/5 border border-brand/20 rounded-xl inline-flex items-center gap-4">
          <div class="text-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <p class="text-gray-600 text-sm">ISO 27001 Bilgi Güvenliği Yönetim Sistemi Sertifikalı</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="policy in policies"
            :key="policy.title"
            class="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-brand/30 transition-all duration-300"
          >
            <div class="text-brand mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path :d="policy.iconPath" />
              </svg>
            </div>
            <h3 class="text-gray-900 font-bold text-base mb-3">{{ policy.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ policy.desc }}</p>
          </div>
        </div>

        <!-- Uyarı -->
        <div class="mt-12 p-6 bg-white/[0.02] border border-gray-100 rounded-xl">
          <p class="text-gray-400 text-sm leading-relaxed">
            Bu politikaya aykırı davranışlar, şirket disiplin prosedürleri ve ilgili yasal mevzuat kapsamında değerlendirilir. Tüm çalışanlarımız bu politikayı okuyup kabul etmekle yükümlüdür.
          </p>
        </div>
      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Bilgi Güvenliği Politikası | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık bilgi güvenliği politikası — ISO 27001 sertifikalı, gizlilik, bütünlük ve erişilebilirlik taahhütleri.' }] })
const policies = [
  { title: 'Risk Değerlendirme ve Önlem Alma', desc: 'Bilgi varlıklarımıza yönelik riskleri düzenli olarak değerlendirir, uygun teknik ve idari önlemleri alırız.', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { title: 'Gizlilik, Bütünlük ve Erişilebilirlik', desc: 'Bilgilerin yalnızca yetkili kişilerce erişilmesini, değiştirilmemesini ve ihtiyaç anında erişilebilir olmasını sağlarız.', iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Katmanlı Güvenlik Mimarisi', desc: 'Güvenlik duvarı, IDS/IPS, şifreleme ve erişim kontrolü gibi çok katmanlı güvenlik önlemleriyle sistemlerimizi koruruz.', iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
  { title: 'Güvenlik Güncellemeleri & Yama Yönetimi', desc: 'Tüm sistem ve yazılımlarımız düzenli olarak güncellenir; güvenlik açıkları en kısa sürede kapatılır.', iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { title: 'Bilgi Sınıflandırma Politikası', desc: 'Bilgi varlıklarımız gizlilik düzeyine göre sınıflandırılır ve her sınıf için uygun koruma önlemleri uygulanır.', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Yıllık Sızma Testi & Farkındalık Eğitimi', desc: 'Yılda en az bir kez bağımsız sızma testi yapılır; tüm çalışanlar düzenli bilgi güvenliği farkındalık eğitimlerinden geçer.', iconPath: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
]
</script>
