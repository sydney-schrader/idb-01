.DEFAULT_GOAL := all
SHELL         := bash

FRONTEND_DIR = frontend
BACKEND_DIR = backend

all:

install:
	(cd $(FRONTEND_DIR) && npm install)
	(cd $(FRONTEND_DIR) && npm i react-router-dom)

start:
	(cd $(FRONTEND_DIR) && npm start)

run:
	$(MAKE) install
	$(MAKE) start

