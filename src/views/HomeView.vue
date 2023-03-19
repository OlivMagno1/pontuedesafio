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

const nomeAluno = ref("");
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
    BuscaRedacao(tabela.value[0].id).then(function (buscaNome) {
      nomeAluno.value = buscaNome.aluno.nome_completo;
    });
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
      <img src="@/assets/pontue_logo.png" />
      <h2>{{ nomeAluno }}</h2>
      <p title="não implementado">Logout</p>
    </div>
    <span @click="abrirModalNew()" class="newRed">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </span>
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
        <p title="Ver" class="color1" @click="abrirModalVer(entry, index)">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </p>
        <p title="Editar" class="color2" @click="abrirModalEdit(entry, index)">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </p>
        <p
          title="Excluir"
          class="color3"
          @click="abrirModalDelete(entry, index)"
        >
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </p>
      </div>
    </div>
    <div class="nav">
      <button
        class="navButton"
        :class="{ off: tabelaPage == 0 }"
        @click="prevPage"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <h2 class="navCounter">{{ tabelaPage / 10 + 1 }}</h2>
      <button
        class="navButton"
        :class="{
          off: tabelaPage + 11 > tabela.length,
        }"
        @click="nextPage"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
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
  cursor: default;

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

.table:hover {
  background-color: var(--clear4);
}

.col {
  width: 18rem;
  margin-right: 2rem;
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
  border-radius: 0.5rem;
  transition: 0.2s;
  cursor: pointer;
}

.tools .color1 {
  color: var(--primary);
  background-color: var(--clear1);
}

.tools .color2 {
  color: var(--orange);
  background-color: var(--clear1);
}

.tools .color3 {
  color: var(--danger);
  background-color: var(--clear1);
}

.tools .color1:hover {
  background-color: var(--primary);
  color: white;
}

.tools .color2:hover {
  background-color: var(--orange);
  color: white;
}

.tools .color3:hover {
  background-color: var(--danger);
  color: white;
}

.nav {
  position: absolute;
  bottom: 5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.navCounter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 3rem;
  margin: 0.5rem;
}

.navButton {
  color: var(--primary);
  background-color: var(--clear0);
  height: 2rem;
  width: 3rem;
  border-radius: 0.5rem;
  border: 0;
  cursor: pointer;
  transition: 0.2s;
}

.navButton:hover:not(.off) {
  background-color: var(--primary);
  color: var(--clear0);
}

.off {
  opacity: 0;
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
  color: var(--clear0);
  background-color: var(--primary);
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.newRed:hover {
  background-color: var(--accent);
}
</style>
