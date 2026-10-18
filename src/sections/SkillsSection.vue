<script setup lang="ts">
import { ref, computed } from "vue";
const group = ref("Em prática");
const skills = [
  { name: "HTML", status: "Em prática" },
  { name: "CSS", status: "Em prática" },
  { name: "JavaScript", status: "Em prática" },
  { name: "Git", status: "Em prática" },
  { name: "TypeScript", status: "Desenvolvendo" },
  { name: "Vue.js", status: "Desenvolvendo" },
  { name: "UI/UX", status: "Desenvolvendo" },
  { name: "Figma", status: "Desenvolvendo" },
  { name: "React", status: "Em estudo" },
  { name: "Photoshop", status: "Em estudo" },
  { name: "Illustrator", status: "Em estudo" },
  { name: "Python", status: "Em estudo" },
];
const visible = computed(() =>
  skills.filter((skill) => skill.status === group.value),
);
</script>
<template>
  <section
    class="skills frame section-pad reveal"
    aria-labelledby="skills-title"
  >
    <div class="section-topline">
      <h2 id="skills-title" class="eyebrow">Meu repertório</h2>
      <span class="section-number">[06]</span>
    </div>
    <div class="skill-tabs" role="group" aria-label="Etapa de aprendizagem">
      <button
        v-for="status in ['Em prática', 'Desenvolvendo', 'Em estudo']"
        :key="status"
        :aria-pressed="group === status"
        :class="{ active: group === status }"
        @click="group = status"
      >
        {{ status }}
      </button>
    </div>
    <div class="skill-list" aria-live="polite">
      <span v-for="skill in visible" :key="skill.name">{{ skill.name }}</span>
    </div>
    <p class="micro">Aprender. Experimentar. Evoluir.</p>
  </section>
</template>
<style scoped>
.skills {
  padding-top: 27px;
  padding-bottom: 24px;
}
.skills .section-topline {
  margin-bottom: 14px;
}
.skill-tabs {
  display: flex;
  gap: 17px;
  margin-bottom: 16px;
}
.skill-tabs button {
  padding: 9px 0;
  min-height: 36px;
  border: 0;
  border-bottom: 1px solid transparent;
  color: var(--muted);
  font: 7px var(--mono);
}
.skill-tabs button.active {
  color: var(--red-light);
  border-color: var(--red);
}
.skill-list {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  min-height: 36px;
}
.skill-list span {
  border: 1px solid var(--line);
  padding: 10px 12px;
  border-radius: 7px;
  font: 9px var(--mono);
  background: #121214;
}
.skills > p {
  font-size: 6px;
  margin-top: 17px;
}
@media (max-width: 767px) {
  .skills {
    padding: 25px 20px;
  }
  .skill-tabs button {
    font-size: 8px;
    min-height: 44px;
  }
  .skill-tabs {
    gap: 17px;
  }
  .skill-list span {
    font-size: 10px;
  }
  .skills > p {
    font-size: 7px;
  }
}
</style>
