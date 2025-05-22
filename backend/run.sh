#!/bin/bash
echo "Iniciando o backend Flask com múltiplos modelos..."
cd backend
export FLASK_APP=server.py
export FLASK_ENV=development
python server.py