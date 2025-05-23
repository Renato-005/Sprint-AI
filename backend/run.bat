@echo off
set FLASK_APP=server.py
set FLASK_DEBUG=1

flask run --port=8000
pause
