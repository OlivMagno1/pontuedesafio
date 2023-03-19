<script>
export default {
  name: "ModalDelete",
  props: ["abrirModal", "fecharModal", "recarrega", "redacaoZoom"],
  methods: {
    async Deletar(red_id) {
      const res = await fetch(
        `https://desafio.pontue.com.br/redacao/${red_id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Access-Control-Request-Headers": "authorization",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then((res) => res.json());
      console.log(res);
      this.fecharModal();
      this.recarrega();
    },
  },
};
</script>

<template>
  <div class="modal-background" v-if="abrirModal == true">
    <div class="header">
      <h2>Excluir redação</h2>
      <span class="close" @click="this.fecharModal()">voltar</span>
    </div>
    <div class="details">
      <p>Deseja realmente excluir a seguinte redação?</p>
      <p>
        Número da redação: <span>{{ redacaoZoom.numero }}</span>
      </p>
      <p>
        Data de criação: <span>{{ redacaoZoom.created_at }}</span>
      </p>
      <button @click="Deletar(redacaoZoom.id)">Excluir</button>
    </div>
    <div class="clickToClose" @click="this.fecharModal()"></div>
  </div>
</template>

<style scoped>
.header {
  z-index: 150;
  position: relative;
  background-color: var(--danger);
  color: var(--clear0);
  border-radius: clamp(0.3rem, 0.16rem + 0.7vw, 1rem)
    clamp(0.3rem, 0.16rem + 0.7vw, 1rem) 0 0;
  height: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  width: clamp(14rem, 12rem + 10vw, 24rem);
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
  align-items: center;
  width: clamp(12.25rem, 10.5rem + 8.75vw, 21rem);
  height: clamp(7.5rem, 7.2rem + 1.5vw, 9rem);
  padding: clamp(0.875rem, 0.75rem + 0.625vw, 1.5rem);
  border-radius: 0 0 clamp(0.3rem, 0.16rem + 0.7vw, 1rem)
    clamp(0.3rem, 0.16rem + 0.7vw, 1rem);
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

button {
  font-family: "Museo";
  font-weight: 700;
  color: var(--clear0);
  background-color: var(--danger);
  border-radius: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  padding: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  border: 0;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  color: var(--dark);
  background-color: var(--clear3);
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
  color: var(--primary);
}

p {
  font-size: clamp(0.6rem, 0.52rem + 0.4vw, 1rem);
}
</style>
