<script setup lang="ts">
const team = [
  { name: "Renata", mark: "R" },
  { name: "João Gustavo", mark: "JG" },
  { name: "David", mark: "D" },
  { name: "Isaque", mark: "I" },
];
</script>
<template>
  <section
    id="sobre"
    class="about frame section-pad reveal"
    aria-labelledby="about-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Sobre nós</span
      ><span class="micro">Design + código + curiosidade</span>
    </div>
    <div class="team-intro">
      <h2 id="about-title">
        Quatro perspectivas<br /><em>Uma criação em conjunto</em>
      </h2>
      <p>
        Somos Renata, João Gustavo, David e Isaque, estudantes de
        Desenvolvimento de Sistemas no <span class="senai">SENAI</span>. No
        VERSO*, unimos desenvolvimento, design e planejamento para criar
        sites, apps e softwares sob medida para estabelecimentos e pequenos
        negócios. Cada projeto passa por todos nós: decidimos juntos,
        revisamos o trabalho uns dos outros e cuidamos da funcionalidade, da
        identidade visual e da organização do começo ao fim.
      </p>
    </div>
    <ul class="team-grid" aria-label="Equipe VERSO*">
      <li
        v-for="person in team"
        :key="person.name"
        class="team-card"
        data-reveal
      >
        <strong class="team-mark" aria-hidden="true"
          >{{ person.mark }}<span>*</span></strong
        >
        <h3 class="team-name">{{ person.name }}</h3>
      </li>
    </ul>
    <p class="team-note micro">
      Pensar a ideia, planejar a experiência, <em>construir juntos</em>
    </p>
  </section>
</template>
<style scoped>
.about {
  isolation: isolate;
  overflow: hidden;
  padding-bottom: 80px;
}
.team-intro {
  margin-top: 45px;
}
.team-intro h2 {
  font: 600 clamp(43px, 5.5vw, 88px) / 1 var(--display);
}
.team-intro h2 em {
  font: 500 italic 1.05em var(--editorial);
  color: var(--pink);
}
.team-intro > p {
  max-width: 72ch;
  margin-top: 25px;
  color: var(--muted);
  font-size: 15px;
}
.senai {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 4px;
}
.team-grid {
  list-style: none;
  padding: 0;
  margin: 70px 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
}
.team-card {
  position: relative;
  padding: 28px 24px 30px;
  border: 1px solid #ae586b;
  background: #27141c;
  transition: border-color var(--fast) var(--ease);
}
.team-card:nth-child(odd) {
  transform: rotate(-1.5deg);
}
.team-card:nth-child(even) {
  transform: rotate(1.5deg);
  background: #1c1117;
}
.team-card:hover {
  border-color: var(--red-light);
}
.team-mark {
  display: block;
  font: 500 clamp(80px, 8vw, 140px) / 1 var(--editorial);
  letter-spacing: -0.06em;
  margin: 0 0 18px;
}
.team-mark span {
  color: var(--red-light);
}
.team-name {
  font: 600 clamp(24px, 2.2vw, 34px) / 1.05 var(--display);
  letter-spacing: 0.01em;
}
.team-note {
  margin-top: 45px;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.02em;
}
.team-note em {
  font-style: normal;
  color: var(--red-light);
}
@media (prefers-reduced-motion: reduce) {
  .team-card,
  .team-card:hover {
    transition: none;
  }
}
@media (max-width: 1023px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .about {
    padding-bottom: 45px;
  }
  .about .section-topline > .micro {
    display: none;
  }
  .team-intro h2 {
    font-size: 42px;
  }
  .team-intro > p {
    font-size: 14px;
  }
  .team-grid {
    margin-top: 50px;
    gap: 14px;
  }
  .team-card {
    padding: 20px 16px 22px;
  }
  .team-mark {
    font-size: 72px;
    margin: 0 0 12px;
  }
  .team-name {
    font-size: 22px;
  }
}
</style>
