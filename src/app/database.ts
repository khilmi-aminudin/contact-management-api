import { PrismaClient } from '@prisma/client'
import logger from './logger'

const database = new PrismaClient({
    log: [
        {
            emit : 'event',
            level: 'info',
        },
        {
            emit : 'event',
            level: 'query',
        },
        {
            emit : 'event',
            level: 'warn',
        },
        {
            emit : 'event',
            level: 'error',
        }
    ]
})


database.$on('info', (e) => logger.info(e))
database.$on('query', (e) => logger.info(e))
database.$on('warn', (e) => logger.warn(e))
database.$on('error', (e) => logger.error(e))

export default database;