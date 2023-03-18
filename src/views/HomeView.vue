<script setup>
import { ref, onMounted } from "vue";

const tabela = ref("");
const tabelaPage = ref(0);
const redacaoSelect = ref(-1);
const redacaoZoom = ref("");

const BuscaRedacao = async (red_id) => {
  const res = await fetch(`https://desafio.pontue.com.br/redacao/${red_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "authorization, x-requested-with",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((res) => res.json());
  redacaoZoom.value = res.data;
};

const BuscaRedAluno = async () => {
  const res = await fetch(
    `https://desafio.pontue.com.br/index/aluno/${localStorage.getItem("id")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "authorization, x-requested-with",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  ).then((res) => res.json());
  tabela.value = res.data;
};

const checkActual = (index) => {
  if (redacaoSelect.value === index) return true;
  else return false;
};

const checkFirstPage = () => {
  if (tabelaPage.value === 0) return true;
  else return false;
};

const checkLastPage = () => {
  if (tabelaPage.value + 11 > tabela.value.length) return true;
  else return false;
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
  BuscaRedAluno();
});
</script>

<template>
  <h1>Página de entrada</h1>
  <h2>Redação selecionada: {{ redacaoSelect }}</h2>
  <div class="header">
    <p>Número</p>
    <p>Data</p>
  </div>
  <div
    class="table"
    v-for="(entry, index) in tabela.slice(tabelaPage, tabelaPage + 10)"
    @click="
      () => {
        redacaoSelect = index + tabelaPage;
        BuscaRedacao(entry.id);
      }
    "
    :key="index"
    :class="{ chosen: checkActual(index + tabelaPage) }"
  >
    <p>{{ entry.numero }}</p>
    <p>{{ entry.created_at }}</p>
  </div>
  <div class="nav">
    <button :class="{ off: checkFirstPage() }" @click="prevPage">
      Página anterior
    </button>
    <h2>{{ tabelaPage / 10 + 1 }}</h2>
    <button :class="{ off: checkLastPage() }" @click="nextPage">
      Página seguinte
    </button>
  </div>
  <div class="zoom">
    <p>{{ redacaoZoom }}</p>
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
  height: 10rem;
  background-color: black;
  color: white;
}
</style>
