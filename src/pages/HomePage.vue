<script setup lang="ts">
import { PhAsterisk } from "@phosphor-icons/vue";
import HeroSection from "../sections/HeroSection.vue";
import GithubSection from "../sections/GithubSection.vue";
import ProjectsSection from "../sections/ProjectsSection.vue";
import FeaturedProject from "../sections/FeaturedProject.vue";
import ServicesSection from "../sections/ServicesSection.vue";
import ProcessSection from "../sections/ProcessSection.vue";
import AboutSection from "../sections/AboutSection.vue";
import LabSection from "../sections/LabSection.vue";
import SkillsSection from "../sections/SkillsSection.vue";
import ContactSection from "../sections/ContactSection.vue";
</script>
<template>
  <HeroSection />
  <div class="studio-strip" aria-label="Design, código e identidade">
    <span>Design com intenção</span
    ><PhAsterisk weight="thin" aria-hidden="true" /><span
      >Código com propósito</span
    ><PhAsterisk weight="thin" aria-hidden="true" /><span
      >Identidade em cada detalhe</span
    >
  </div>
  <div class="home-sections">
    <ProjectsSection />
    <GithubSection />
    <ServicesSection />
    <div class="middle-grid"><FeaturedProject /><ProcessSection /></div>
    <AboutSection />
    <LabSection />
    <SkillsSection />
    <ContactSection />
  </div>
</template>
<style scoped>
.home-sections {
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3.5vw, 60px);
}
.studio-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
  padding: 26px var(--gutter);
  font: 11px var(--mono);
  letter-spacing: 0.02em;
  color: var(--muted);
}
.studio-strip svg {
  color: var(--red);
  font-size: 25px;
  flex-shrink: 0;
}
.middle-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: var(--gap);
}
@media (max-width: 1023px) {
  .middle-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 767px) {
  .studio-strip {
    padding: 23px 12px;
    gap: 14px;
    font-size: 11px;
  }
  .studio-strip > span:last-child,
  .studio-strip > svg:last-of-type {
    display: none;
  }
  .studio-strip svg {
    font-size: 20px;
  }
}
</style>
