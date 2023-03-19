<script>
export default {
  name: "ModalNew",
  props: ["abrirModal", "fecharModal", "redacaoZoom", "imagemURL"],
};
</script>

<template>
  <div class="modal-background" v-if="abrirModal == true">
    <div class="header">
      <h2>Criar redação</h2>
      <span class="close" @click="this.fecharModal()">voltar</span>
    </div>
    <div class="details">
      <form>
        <input />
        <button class="selectFile">Selecionar arquivo</button>
      </form>
      <button @click="this.fecharModal()">Criar</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  background-color: var(--primary);
  color: var(--clear0);
  border-radius: 1rem 1rem 0 0;
  height: 3rem;
  width: 24rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

h2 {
  margin-left: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: default;
}
.modal-background {
  z-index: 150;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.details {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  width: 21rem;
  height: 9rem;
  padding: 1.5rem;
  border-radius: 0 0 1rem 1rem;
  background-color: var(--clear2);
}

.details p {
  margin-bottom: 1rem;
}

span {
  font-weight: 300;
  opacity: 0.8;
}

img {
  width: 20rem;
  height: auto;
}

.close {
  position: absolute;
  margin-right: 1rem;
  right: 0;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.2rem;
  transition: 0.2s;
}

.close:hover {
  background-color: white;
  color: var(--primary);
}

button:not(.selectFile) {
  font-family: "Museo";
  font-weight: 700;
  color: var(--clear0);
  background-color: var(--primary);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  color: var(--primary);
  background-color: var(--clear0);
}
</style>
