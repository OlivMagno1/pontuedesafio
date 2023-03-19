<script setup>
import { ref, onMounted } from "vue";
import ModalDelete from "../components/ModalDelete.vue";
import ModalEdit from "../components/ModalEdit.vue";
import ModalNew from "../components/ModalNew.vue";
import ModalVer from "../components/ModalVer.vue";
import {
  BuscaRedacao,
  BuscaRedAluno,
  BuscaImagem,
} from "../assets/functions/functions.js";

const tabela = ref([]);
const tabelaPage = ref(0);
const redacaoSelect = ref(-1);
const modalDelete = ref(false);
const modalEdit = ref(false);
const modalNew = ref(false);
const modalVer = ref(false);
const imagemURL = ref([]);
const existeImagem = ref(true);
const redacaoZoom = ref({
  id: "",
  aluno: {
    id: "",
    nome_completo: "",
  },
  numero: "",
  created_at: "",
  urls: [
    {
      id: "",
      redacao_id: "",
      correcao_id: "",
      url: "",
      anotacoes: "",
      comentarios: "",
    },
  ],
});

const carrega = () => {
  BuscaRedAluno().then(function (result) {
    tabela.value = result;
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

const selectRedacao = (entry, index) => {
  BuscaRedacao(entry.id).then(function (redacaoResult) {
    redacaoZoom.value = redacaoResult;
    redacaoSelect.value = index + tabelaPage.value;
    for (var i in redacaoResult.urls) {
      imagemURL.value[i] = redacaoResult.urls[i].url;
    }
  });
  BuscaImagem(imagemURL.value).then(function (imagem) {
    existeImagem.value = imagem != undefined && imagem != null;
  });
};

const fecharRedacao = () => {
  redacaoSelect.value = -1;
};

const abrirModalDelete = (entry, index) => {
  modalDelete.value = true;
  selectRedacao(entry, index);
};

const fecharModalDelete = () => {
  modalDelete.value = false;
  fecharRedacao();
};

const abrirModalEdit = (entry, index) => {
  modalEdit.value = true;
  selectRedacao(entry, index);
};

const fecharModalEdit = () => {
  modalEdit.value = false;
  fecharRedacao();
};

const abrirModalNew = () => {
  modalNew.value = true;
};

const fecharModalNew = () => {
  modalNew.value = false;
};

const abrirModalVer = (entry, index) => {
  modalVer.value = true;
  selectRedacao(entry, index);
};

const fecharModalVer = () => {
  modalVer.value = false;
  fecharRedacao();
};

onMounted(() => {
  carrega();
});
</script>

<template>
  <div class="backdrop">
    <div class="menu">
      <h1>Pontue</h1>
      <h2>Nome do aluno</h2>
      <p>Logout</p>
    </div>
    <span @click="abrirModalNew()" class="newRed">Criar</span>
    <div class="header">
      <p class="col">Número da redação</p>
      <p class="col">Data de criação</p>
      <p class="col">Ações</p>
    </div>
    <div
      class="table"
      v-for="(entry, index) in tabela.slice(tabelaPage, tabelaPage + 10)"
      :key="index"
      :class="{
        chosen: index + tabelaPage == redacaoSelect,
      }"
    >
      <p class="col">{{ entry.numero }}</p>
      <p class="col">{{ entry.created_at }}</p>
      <div class="col tools">
        <p @click="abrirModalVer(entry, index)">Ver</p>
        <p @click="abrirModalEdit(entry, index)">Editar</p>
        <p @click="abrirModalDelete(entry, index)">Excluir</p>
      </div>
    </div>
    <div class="nav">
      <button :class="{ off: tabelaPage == 0 }" @click="prevPage">
        Página anterior
      </button>
      <h2>{{ tabelaPage / 10 + 1 }}</h2>
      <button
        :class="{
          off: tabelaPage + 11 > tabela.length,
        }"
        @click="nextPage"
      >
        Página seguinte
      </button>
    </div>
    <ModalDelete
      :abrirModal="modalDelete"
      :fecharModal="fecharModalDelete"
      :recarrega="carrega"
      :redacaoZoom="redacaoZoom"
    />
    <ModalEdit
      :abrirModal="modalEdit"
      :fecharModal="fecharModalEdit"
      :redacaoZoom="redacaoZoom"
      :imagemURL="imagemURL"
    />
    <ModalNew
      :abrirModal="modalNew"
      :fecharModal="fecharModalNew"
      :redacaoZoom="redacaoZoom"
      :imagemURL="imagemURL"
    />
    <ModalVer
      :abrirModal="modalVer"
      :fecharModal="fecharModalVer"
      :redacaoZoom="redacaoZoom"
      :imagemURL="imagemURL"
    />
  </div>
</template>

<style scoped>
.backdrop {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--clear1);
}

.menu {
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--clear1);
  color: var(--primary);

  height: 5rem;
  width: 100vw;
}

.header {
  background-color: var(--clear2);
  height: 3rem;
  border-radius: 1rem 1rem 0 0;
}

.table,
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  transition: 0.3s;
}

.table {
  height: 3rem;
  background-color: var(--clear0);
}

.col {
  width: 18rem;
  margin-right: 2rem;
}

.tools p:hover {
  background-color: var(--primary);
  color: white;
}

.tools {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
}

.tools p {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  width: 4rem;
  color: var(--primary);
  background-color: var(--clear1);
  border-radius: 0.5rem;
  transition: 0.2s;
  cursor: pointer;
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

.newRed {
  position: absolute;
  bottom: 5rem;
  right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  width: 5rem;
  height: 5rem;
  background-color: var(--primary);
  font-size: 1rem;
  color: var(--clear1);
  cursor: pointer;
  transition: 0.2s;
}

#newRed:hover {
  transform: scale(1.2);
}
</style>
