import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Carrega o modelo treinado
with open('modelo_treinado.pkl', 'rb') as f:
    modelo = pickle.load(f)

@app.route('/prever', methods=['POST'])
def prever():
    try:
        dados = request.json
        estacao = int(dados['estacao_de_entrada'])
        sentido = int(dados['sentido'])

        # Completando automaticamente os outros dados
        dia_da_semana = datetime.datetime.today().weekday()  # 0 = segunda, ..., 6 = domingo
        horario_de_pico = 1
        operacao_normal = 1
        esta_chovendo = 0
        lotacao = 3

        # Montando a entrada na ordem correta:
        entrada = np.array([
            dia_da_semana,
            horario_de_pico,
            operacao_normal,
            estacao,
            sentido,
            esta_chovendo,
            lotacao
        ]).reshape(1, -1)

        # Fazendo a previsão multivariada
        previsao = modelo.predict(entrada)

        # Separando os resultados
        linha_8 = previsao[0][0]
        linha_9 = previsao[0][1]

        return jsonify({
            'linha_8': linha_8,
            'linha_9': linha_9
        })

    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
