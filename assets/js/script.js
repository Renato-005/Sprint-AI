const estacoesLinha8 = [
  "Amador Bueno", "Santa Rita", "Itapevi", "Eng. Cardoso", "Sagrado Coração",
  "Jandira", "Jardim Silveira", "Jardim Belval", "Barueri", "Antônio João",
  "Santa Terezinha", "Carapicuíba", "Gen. Miguel Costa", "Quitaúna", "Com. Sampaio",
  "Osasco", "Pres. Altino", "Imperatriz Leopoldina", "Domingos de Moraes", "Lapa",
  "Palmeiras • Barra Funda", "Júlio Prestes"
];

const estacoesLinha9 = [
  "Osasco", "Pres. Altino", "Ceasa", "Villa-Lobos • Jaguaré", "Cidade Universitária",
  "Pinheiros", "Hebraica • Rebouças", "Cidade Jardim", "Vila Olímpia", "Berrini",
  "Morumbi", "Granja Julieta", "João Dias", "Santo Amaro", "Socorro", "Jurubatuba",
  "Autódromo", "Primavera • Interlagos", "Grajaú", "Mendes • Vila Natal"
];

const sentidosLinha8 = ["Itapevi", "Júlio Prestes"];
const sentidosLinha9 = ["Grajaú", "Osasco"];

const linhaSelect = document.getElementById('linha');
const estacaoSelect = document.getElementById('estacao');
const sentidoSelect = document.getElementById('sentido');
const consultarBtn = document.getElementById('consultar');
const resultadoDiv = document.getElementById('resultado');

function atualizarEstacoesESentidos() {
  const linha = linhaSelect.value;
  let estacoes = [];
  let sentidos = [];

  if (linha === '8') {
    estacoes = estacoesLinha8;
    sentidos = sentidosLinha8;
  } else {
    estacoes = estacoesLinha9;
    sentidos = sentidosLinha9;
  }

  estacaoSelect.innerHTML = '<option value="">Selecione uma estação</option>';
  estacoes.forEach((estacao, index) => {
    const option = document.createElement('option');
    option.value = index + 1;  // transforma para número
    option.textContent = estacao;
    estacaoSelect.appendChild(option);
  });

  sentidoSelect.innerHTML = '<option value="">Selecione um sentido</option>';
  sentidos.forEach((sentido, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = sentido;
    sentidoSelect.appendChild(option);
  });
}

linhaSelect.addEventListener('change', atualizarEstacoesESentidos);

consultarBtn.addEventListener('click', () => {
  const estacao = estacaoSelect.value;
  const sentido = sentidoSelect.value;
  const linhaSelecionada = linhaSelect.value;

  if (!estacao || !sentido) {
    resultadoDiv.textContent = 'Por favor, selecione uma estação e um sentido.';
    return;
  }

  resultadoDiv.textContent = 'Consultando...';

  fetch('http://localhost:8000/prever', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      estacao_de_entrada: Number(estacao),
      sentido: Number(sentido)
    })
  })
  .then(response => response.json())
  .then(data => {
    let resultadoTexto = '';

    if (linhaSelecionada === '8') {
      resultadoTexto = `<p><strong>Previsão Linha 8:</strong> ${data.linha_8.toFixed(2)} minutos</p>`;
    } else if (linhaSelecionada === '9') {
      resultadoTexto = `<p><strong>Previsão Linha 9:</strong> ${data.linha_9.toFixed(2)} minutos</p>`;
    }

    resultadoDiv.innerHTML = resultadoTexto;
  })
  .catch(err => {
    resultadoDiv.textContent = 'Erro de conexão: ' + err;
  });
});

// Inicializa os selects
atualizarEstacoesESentidos();
