<script setup>
import { ref, onMounted } from "vue";
import ModalDelete from "../components/ModalDelete.vue";
import ModalEdit from "../components/ModalEdit.vue";
import ModalNew from "../components/ModalNew.vue";
import ModalVer from "../components/ModalVer.vue";
import {
  BuscaRedacao,
  BuscaRedAluno,
  Logout,
} from "../assets/functions/functions.js";
import { useRouter } from "vue-router";
const router = useRouter();

const nomeAluno = ref("");
const tabela = ref([]);
const tabelaPage = ref(0);
const redacaoSelect = ref(-1);
const modalDelete = ref(false);
const modalEdit = ref(false);
const modalNew = ref(false);
const modalVer = ref(false);
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

const sair = () => {
  Logout();
  router.push("/login");
};

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

const selectRedacao = async (entry, index) => {
  await BuscaRedacao(entry.id).then(function (redacaoResult) {
    redacaoZoom.value = redacaoResult;
    redacaoSelect.value = index + tabelaPage.value;
  });
};

const fecharRedacao = () => {
  redacaoSelect.value = -1;
};

const abrirModalDelete = async (entry, index) => {
  selectRedacao(entry, index).then(function () {
    modalDelete.value = true;
  });
};

const fecharModalDelete = () => {
  modalDelete.value = false;
  fecharRedacao();
};

const abrirModalEdit = (entry, index) => {
  selectRedacao(entry, index).then(function () {
    modalEdit.value = true;
  });
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
  selectRedacao(entry, index).then(function () {
    modalVer.value = true;
  });
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
      <img class="logo" src="@/assets/pontue_logo.png" />
      <p class="nomeAluno">{{ nomeAluno }}</p>
      <p class="logout" @click="sair()">Logout</p>
    </div>
    <span
      title="Criar uma nova redação"
      @click="abrirModalNew()"
      class="newRed"
    >
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
        title="Página anterior"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <h2 title="Página atual" class="navCounter">{{ tabelaPage / 10 + 1 }}</h2>
      <button
        class="navButton"
        :class="{
          off: tabelaPage + 11 > tabela.length,
        }"
        @click="nextPage"
        title="Próxima página"
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
      :recarrega="carrega"
    />
    <ModalNew
      :abrirModal="modalNew"
      :fecharModal="fecharModalNew"
      :redacaoZoom="redacaoZoom"
      :recarrega="carrega"
    />
    <ModalVer
      :abrirModal="modalVer"
      :fecharModal="fecharModalVer"
      :redacaoZoom="redacaoZoom"
    />
  </div>
</template>

<style scoped>
.backdrop {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: clamp(20rem, 100vw, 120rem);
  height: calc(100 * var(--doc-vh));
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

  height: clamp(3rem, 2.6rem + 2vw, 5rem);
  width: 100vw;
}

.header {
  background-color: var(--clear2);
  height: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  border-radius: clamp(0.3rem, 0.16rem + 0.7vw, 1rem)
    clamp(0.3rem, 0.16rem + 0.7vw, 1rem) 0 0;
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
  height: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  background-color: var(--clear0);
}

.table:hover {
  background-color: var(--clear4);
}

.col {
  font-size: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  width: clamp(6rem, 3.6rem + 12vw, 18rem);
  margin-right: clamp(0.5rem, 0.2rem + 1.5vw, 2rem);
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
  height: clamp(1rem, 0.72rem + 1.4vw, 2.4rem);
  width: clamp(1.5rem, 1rem + 2.5vw, 4rem);
  border-radius: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
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
  background-color: var(--accent);
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
  bottom: clamp(2rem, 1.4rem + 3vw, 5rem);
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
  width: 2.5rem;
  margin: 0.5rem;
}

.navButton {
  color: var(--primary);
  background-color: var(--clear0);
  height: 2rem;
  width: 2.5rem;
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
  bottom: clamp(2rem, 1.4rem + 3vw, 5rem);
  left: clamp(15rem, -2rem + 85vw, 100rem);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: clamp(3rem, 2.6rem + 2vw, 5rem);
  width: clamp(3rem, 2.6rem + 2vw, 5rem);
  height: clamp(3rem, 2.6rem + 2vw, 5rem);
  color: var(--clear0);
  background-color: var(--primary);
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.newRed:hover {
  background-color: var(--accent);
}

.logo {
  width: clamp(3rem, 1.6rem + 7vw, 10rem);
}

.nomeAluno {
  font-size: clamp(0.8rem, 0.68rem + 0.6vw, 1.4rem);
}

.logout {
  font-size: clamp(0.8rem, 0.68rem + 0.6vw, 1.4rem);
  cursor: pointer;
  padding: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  border-radius: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  transition: 0.2s;
}

.logout:hover {
  background-color: var(--accent);
  color: var(--clear0);
}
</style>
