# Previsão de Tempo de Espera nas Linhas 8 e 9

Projeto de IA desenvolvido para exercitar conceitos de treino de modelos com `scikit-learn`, serialização com `pickle` e consumo de backend com `Flask`.

O frontend foi implementado com **HTML**, **CSS** e **JavaScript puro**, utilizando `fetch` para comunicação com a API.

---

## ✅ Executando o projeto

### 1. Instalando as dependências:

```bash
pip install -r requirements.txt
```

---

### 2. Treinando o modelo

Utilize o Jupyter Notebook (`modelo_treino.ipynb`) ou diretamente o script de treinamento corrigido para gerar o arquivo `modelo_treinado.pkl`.

O modelo realiza previsão **multivariada** para as Linhas 8 e 9 com base em variáveis como:
- dia da semana
- operação normal
- horário de pico
- estação de entrada
- sentido
- esta chovendo
- lotação

O arquivo resultante `modelo_treinado.pkl` deve ser colocado na pasta `backend/`.

---

### 3. Subindo o backend Flask

Entre na pasta `backend` e execute:  

- No Windows:

```bash
run.bat
```

- No Linux/Mac:

```bash
./run.sh
```

O backend Flask estará disponível em:  
**http://localhost:8000**

---

### 4. Acessando o frontend

Abra o arquivo `index.html` na raiz do projeto utilizando um servidor local.

**Sugestões:**
- **Live Server** do VSCode → Clique com o direito no `index.html` → "Open with Live Server".
- Ou com o Python embutido:

```bash
python -m http.server
```

O frontend fará requisições automáticas para o backend e exibirá:
✅ Formulário de seleção da linha, estação e sentido.  
✅ Previsão do tempo de espera da linha selecionada.  
✅ Spinner de carregamento enquanto aguarda a resposta.

---

## ✅ Estrutura do projeto

```
.
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
├── backend
│   ├── modelo_treinado.pkl
│   ├── server.py
│   ├── run.bat
│   └── run.sh
├── index.html
├── requirements.txt
└── README.md
```

---

## ✅ Tecnologias utilizadas

- **Python**
- **Flask**
- **Flask-CORS**
- **scikit-learn**
- **NumPy**
- **Pandas**
- **HTML**
- **CSS**
- **JavaScript**

---

## ✅ Funcionalidades

- Previsão simultânea das linhas 8 e 9 utilizando modelo multivariado.
- Interface web simples, responsiva e intuitiva.
- Comunicação via API REST (`/prever`).
- Animação de **spinner** durante a consulta.
- Seleção dinâmica de estação e sentido com base na linha escolhida.

---