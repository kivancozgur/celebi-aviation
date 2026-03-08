<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white font-inter">
    <AppNav />
    <header class="pt-36 pb-20 px-6 md:px-12 lg:px-20 border-b border-white/5">
      <div class="max-w-screen-xl mx-auto">
        <NuxtLink to="/kariyer" class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors duration-300 mb-10 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span class="relative">Kariyer<span class="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" /></span>
        </NuxtLink>
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-brand" />
          <span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Kariyer</span>
        </div>
        <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight tracking-tight max-w-3xl">İK Politikaları</h1>
        <p class="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">Çelebi'de çalışmanın anlamı, insan kaynakları yaklaşımımız ve işe alım ilkelerimiz.</p>
      </div>
    </header>
    <main class="px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto py-20 flex flex-col gap-16">

        <section class="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div class="flex items-center gap-3 mb-6"><span class="h-px w-10 bg-brand" /><span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Çelebi'de Çalışmak</span></div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-6">İşyeri Kültürümüz</h2>
            <p class="text-white/55 text-[17px] leading-[1.9]">Çelebi Havacılık'ta her çalışan, küresel bir aile üyesi olarak değer görür. Çeşitliliği güç, iş birliğini temel, gelişimi sürekli bir süreç olarak kabul eden bir kültürde çalışıyoruz.</p>
          </div>
          <ul class="flex flex-col gap-4">
            <li v-for="item in culture" :key="item" class="flex items-start gap-3 text-white/60 text-base bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:border-brand/30 transition-all duration-300">
              <span class="mt-[6px] w-[6px] h-[6px] rounded-full bg-brand flex-none" />{{ item }}
            </li>
          </ul>
        </section>

        <section class="border-t border-white/5 pt-16 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div class="flex items-center gap-3 mb-6"><span class="h-px w-10 bg-brand" /><span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">İşe Alım</span></div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-6">Eşit Fırsat İlkesi</h2>
            <p class="text-white/55 text-[17px] leading-[1.9]">Tüm adaylara dil, din, ırk, cinsiyet veya yaş ayrımı gözetmeksizin eşit değerlendirme yapıyoruz. Yetkinlik ve potansiyel, tek kriterimizdir.</p>
          </div>
          <div>
            <div class="flex items-center gap-3 mb-6"><span class="h-px w-10 bg-brand" /><span class="text-brand text-[11px] font-medium tracking-[3px] uppercase">Performans</span></div>
            <h2 class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight tracking-tight mb-6">Yetenek & Gelişim</h2>
            <p class="text-white/55 text-[17px] leading-[1.9]">Yıllık performans değerlendirme süreçleri, kariyer gelişim planları ve iç atama önceliklendirmesiyle çalışanlarımızın büyümesini destekliyoruz.</p>
          </div>
        </section>

        <!-- Uyarı -->
        <div class="border border-amber-500/20 bg-amber-500/5 rounded-xl p-6">
          <div class="flex items-start gap-3">
            <svg class="text-amber-500 flex-none mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
            <p class="text-amber-200/70 text-sm leading-relaxed"><strong class="text-amber-400">Önemli Uyarı:</strong> Çelebi Havacılık adına yapılan sahte iş ilanlarına karşı dikkatli olunuz. Resmi başvurular yalnızca kurumsal kariyer portalımız üzerinden alınmaktadır. Şüpheli bir ilan gördüğünüzde lütfen hr@celebiaviation.com adresine bildirin.</p>
          </div>
        </div>

      </div>
    </main>
    <div class="h-20" />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'İK Politikaları | Çelebi Havacılık', meta: [{ name: 'description', content: 'Çelebi Havacılık insan kaynakları politikaları — işyeri kültürü, eşit fırsat, performans yönetimi ve yetenek geliştirme.' }] })
const culture = [
  'Kapsayıcı ve çeşitli çalışma ortamı',
  'Sürekli öğrenme ve gelişim fırsatları',
  'Güçlü liderlik ve koçluk kültürü',
  'Sektörel uzmanlık ve bilgi paylaşımı',
  'Esnek çalışma modelleri',
  'Ekip çalışması ve ortak başarı anlayışı',
]
</script>
