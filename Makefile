build-dev:
	cd webIOTReactFront && docker build -f Dockerfile.dev -t kneetrainer-app-client-dev:development .
	cd webIOTServerExpressJS && docker build -f Dockerfile.dev -t kneetrainer-api-server-dev:development .

run-dev:
	docker-compose -f docker-compose-dev.yml up 

