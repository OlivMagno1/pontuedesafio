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

button {
  font-family: "Museo";
  font-weight: 700;
  color: var(--clear0);
  background-color: var(--danger);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  color: var(--dark);
  background-color: var(--clear3);
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
