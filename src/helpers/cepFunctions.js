export const searchCep = () => {
  // seu código aqui
};

export const getAddress = () => {
  const cep = document.querySelector(".cep-input").value;

  // Faz a requisição para a API do ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      // Atualiza a tag span com os dados recebidos da API
      if (data === undefined){
        return alert("Não foi possível obter o endereço a partir deste CEP.");
      }
      const adress = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
      document.querySelector(".cart__address").textContent = adress;
    })
    .catch(error => {
      // Exibe uma mensagem de erro caso ocorra algum problema na requisição
      console.error(error);
      alert("Não foi possível obter o endereço a partir deste CEP.");
    });
};