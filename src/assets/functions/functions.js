const BuscaRedacao = async (red_id) => {
  const res = await fetch(`https://desafio.pontue.com.br/redacao/${red_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "authorization, x-requested-with",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((res) => res.json());
  return res.data;
  /* redacaoZoom.value = res.data; */
};

const BuscaRedAluno = async () => {
  const res = await fetch(
    `https://desafio.pontue.com.br/index/aluno/${localStorage.getItem("id")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "authorization, x-requested-with",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  ).then((res) => res.json());
  return res.data;
};

export { BuscaRedacao, BuscaRedAluno };
