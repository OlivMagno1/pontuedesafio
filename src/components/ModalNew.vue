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
      <p>
        Número da redação: <span>{{ redacaoZoom.numero }}</span>
      </p>
      <p>
        Data de criação: <span>{{ redacaoZoom.created_at }}</span>
      </p>
      <div v-for="(url, urlindex) in imagemURL" :key="urlindex">
        <img :src="url" />
      </div>
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
  width: 40rem;
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
  align-items: flex-start;
  width: 36rem;
  height: 28rem;
  padding: 2rem;
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
</style>
