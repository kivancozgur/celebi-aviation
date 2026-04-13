<template>
  <div class="min-h-screen font-inter">
    <!-- Hero Slider -->
    <section
      ref="heroRef"
      class="relative min-h-screen overflow-hidden bg-gray-950"
    >
      <div class="absolute inset-0 z-0">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="absolute inset-0 transition-opacity duration-700"
          :class="activeSlide === i ? 'opacity-100' : 'opacity-0'"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/50 to-gray-950/90 z-10"
          />
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        class="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <div
          v-for="(slide, i) in slides"
          :key="'content-' + i"
          class="absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-700"
          :class="
            activeSlide === i
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          "
        >
          <span
            class="text-brand text-[11px] font-medium tracking-[4px] uppercase mb-6"
            >{{ slide.label }}</span
          >
          <h1
            class="text-[clamp(2rem,5vw,4.5rem)] font-bold text-white leading-[1.1] tracking-tight max-w-4xl mb-8"
          >
            {{ slide.title }}
          </h1>
          <p class="text-white/60 text-lg max-w-xl mb-10 leading-relaxed">
            {{ slide.desc }}
          </p>
          <a
            href="#booking"
            class="inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
          >
            {{ slide.cta }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <!-- Slider Controls -->
        <div
          class="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30"
        >
          <button
            @click="prevSlide"
            class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            aria-label="Önceki"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 4L6 8l4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, i) in slides"
              :key="'dot-' + i"
              @click="activeSlide = i"
              class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
              :class="
                activeSlide === i
                  ? 'bg-white w-6'
                  : 'bg-white/30 hover:bg-white/50'
              "
              :aria-label="'Slayt ' + (i + 1)"
            />
          </div>
          <button
            @click="nextSlide"
            class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            aria-label="Sonraki"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Booking Form -->
    <section id="booking" class="bg-white py-20 px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-12">
          <span
            class="text-brand text-[11px] font-medium tracking-[3px] uppercase"
            >Rezervasyon</span
          >
          <h2
            class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mt-3"
          >
            Hizmet Seçin & Rezervasyon Yapın
          </h2>
        </div>

        <div
          class="bg-white border border-gray-200 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <!-- Tabs -->
          <div class="flex border-b border-gray-200 overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex-1 min-w-[140px] relative px-6 py-5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              :class="
                activeTab === tab.id
                  ? 'text-brand'
                  : 'text-gray-400 hover:text-gray-600'
              "
            >
              {{ tab.label }}
              <span
                class="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300"
                :class="activeTab === tab.id ? 'bg-brand' : 'bg-transparent'"
              />
            </button>
          </div>

          <!-- Form Content -->
          <div class="p-8 md:p-10">
            <!-- Meet & Greet -->
            <div
              v-if="activeTab === 'meetgreet'"
              class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Havalimanı</label
                >
                <select
                  v-model="form.airport"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="" disabled>Seçiniz</option>
                  <option v-for="a in airports" :key="a" :value="a">
                    {{ a }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Kullanım Alanı</label
                >
                <select
                  v-model="form.area"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="domestic">Yurt İçi</option>
                  <option value="international">Yurt Dışı</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Hizmet Türü</label
                >
                <select
                  v-model="form.serviceType"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="arrival">Geliş</option>
                  <option value="departure">Gidiş</option>
                  <option value="transit">Transit</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Tarih</label
                >
                <input
                  v-model="form.date"
                  type="date"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Saat</label
                >
                <input
                  v-model="form.time"
                  type="time"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Yetişkin</label
                >
                <select
                  v-model="form.adults"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Çocuk</label
                >
                <select
                  v-model="form.children"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 11" :key="n - 1" :value="n - 1">
                    {{ n - 1 }}
                  </option>
                </select>
              </div>
              <div class="flex items-end">
                <button
                  class="w-full h-12 bg-brand hover:bg-brand/90 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Rezervasyon Yap
                </button>
              </div>
            </div>

            <!-- Fast Track -->
            <div
              v-if="activeTab === 'fasttrack'"
              class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Havalimanı</label
                >
                <select
                  v-model="form.airport"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="" disabled>Seçiniz</option>
                  <option v-for="a in airports" :key="a" :value="a">
                    {{ a }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Kullanım Alanı</label
                >
                <select
                  v-model="form.area"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="domestic">Yurt İçi</option>
                  <option value="international">Yurt Dışı</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Hizmet Türü</label
                >
                <select
                  v-model="form.serviceType"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="arrival">Geliş</option>
                  <option value="departure">Gidiş</option>
                  <option value="transit">Transit</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Tarih</label
                >
                <input
                  v-model="form.date"
                  type="date"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Saat</label
                >
                <input
                  v-model="form.time"
                  type="time"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Yetişkin</label
                >
                <select
                  v-model="form.adults"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Çocuk</label
                >
                <select
                  v-model="form.children"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 11" :key="n - 1" :value="n - 1">
                    {{ n - 1 }}
                  </option>
                </select>
              </div>
              <div class="flex items-end">
                <button
                  class="w-full h-12 bg-brand hover:bg-brand/90 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Rezervasyon Yap
                </button>
              </div>
            </div>

            <!-- Lounge -->
            <div
              v-if="activeTab === 'lounge'"
              class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Havalimanı</label
                >
                <select
                  v-model="form.airport"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="" disabled>Seçiniz</option>
                  <option value="Çukurova">Çukurova</option>
                  <option value="Diyarbakır">Diyarbakır</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Kullanım Alanı</label
                >
                <select
                  v-model="form.area"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="domestic">Yurt İçi</option>
                  <option value="international">Yurt Dışı</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Hizmet Türü</label
                >
                <select
                  v-model="form.serviceType"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="departure">Gidiş</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Tarih</label
                >
                <input
                  v-model="form.date"
                  type="date"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Yetişkin</label
                >
                <select
                  v-model="form.adults"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Çocuk</label
                >
                <select
                  v-model="form.children"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 11" :key="n - 1" :value="n - 1">
                    {{ n - 1 }}
                  </option>
                </select>
              </div>
              <div class="flex items-end lg:col-span-2">
                <button
                  class="w-full h-12 bg-brand hover:bg-brand/90 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Rezervasyon Yap
                </button>
              </div>
            </div>

            <!-- Package -->
            <div
              v-if="activeTab === 'package'"
              class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Paket Türü</label
                >
                <select
                  v-model="form.packageType"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="mfl">
                    Meet & Greet + Fast Track + Lounge
                  </option>
                  <option value="fl">Fast Track + Lounge</option>
                  <option value="ml">Meet & Greet + Lounge</option>
                  <option value="mf">Meet & Greet + Fast Track</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Havalimanı</label
                >
                <select
                  v-model="form.airport"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="Çukurova">Çukurova</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Kullanım Alanı</label
                >
                <select
                  v-model="form.area"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="domestic">Yurt İçi</option>
                  <option value="international">Yurt Dışı</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Hizmet Türü</label
                >
                <select
                  v-model="form.serviceType"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option value="departure">Gidiş</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Yetişkin</label
                >
                <select
                  v-model="form.adults"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label
                  class="text-xs font-medium text-gray-500 tracking-wide uppercase"
                  >Çocuk</label
                >
                <select
                  v-model="form.children"
                  class="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                >
                  <option v-for="n in 11" :key="n - 1" :value="n - 1">
                    {{ n - 1 }}
                  </option>
                </select>
              </div>
              <div class="flex items-end lg:col-span-2">
                <button
                  class="w-full h-12 bg-brand hover:bg-brand/90 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Rezervasyon Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="bg-gray-50 py-24 px-6 md:px-12 lg:px-20">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <span
            class="text-brand text-[11px] font-medium tracking-[3px] uppercase"
            >Hizmetlerimiz</span
          >
          <h2
            class="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-gray-900 leading-tight tracking-tight mt-3"
          >
            Çelebi Platinum Ayrıcalıkları
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            class="group bg-white border border-gray-200 rounded-2xl p-10 hover:border-brand/30 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors duration-300"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                class="text-brand"
              >
                <path :d="service.iconPath" />
              </svg>
            </div>
            <h3
              class="text-gray-900 font-bold text-xl mb-3 group-hover:text-brand transition-colors duration-300"
            >
              {{ service.title }}
            </h3>
            <p class="text-gray-500 text-[15px] leading-relaxed mb-6">
              {{ service.desc }}
            </p>
            <a
              href="#booking"
              class="inline-flex items-center gap-2 text-brand text-sm font-medium hover:gap-3 transition-all duration-300"
            >
              Detay
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-white py-20 px-6 md:px-12 lg:px-20">
      <div class="max-w-full mx-auto">
        <div
          class="flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#003DA5] to-[#001A4D] rounded-2xl p-10 md:p-16 text-white"
        >
          <!-- Avatar pill -->
          <div
            class="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm mb-8"
          >
            <div class="flex items-center">
              <img
                class="w-7 h-7 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                alt="Yolcu 1"
              />
              <img
                class="w-7 h-7 rounded-full border-2 border-white object-cover -translate-x-2"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                alt="Yolcu 2"
              />
              <img
                class="w-7 h-7 rounded-full border-2 border-white object-cover -translate-x-4"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                alt="Yolcu 3"
              />
            </div>
            <span class="font-medium -translate-x-2"
              >Binlerce yolcunun tercih ettiği ayrıcalıklı hizmet</span
            >
          </div>

          <!-- Heading -->
          <h2
            class="text-4xl md:text-5xl md:leading-[1.2] font-semibold max-w-xl mb-6"
            style="
              background: linear-gradient(to right, #ffffff, #a8c4ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            "
          >
            Platinum Deneyimini Keşfedin
          </h2>

          <p class="text-white/60 text-base leading-relaxed max-w-lg mb-10">
            Çelebi Platinum hizmetleri ile havalimanı deneyiminizi ayrıcalıklı
            hale getirin. Meet & Greet, Fast Track ve Lounge ayrıcalıklarından
            yararlanın.
          </p>

          <!-- Store buttons -->
          <div class="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              class="inline-flex items-center gap-2 h-11 px-5 bg-white hover:bg-white/90 text-gray-900 rounded-md font-medium transition-colors duration-300"
            >
              <svg
                class="w-5 h-5 flex-none"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g>
                  <path
                    d="M18.546,12.763c0.024-1.87,1.004-3.597,2.597-4.576c-1.009-1.442-2.64-2.323-4.399-2.378    c-1.851-0.194-3.645,1.107-4.588,1.107c-0.961,0-2.413-1.088-3.977-1.056C6.122,5.927,4.25,7.068,3.249,8.867    c-2.131,3.69-0.542,9.114,1.5,12.097c1.022,1.461,2.215,3.092,3.778,3.035c1.529-0.063,2.1-0.975,3.945-0.975    c1.828,0,2.364,0.975,3.958,0.938c1.64-0.027,2.674-1.467,3.66-2.942c0.734-1.041,1.299-2.191,1.673-3.408    C19.815,16.788,18.548,14.879,18.546,12.763z"
                  />
                  <path
                    d="M15.535,3.847C16.429,2.773,16.87,1.393,16.763,0c-1.366,0.144-2.629,0.797-3.535,1.829    c-0.895,1.019-1.349,2.351-1.261,3.705C13.352,5.548,14.667,4.926,15.535,3.847z"
                  />
                </g>
              </svg>
              <div
                class="text-left flex flex-col items-start justify-center pr-2"
              >
                <span
                  class="text-[10px] leading-none font-light tracking-tighter"
                  >Download on the</span
                >
                <p class="text-base font-bold leading-none">App Store</p>
              </div>
            </a>

            <a
              href="#"
              class="inline-flex items-center gap-2 h-11 px-5 bg-white hover:bg-white/90 text-gray-900 rounded-md font-medium transition-colors duration-300"
            >
              <svg
                class="w-5 h-5 flex-none"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="m21.762,9.942L4.67.378c-.721-.466-1.635-.504-2.393-.099-.768.411-1.246,1.208-1.246,2.08v19.282c0,.872.477,1.668,1.246,2.079.755.404,1.668.37,2.393-.098l17.092-9.564c.756-.423,1.207-1.192,1.207-2.058s-.451-1.635-1.207-2.058Zm-5.746-1.413l-2.36,2.36L5.302,2.534l10.714,5.995ZM2.604,21.906V2.094l9.941,9.906L2.604,21.906Zm2.698-.439l8.355-8.355,2.36,2.36-10.714,5.995Zm15.692-8.78l-3.552,1.987-2.674-2.674,2.674-2.674,3.552,1.987c.363.203.402.548.402.686s-.039.483-.402.686Z"
                />
              </svg>
              <div
                class="text-left flex flex-col items-start justify-center pr-2"
              >
                <span
                  class="text-[10px] leading-none font-light tracking-tighter"
                  >GET IT ON</span
                >
                <p class="text-base font-bold leading-none">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <div class="h-20" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

useHead({
  title: "Çelebi Platinum — VIP Havalimanı Hizmetleri",
  meta: [
    {
      name: "description",
      content:
        "Çelebi Platinum ile Meet & Greet, Fast Track ve Lounge ayrıcalıklarından yararlanın. Türkiye genelinde 30+ havalimanında VIP hizmet.",
    },
  ],
});

const heroRef = ref<HTMLElement>();
const activeSlide = ref(0);

const slides = [
  {
    label: "Çelebi Platinum",
    title: "Özel Çelebi Platinum Lounge Deneyimini Yaşayın",
    desc: "Çukurova ve Diyarbakır Havalimanlarında ayrıcalıklı yolcu salonlarımızda konforun tadını çıkarın.",
    cta: "Detaylar",
    image: "/images/meet-and-greet.jpg",
  },
  {
    label: "Çelebi Platinum",
    title: "Çelebi Platinum Fast Track ile Beklemeye Son!",
    desc: "Geliş ve gidişte güvenlik ve pasaport kontrolünde öncelikli geçiş ayrıcalığının keyfini sürün.",
    cta: "Detaylar",
    image: "/images/aviation.jpg",
  },
];

let slideInterval: ReturnType<typeof setInterval> | null = null;

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % slides.length;
}

function prevSlide() {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length;
}

function startAutoplay() {
  stopAutoplay();
  slideInterval = setInterval(nextSlide, 6000);
}

function stopAutoplay() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

const activeTab = ref("meetgreet");

const tabs = [
  { id: "meetgreet", label: "Meet & Greet" },
  { id: "fasttrack", label: "Fast Track" },
  { id: "lounge", label: "Lounge" },
  { id: "package", label: "Paket" },
];

const form = reactive({
  airport: "",
  area: "domestic",
  serviceType: "arrival",
  date: "",
  time: "",
  adults: 1,
  children: 0,
  packageType: "mfl",
});

const airports = [
  "İstanbul",
  "Antalya",
  "Sabiha Gökçen",
  "Bingöl",
  "Bodrum",
  "Bursa",
  "Çanakkale",
  "Çorlu",
  "Çukurova",
  "Dalaman",
  "Denizli",
  "Diyarbakır",
  "Edremit",
  "Erzincan",
  "Erzurum",
  "Esenboğa",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İzmir",
  "Kahramanmaraş",
  "Kars",
  "Kayseri",
  "Kocaeli",
  "Malatya",
  "Mardin",
  "Rize",
  "Samsun",
  "Trabzon",
  "Uşak",
  "Van",
  "Yüksekova",
];

const services = [
  {
    title: "Meet & Greet",
    desc: "Çelebi Platinum ekibi seyahat deneyiminizi kolaylaştırmak ve kendinizi daha iyi hissettirmek için sizi karşılar.",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Fast Track",
    desc: "Geliş ve gidişte 'Fast Track' ayrıcalığını keşfedin. Güvenlik ve pasaport kontrollerinde öncelikli geçiş hakkı.",
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    title: "Lounge",
    desc: "Çukurova ve Diyarbakır Havalimanlarında Çelebi tarafından işletilen özel Platinum yolcu salonlarımızda ağırlanın.",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
];

onMounted(() => {
  startAutoplay();

  gsap.from(heroRef.value!, {
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });
});

onUnmounted(() => {
  stopAutoplay();
});
</script>
