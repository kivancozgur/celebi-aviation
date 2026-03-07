<template>
  <main class="bg-dark min-h-screen font-inter">
    <AppNav @menu="menuOpen = !menuOpen" />
    <SectionHero />
    <SectionServices />
    <SectionAbout />
    <SectionAircraft />
    <SectionContact />

    <!-- Mobile menu overlay -->
    <AppMenu :open="menuOpen" @close="menuOpen = false" />
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

const menuOpen = ref(false)
</script>
