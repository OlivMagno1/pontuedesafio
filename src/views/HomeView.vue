<script setup>
import { ref, onMounted } from "vue";

const tabela = ref("");
const tabelaPage = ref(0);

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
  console.log(tabela);
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
  <div
    class="table"
    v-for="(entry, index) in tabela.slice(tabelaPage, tabelaPage + 10)"
    :key="index"
  >
    <p>{{ entry.id }}</p>
    <p>{{ entry.numero }}</p>
    <p>{{ entry.created_at }}</p>
  </div>
  <div class="nav">
    <button :class="{ off: checkFirstPage }" @click="prevPage">
      Página anterior
    </button>
    <h2>{{ tabelaPage }}</h2>
    <button :class="{ off: checkLastPage }" @click="nextPage">
      Página seguinte
    </button>
  </div>
</template>

<style scoped>
.table {
  display: flex;
  flex-flow: row nowrap;
}

.nav {
  display: flex;
  flex-flow: row nowrap;
}

.off {
  opacity: 0;
}
</style>
