from flask import Flask, request, jsonify
import pickle
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Carregar os dois modelos
with open('backend/modelo_azul.pkl', 'rb') as f:
    modelo_azul = pickle.load(f)

with open('backend/modelo_vermelha.pkl', 'rb') as f:
    modelo_vermelha = pickle.load(f)

@app.route('/predict', methods=['GET'])
def predict():
    try:
        estacao = int(request.args.get('estacao'))
        sentido = int(request.args.get('sentido'))
        linha = request.args.get('linha')

        # Dia da semana automático
        dia_semana = datetime.today().weekday() + 1  # 1=segunda, ..., 7=domingo

        # Features conforme modelo treinado
        features = np.array([[estacao, sentido, dia_semana]])

        # Escolher modelo
        if linha == 'azul':
            prediction = modelo_azul.predict(features)
        elif linha == 'vermelha':
            prediction = modelo_vermelha.predict(features)
        else:
            return jsonify({'error': 'Linha inválida. Use "azul" ou "vermelha".'}), 400

        return jsonify({
            'tempo_estimado': round(prediction[0], 2),
            'dia_semana': dia_semana
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)