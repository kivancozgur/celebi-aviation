<template>
  <main class="bg-white min-h-screen font-inter">
    <SectionHero />
    <SectionAbout />
    <SectionServices />
    <SectionStats />
    <SectionStatsHero />
    <SectionNews />
    <SectionCareers />
    <SectionContact />

    <!-- Mobile menu overlay -->
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Çelebi Havacılık — Global Havacılık Hizmetleri',
  meta: [
    {
      name: 'description',
      content:
        'Dünya genelinde 4 ülkede, 60+ havalimanında yer hizmetleri, kargo, genel havacılık ve premium çözümler.',
    },
  ],
})
</script>
