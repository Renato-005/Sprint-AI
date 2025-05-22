async function consultarTempo(estacao, sentido) {
    const resultado = document.getElementById('resultado');
    const loading = document.getElementById('loading');
  
    resultado.innerText = "";
    loading.style.display = "block";  // Mostra o loading
  
    try {
      const response = await fetch(`http://localhost:8000/predict?estacao=${estacao}&sentido=${sentido}`);
      const data = await response.json();
  
      loading.style.display = "none";  // Esconde o loading
  
      if (data.tempo_estimado) {
        resultado.innerText = `Tempo estimado: ${data.tempo_estimado} minutos (Dia da semana: ${data.dia_semana})`;
      } else if (data.error) {
        resultado.innerText = `Erro: ${data.error}`;
      } else {
        resultado.innerText = 'Resposta inválida da API.';
      }
    } catch (error) {
      loading.style.display = "none";  // Esconde o loading
      resultado.innerText = 'Erro ao consultar a API.';
      console.error('Erro:', error);
    }
  }
  