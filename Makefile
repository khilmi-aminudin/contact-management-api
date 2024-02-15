prismaInit:
	npx prisma init

postgres:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres

execDb:
	docker exec -it postgres psql -d contact_management_db

runDb:
	docker start postgres

install:
	npm install

dbMigrate:
	npx prisma migrate dev

test:
	npm test

start:
	npm run build && npm run start

runDev:
	npm run dev

mongo:
	docker run -d -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

.PHONY: test, runDb
