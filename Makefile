prismaInit:
	npx prisma init

postgres:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres

execDb:
	docker exec -it postgres psql -d user_management_db

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

.PHONY: test, runDb