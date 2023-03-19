<script>
export default {
  name: "ModalEdit",
  props: ["abrirModal", "fecharModal", "redacaoZoom", "imagemURL"],
};
</script>

<template>
  <div class="modal-background" v-if="abrirModal == true">
    <div class="header">
      <h2>Editar Redação</h2>
      <span class="close" @click="this.fecharModal()">voltar</span>
    </div>
    <div class="details">
      <p>
        Número da redação: <span>{{ redacaoZoom.numero }}</span>
      </p>
      <p>
        Data de criação: <span>{{ redacaoZoom.created_at }}</span>
      </p>
      <p>Selecione as redações que deseja remover abaixo</p>
      <div class="imageContainer">
        <div v-for="(url, urlindex) in imagemURL" :key="urlindex">
          <img :src="url" />
        </div>
      </div>
      <p>Selecione os arquivos para adicionar</p>
      <input class="input" type="file" name="file" multiple ref="files" />
      <button @click="sendFile()">Criar</button>
    </div>
    <div class="clickToClose" @click="this.fecharModal()"></div>
  </div>
</template>

<style scoped>
.header {
  z-index: 150;
  position: relative;
  background-color: var(--orange);
  color: var(--clear0);
  border-radius: clamp(0.3rem, 0.16rem + 0.7vw, 1rem)
    clamp(0.3rem, 0.16rem + 0.7vw, 1rem) 0 0;
  height: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  width: clamp(20rem, 16rem + 20vw, 40rem);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

h2 {
  margin-left: 1rem;
  font-size: clamp(0.8rem, 0.68rem + 0.6vw, 1.4rem);
  font-weight: 700;
  cursor: default;
}
.modal-background {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.clickToClose {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.details {
  z-index: 150;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: clamp(18rem, 14.4rem + 18vw, 36rem);
  height: clamp(15rem, 12.4rem + 13vw, 28rem);
  padding: clamp(1rem, 0.8rem + 1vw, 2rem);
  border-radius: 0 0 clamp(0.3rem, 0.16rem + 0.7vw, 1rem)
    clamp(0.3rem, 0.16rem + 0.7vw, 1rem);
  background-color: var(--clear2);
}

.details p {
  font-size: clamp(0.6rem, 0.52rem + 0.4vw, 1rem);
  margin-top: 0.5rem;
}

span {
  font-weight: 300;
  opacity: 0.8;
}

.imageContainer {
  margin-top: 0.5rem;
  width: clamp(18rem, 14.4rem + 18vw, 36rem);
  height: clamp(5rem, 4rem + 5vw, 10rem);
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: var(--clear1);
  overflow-x: scroll;
}

img {
  max-width: clamp(6rem, 5.2rem + 4vw, 10rem);
  height: auto;
  margin-left: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  margin-top: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
}

.close {
  font-size: clamp(0.6rem, 0.52rem + 0.4vw, 1rem);
  position: absolute;
  margin-right: 1rem;
  right: 0;
  cursor: pointer;
  border-radius: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  padding: 0.2rem;
  transition: 0.2s;
}

.close:hover {
  background-color: white;
  color: var(--orange);
}

button:not(.selectFile) {
  margin-top: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  align-self: center;
  font-family: "Museo";
  font-weight: 700;
  color: var(--clear0);
  background-color: var(--orange);
  border-radius: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  padding: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  border: 0;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  color: var(--primary);
  background-color: var(--clear0);
}

.off {
  display: none;
}
</style>
