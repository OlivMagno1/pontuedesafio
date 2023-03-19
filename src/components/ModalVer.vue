<script>
import { ref } from "vue";
export default {
  name: "ModalVer",
  props: ["abrirModal", "fecharModal", "redacaoZoom", "imagemURL"],
  setup() {
    const actual = ref(0);

    const nextImage = (url) => {
      if (actual.value < url.length - 1) actual.value = actual.value + 1;
      return;
    };

    const prevImage = () => {
      if (actual.value > 0) actual.value = actual.value - 1;
      return;
    };
    return { actual, nextImage, prevImage };
  },
};
</script>

<template>
  <div class="modal-background" v-if="abrirModal == true">
    <div class="header">
      <h2>Visualização</h2>
      <span
        class="close"
        @click="
          this.fecharModal();
          actual = 0;
        "
      >
        voltar
      </span>
    </div>
    <div class="details">
      <p>
        Número da redação: <span>{{ redacaoZoom.numero }}</span>
      </p>
      <p>
        Data de criação: <span>{{ redacaoZoom.created_at }}</span>
      </p>
      <div class="imageContainer">
        <p
          :class="{ off: actual <= 0 }"
          @click="prevImage()"
          title="Página anterior"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </p>
        <div v-for="(url, urlindex) in imagemURL" :key="urlindex">
          <img v-if="urlindex == actual" :src="url" />
        </div>
        <p
          :class="{ off: actual >= imagemURL.length - 1 }"
          @click="nextImage(imagemURL)"
          title="Próxima página"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </p>
      </div>
    </div>
    <div
      class="clickToClose"
      @click="
        this.fecharModal();
        actual = 0;
      "
    />
  </div>
</template>

<style scoped>
.header {
  z-index: 150;
  position: relative;
  background-color: var(--accent);
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

.imageContainer {
  width: 36rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
}

img {
  max-width: 25rem;
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
  color: var(--accent);
}
</style>
