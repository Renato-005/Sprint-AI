from flask import Flask, request, jsonify
import pickle
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Carregar modelo treinado
with open('modelo_treinado.', 'rb') as f:
    modelo = pickle.load(f)

@app.route('/predict', methods=['GET'])
def predict():
    try:
        estacao = int(request.args.get('estacao'))
        sentido = int(request.args.get('sentido'))

        # Dia da semana automático
        dia_semana = datetime.today().weekday()

        # Features conforme modelo treinado
        features = np.array([[estacao, sentido, dia_semana]])
        prediction = modelo.predict(features)

        return jsonify({
            'tempo_estimado': round(float(prediction[0]), 2),
            'dia_semana': dia_semana
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000)
