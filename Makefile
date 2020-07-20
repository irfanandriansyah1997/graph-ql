###########################################################################
## Make file
## @author: Irfan Andriansyah <irfan@99.co>
## @since: 2020.07.20
###########################################################################

DOCKER_COMPOSE=docker-compose -f docker-compose.yml -p graph
DOCKER_COMPOSE_DEV=docker-compose -f docker-compose.dev.yml -p graph

default:

start-dev:
	@echo "#####################"
	@echo "####### Graph #######"
	@echo "#####################"
	@echo
	@echo "Start dev..."
	@echo
	@$(DOCKER_COMPOSE_DEV) up -d database
	@echo "Wait for 10 seconds for database and es up and running properly"
	@sleep 10
	@$(DOCKER_COMPOSE) up