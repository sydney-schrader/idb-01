.DEFAULT_GOAL := all
SHELL         := bash

FRONTEND_DIR = frontend
BACKEND_DIR = backend

all:
	make install
	make build
	
	make start
	(cd $(BACKEND_DIR) && python3 main.py)
install:
	(cd $(FRONTEND_DIR) && npm install)
	(cd $(FRONTEND_DIR) && npm i react-router-dom)
	(cd $(FRONTEND_DIR) && npm install @mui/material @emotion/react @emotion/styled)
	(cd $(FRONTEND_DIR) && npm install axios)
	(cd $(FRONTEND_DIR) && npm install @react-google-maps/api)

build:
	(cd $(FRONTEND_DIR) && npm run build)

start:
	(cd $(FRONTEND_DIR) && npm start)

test_backend:
	(cd $(BACKEND_DIR) && python3 test_backend.py)

