// Seleção dos elementos
const form = document.getElementById("cadastroForm");
const inputs = form.querySelectorAll("input");

// Função para buscar o endereço no ViaCEP
async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

    if (data.erro) {
        alert("CEP não encontrado!");
        return;
    }

        document.getElementById("logradouro").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("uf").value = data.uf || "";

        salvarDados(); // já salva no localStorage
    } 
  catch (error) {
    console.error("Erro ao buscar CEP:", error);
  }
}

// Função para salvar os dados no Local Storage
function salvarDados() {
    let dados = {};
     inputs.forEach((input) => {
    dados[input.name] = input.value;
    });
    localStorage.setItem("formCadastro", JSON.stringify(dados));
}

// Função para restaurar os dados do Local Storage
function restaurarDados() {
    const dados = JSON.parse(localStorage.getItem("formCadastro"));
    if (dados) {
        inputs.forEach((input) => {
        if (dados[input.name]) {
            input.value = dados[input.name];
      }
    });
  }
}

// Eventos
document.getElementById("cep").addEventListener("blur", (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // remove não números
    if (cep.length === 8) {
        buscarCEP(cep);
  }
});

// Salva ao digitar
inputs.forEach((input) => {
    input.addEventListener("input", salvarDados);
});

// Impede reload do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Dados salvos com sucesso!");
});

// Restaura ao carregar a página
window.addEventListener("load", restaurarDados);
