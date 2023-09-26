.DEFAULT_GOAL := all
SHELL         := bash

FRONTEND_DIR = frontend
BACKEND_DIR = backend

all:

install:
	(cd $(FRONTEND_DIR) && npm install)

start:
	(cd $(FRONTEND_DIR) && npm start)

run:
	$(MAKE) install
	$(MAKE) start

