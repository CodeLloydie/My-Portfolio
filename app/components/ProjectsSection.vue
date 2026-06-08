<template>
  <section id="projects" ref="sectionRef" class="py-32 px-4 sm:px-8 border-t border-graphite-800 bg-graphite-900 overflow-hidden font-serif">
    <div class="max-w-5xl mx-auto">

      <!-- Header Section -->
      <div :class="['transition-all duration-700 mb-32', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
        <p class="text-graphite-500 text-sm tracking-[0.3em] uppercase mb-5 font-sans">{{ t('projects.label') }}</p>
        <div class="flex items-end justify-between">
          <h2 class="text-graphite-100 text-4xl sm:text-5xl tracking-tight font-serif italic">{{ t('projects.heading') }}</h2>
          <span class="text-graphite-600 text-sm tracking-widest uppercase hidden sm:block font-sans">{{ t('projects.coming_soon') }}</span>
        </div>
      </div>

      <!-- Realistic Folder Stack -->
      <div class="relative w-full flex flex-col pt-12">
        <div
          v-for="(project, pi) in projects"
          :key="project.title"
          class="relative w-full group flex flex-col transition-all duration-700"
          :class="['delay-' + (pi * 100)]"
          :style="{ 
            zIndex: activeProject === pi ? 50 : pi,
            marginTop: getMarginTop(pi)
          }"
        >
          
          <!-- Folder Tab (Sticks out on top) -->
          <button
            @click="toggleProject(pi)"
            class="absolute top-0 h-10 sm:h-12 bg-kraft transition-all duration-300 cursor-pointer z-20 flex items-center justify-center hover:brightness-110"
            :style="{
               left: `${(pi % 4) * 23}%`,
               width: '28%',
               clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
               transform: 'translateY(-100%)'
            }"
          >
            <span class="text-[#3b2a1a] text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.2em] uppercase truncate px-4 opacity-90">
              {{ project.code }} // {{ project.title.replace('Project ', '') }}
            </span>
            <!-- Seamless connection block -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-kraft z-30"></div>
          </button>
          
          <!-- Folder Body -->
          <div 
            class="w-full bg-kraft shadow-[0_-5px_15px_rgba(0,0,0,0.2),0_15px_30px_rgba(0,0,0,0.5)] relative z-10 transition-all duration-500 ease-in-out"
            :class="[
              activeProject === pi ? 'min-h-150 rounded-xl pb-12' : 'h-24 rounded-xl cursor-pointer hover:brightness-105'
            ]"
            :style="{
              borderTopLeftRadius: ((pi % 4) * 23) === 0 ? '0' : '0.75rem',
            }"
            @click="activeProject !== pi && toggleProject(pi)"
          >
            <!-- Skeuomorphic Metal Fastener -->
            <div class="absolute left-4 sm:left-8 top-6 w-3 sm:w-4 h-12 sm:h-20 bg-[#4a3623] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.2)] flex flex-col items-center justify-evenly py-1 sm:py-2 z-30">
              <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1a1109] rounded-full shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>
              <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1a1109] rounded-full shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>
            </div>
            
            <!-- Closed State Preview (Crossfade) -->
            <div 
              class="absolute inset-0 pl-16 sm:pl-24 pr-6 sm:pr-10 flex items-center justify-between transition-opacity duration-300 pointer-events-none"
              :class="activeProject === pi ? 'opacity-0' : 'opacity-100 delay-200'"
            >
               <h3 class="text-[#2c1d0f] text-2xl sm:text-4xl font-serif tracking-tighter opacity-90 mix-blend-multiply">{{ project.title }}</h3>
               <span class="text-[#5a422a] font-serif text-xs sm:text-sm italic tracking-widest">{{ project.vol }}</span>
            </div>
            
            <!-- Open State Content -->
            <div 
              class="w-full h-full pt-10 sm:pt-14 pb-10 pl-16 sm:pl-28 pr-6 sm:pr-12 transition-all duration-500"
              :class="activeProject === pi ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none absolute inset-0 scale-95'"
            >
              
              <div class="flex flex-col gap-12 w-full">
                <!-- Inner Header -->
                <div class="border-b border-[#a8885e] pb-6">
                  <span class="text-[#5a422a] font-serif text-sm italic mb-2 block">PROJECT RECORD // {{ project.vol.replace('VOL ', '0') }}</span>
                  <h2 class="text-4xl sm:text-6xl font-serif text-[#1a1109] uppercase tracking-tighter mix-blend-multiply">{{ project.title.replace('Project ', '') }}</h2>
                </div>

                <div class="flex flex-col md:flex-row gap-12 lg:gap-16">
                  
                  <!-- Left: Image (Styled as a polaroid/document) -->
                  <div class="w-full md:w-5/12">
                    <div class="p-3 pb-8 bg-[#f9f8f6] shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 border border-[#e2ddd3] relative">
                      <!-- Tape effect -->
                      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-2"></div>
                      
                      <template v-if="project.image">
                        <img
                          :src="project.image"
                          :alt="project.title"
                          :class="[
                            'w-full h-auto object-cover border border-gray-200',
                            project.logoOnly ? 'object-contain opacity-70 p-4' : ''
                          ]"
                        />
                      </template>
                      <template v-else>
                        <div class="w-full aspect-video bg-gray-200 flex items-center justify-center">
                          <span class="text-gray-400 text-sm tracking-widest uppercase font-sans">{{ t('projects.preview') }}</span>
                        </div>
                      </template>
                      
                      <div class="mt-4 text-center">
                        <span class="font-serif text-[#8b6b47] text-xs italic">Fig 1. {{ project.title }} Preview</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Right: Info & Tasks -->
                  <div class="w-full md:w-7/12 flex flex-col">
                    <p class="text-[#3b2a1a] text-lg font-serif leading-relaxed mb-10 mix-blend-multiply">{{ project.description }}</p>
                    
                    <h4 class="text-[#1a1109] font-bold font-serif uppercase tracking-widest text-xs sm:text-sm mb-6 border-b border-[#a8885e] pb-2 inline-block self-start">
                      {{ t('projects.tasks_label') }}
                    </h4>
                    <ul class="space-y-4 mb-12">
                      <li v-for="(task, ti) in project.tasks" :key="ti" class="flex items-start gap-4 text-[#3b2a1a] font-serif">
                        <span class="text-[#8b6b47] mt-1 text-xs">✦</span>
                        <span class="leading-relaxed text-sm sm:text-base">{{ rt(task) }}</span>
                      </li>
                    </ul>

                    <!-- Tech Stack Stamps -->
                    <div class="mb-12 flex flex-wrap gap-3">
                      <span
                        v-for="tech in project.tech"
                        :key="tech"
                        class="px-3 py-1 border border-[#8b6b47] text-[#5a422a] font-mono text-[10px] tracking-widest uppercase rounded-sm mix-blend-multiply"
                      >
                        {{ tech }}
                      </span>
                    </div>

                    <!-- Action Links -->
                    <div class="mt-auto flex flex-wrap gap-4">
                      <a
                        v-if="project.liveUrl"
                        :href="project.liveUrl"
                        target="_blank"
                        rel="noopener"
                        class="px-8 py-3 bg-[#1a1109] text-[#c7a77b] font-sans uppercase tracking-[0.2em] text-xs hover:bg-[#3b2a1a] transition-colors shadow-lg"
                      >
                        {{ project.liveLabel === 'figma' ? t('projects.btn_figma') : t('projects.btn_live') }}
                      </a>
                      <a
                        v-if="project.githubUrl"
                        :href="project.githubUrl"
                        target="_blank"
                        rel="noopener"
                        class="px-8 py-3 border-2 border-[#1a1109] text-[#1a1109] font-sans uppercase tracking-[0.2em] text-xs hover:bg-[#1a1109] hover:text-[#c7a77b] transition-colors shadow-lg"
                      >
                        {{ t('projects.btn_github') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import farmcoImg     from '~/assets/imgs/Farmco-pal.png'
import citizenoneImg from '~/assets/imgs/citizenone.png'
import gearupImg     from '~/assets/imgs/Screenshot 2026-04-22 083335.png'

const { t, tm, rt } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

// Set active project to CitizenOne (index 2) by default, or null for all closed
const activeProject = ref<number | null>(2)

const toggleProject = (index: number) => {
  if (activeProject.value === index) {
    activeProject.value = null
  } else {
    activeProject.value = index
  }
}

// Stacking logic
const getMarginTop = (pi: number) => {
  if (pi === 0) return '0';
  // If the folder directly above is open, we need space to not cover its content
  if (activeProject.value === pi - 1) return '2rem';
  // Standard overlap for closed folders to look like a physical stack in a drawer
  return '-3.5rem'; 
}

const projects = computed(() => [
  {
    logoOnly:    false,
    title:       t('projects.gearup_title'),
    description: t('projects.gearup_desc'),
    tech:        ['Figma', 'UI/UX Design', 'Prototyping', 'Mobile Design'],
    tasks:       tm('projects.gearup_tasks') as string[],
    image:       gearupImg,
    liveUrl:     'https://www.figma.com/design/0viUh2V821olPc3tb9VXsC/Apps-Prototype?node-id=37-79&t=eiJ10YNprXA5jdEX-1',
    githubUrl:   null,
    liveLabel:   'figma',
    code:        'CODE_003',
    vol:         'VOL 3'
  },
  {
    logoOnly:    false,
    title:       t('projects.farmcopal_title'),
    description: t('projects.farmcopal_desc'),
    tech:        ['Nuxt', 'Laravel', 'MySQL'],
    tasks:       tm('projects.farmcopal_tasks') as string[],
    image:       farmcoImg,
    liveUrl:     null,
    githubUrl:   null,
    liveLabel:   'in_dev',
    code:        'CODE_002',
    vol:         'VOL 2'
  },
  {
    logoOnly:    false,
    title:       t('projects.citizenone_title'),
    description: t('projects.citizenone_desc'),
    tech:        ['Nuxt', 'Laravel', 'MySQL', 'React Native'],
    tasks:       tm('projects.citizenone_tasks') as string[],
    image:       citizenoneImg,
    liveUrl:     'https://app.citizenone.dk',
    githubUrl:   null,
    liveLabel:   'live',
    code:        'CODE_001',
    vol:         'VOL 1'
  }
])

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<style scoped>
/* Kraft paper texture via inline SVG noise */
.bg-kraft {
  background-color: #cca87c;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E");
}

/* Base transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
