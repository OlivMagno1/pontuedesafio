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
  <div class="background">
    <img src="@/assets/pontue_logo.png" />
    <form @submit.prevent="Login">
      <label>
        <span>Login</span>
        <input v-model="email" />
      </label>
      <label>
        <span>Senha</span>
        <input type="password" v-model="password" />
        <span class="alert">
          {{ alert_message }}
        </span>
      </label>
      <input
        class="submit"
        type="submit"
        value="Entrar"
        @click="check_alert = false"
      />
    </form>
  </div>
</template>

<style scoped>
.background {
  background: linear-gradient(to bottom right, var(--primary), var(--purple));
  width: 100vw;
  height: calc(100 * var(--doc-vh));
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

form,
label {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}

form {
  background-color: var(--clear0);
  width: clamp(18rem, 17rem + 5vw, 23rem);
  height: 15rem;
  border-radius: 0.5rem;
  padding: 1rem;
}

label {
  color: var(--dark);
  font-family: "calibri";
  font-weight: 700;
  margin: 0 0 1rem 0.5rem;
}

label span {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

input:not(.submit) {
  width: clamp(16rem, 14.8rem + 6vw, 22rem);
  border-radius: 0.3rem;
  border: 1px solid var(--clear3);
  padding: 0.3rem;
}

img {
  margin: 1rem;
  border-radius: 0.5rem;
}

.submit {
  margin: 0 0 1rem 0.5rem;
  padding: 0.5rem 0.3rem;
  width: clamp(16.7rem, 15.5rem + 6vw, 22.7rem);
  border: 0;
  border-radius: 0.3rem;
  background-color: var(--primary);
  color: var(--clear0);
  transition: 0.2s;
  cursor: pointer;
}

.submit:hover {
  background-color: var(--accent);
}
</style>
