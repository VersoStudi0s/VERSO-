<script setup lang="ts">
import HeroSection from "../sections/HeroSection.vue";
import ServicesSection from "../sections/ServicesSection.vue";
import ProjectsSection from "../sections/ProjectsSection.vue";
import ProcessSection from "../sections/ProcessSection.vue";
import AboutSection from "../sections/AboutSection.vue";
import ContactSection from "../sections/ContactSection.vue";
import TornEdge from "../components/ui/TornEdge.vue";

</script>

<template>
  <HeroSection />
  <ServicesSection />
  <TornEdge color="var(--black)" :variant="2" />
  <ProjectsSection />
  <ProcessSection />
  <TornEdge color="var(--beige)" />
  <AboutSection />
  <TornEdge color="var(--black)" :variant="2" />
  <ContactSection />
</template>
