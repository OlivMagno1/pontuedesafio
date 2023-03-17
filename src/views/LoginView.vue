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
  if (res.success) {
    localStorage.setItem("token", res.token);
    router.push("/");
  } else {
    check_alert.value = true;
    alert_message.value = res.message;
  }
};
</script>

<template>
  <div>
    <h1>Desafio Pontue!</h1>
    <form @submit.prevent="Login">
      <label>
        <span>Informe o e-mail de cadastro:</span>
        <input type="email" v-model="email" placeholder="seu@email.com" />
      </label>
      <label>
        <span>Informe a sua senha:</span>
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
form {
  display: flex;
  flex-flow: column nowrap;
}
</style>
