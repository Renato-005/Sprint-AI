function mostrarLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function esconderLoading() {
    document.getElementById('loading').classList.add('hidden');
}

async function consultarTempo(estacao, sentido, linha) {
    const resultado = document.getElementById('resultado');
    resultado.innerText = '';
    mostrarLoading();

    try {
        const response = await fetch(`http://localhost:8000/predict?estacao=${estacao}&sentido=${sentido}&linha=${linha}`);
        const data = await response.json();

        if (data.tempo_estimado) {
            resultado.innerText = `Tempo estimado: ${data.tempo_estimado} minutos (Dia da semana: ${data.dia_semana})`;
        } else if (data.error) {
            resultado.innerText = `Erro: ${data.error}`;
        } else {
            resultado.innerText = 'Resposta inválida da API.';
        }
    } catch (error) {
        resultado.innerText = 'Erro ao consultar a API.';
        console.error('Erro:', error);
    } finally {
        esconderLoading();
    }
}