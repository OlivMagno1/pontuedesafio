<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const alert_message = ref("");
const check_alert = ref(false);

const Login = async () => {
  //Verifica se todos os campos estão preenchidos
  if (!email.value || !password.value) {
    check_alert.value = true;
    alert_message.value = "Preencha todos os campos antes de continuar!";
    return;
  }
  const res = await fetch("https://desafio.pontue.com.br/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  }).then((res) => res.json());
  if (res.token_type == "Bearer") {
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("token_type", res.token_type);
    localStorage.setItem("id", res.aluno_id);
    localStorage.setItem("expiration", res.expires_at);
    router.push("/");
  } else {
    check_alert.value = true;
    alert_message.value = res.message;
  }
};
</script>

<template>
  <div>
    <h1>Pontue!</h1>
    <form @submit.prevent="Login">
      <label>
        <span>e-mail</span>
        <input v-model="email" placeholder="seu@email.com" />
      </label>
      <label>
        <span>senha:</span>
        <input type="password" v-model="password" placeholder="••••••••" />
        <span class="alert">
          {{ alert_message }}
        </span>
      </label>
      <input type="submit" value="Entrar" @click="check_alert = false" />
    </form>
  </div>
</template>

<style scoped>
form,
label {
  display: flex;
  flex-flow: column nowrap;
}

form {
  background-color: var(--primary);
  width: 24rem;
  height: 30rem;
  border-radius: 1rem;
}

label {
  color: var(--clear0);
  width: 18rem;
  font-family: "Museo";
  font-weight: 100;
}
</style>
