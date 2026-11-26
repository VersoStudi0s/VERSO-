<script setup lang="ts">
import HeroSection from "../sections/HeroSection.vue";
import ServicesSection from "../sections/ServicesSection.vue";
import ProjectsSection from "../sections/ProjectsSection.vue";
import ProcessSection from "../sections/ProcessSection.vue";
import AboutSection from "../sections/AboutSection.vue";
import ContactSection from "../sections/ContactSection.vue";
import TornEdge from "../components/ui/TornEdge.vue";
import { useReveal } from "../composables/useReveal";

useReveal();
</script>

<template>
  <HeroSection />
  <TornEdge color="var(--graphite)" />
  <ServicesSection />
  <TornEdge color="var(--ink)" :variant="2" />
  <ProjectsSection />
  <TornEdge color="var(--graphite)" />
  <ProcessSection />
  <TornEdge color="var(--ink)" :variant="2" />
  <AboutSection />
  <TornEdge color="var(--graphite)" />
  <ContactSection />
</template>
