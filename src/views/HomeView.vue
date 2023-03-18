<script setup>
import { ref, onMounted } from "vue";
import { BuscaRedacao, BuscaRedAluno } from "../assets/functions/functions.js";

const tabela = ref([]);
const tabelaPage = ref(0);
const redacaoSelect = ref(-1);
const redacaoZoom = ref({
  id: "",
  aluno: {
    id: "",
    nome_completo: "",
  },
  numero: "",
  created_at: "",
  urls: [],
});

const selectRedacao = (entry, index) => {
  BuscaRedacao(entry.id).then(function (result) {
    redacaoZoom.value = result;
    redacaoSelect.value = index + tabelaPage.value;
  });
};

const nextPage = () => {
  if (tabelaPage.value + 10 < tabela.value.length)
    tabelaPage.value = tabelaPage.value + 10;
  return;
};

const prevPage = () => {
  if (tabelaPage.value != 0) tabelaPage.value = tabelaPage.value - 10;
  return;
};

onMounted(() => {
  BuscaRedAluno().then(function (result) {
    tabela.value = result;
  });
});
</script>

<template>
  <h1>Portal do aluno</h1>
  <div class="header">
    <p>Número da redação</p>
    <p>Data de criação</p>
  </div>
  <div
    class="table"
    v-for="(entry, index) in tabela.slice(tabelaPage, tabelaPage + 10)"
    @click="selectRedacao(entry, index)"
    :key="index"
    :class="{ chosen: index + tabelaPage == redacaoSelect }"
  >
    <p>{{ entry.numero }}</p>
    <p>{{ entry.created_at }}</p>
  </div>
  <div class="nav">
    <button :class="{ off: tabelaPage == 0 }" @click="prevPage">
      Página anterior
    </button>
    <h2>{{ tabelaPage / 10 + 1 }}</h2>
    <button :class="{ off: tabelaPage + 11 > tabela.length }" @click="nextPage">
      Página seguinte
    </button>
  </div>
  <div class="details" v-if="redacaoSelect != -1">
    <span @click="redacaoSelect = -1">voltar</span>
    <h2>{{ redacaoZoom.aluno.nome_completo }}</h2>
    <p>{{ redacaoZoom.numero }}</p>
    <p>{{ redacaoZoom.created_at }}</p>
    <div v-for="(urls, urlindex) in redacaoZoom.urls" :key="urlindex">
      <p>{{ urls.url }}</p>
    </div>
  </div>
</template>

<style scoped>
.table,
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
  transition: 0.3s;
}

.table:hover {
  background-color: black;
  color: white;
}

.nav {
  position: absolute;
  bottom: 5rem;
  display: flex;
  flex-flow: row nowrap;
}

.off {
  opacity: 0.5;
}

.chosen {
  background-color: black;
  color: white;
}

.details {
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: black;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
