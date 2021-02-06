const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    environment: process.env.NODE_ENVIRONMENT,
    port: process.env.PORT,
    connection: process.env.CONNECTION_TYPE,

    database:{
        uri: process.env.DATABASE,
        name: process.env.DB_NAME,
        backupCronExpression: process.env.DB_BACKUP_CRON,
        backupPath: process.env.DB_BACKUP_PATH,
        deleteLogsOlderThan: parseInt(process.env.DB_DELETE_LOGS_OLDER_THAN)
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
    },

    recaptcha: {
        required: process.env.REQUIRE_RECAPTCHA === 'true',
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        privateKey: process.env.RECAPTCHA_PRIVATE,
        version: parseInt(process.env.RECAPTCHA_VERSION),
    },

    cors: {
        origin: process.env.ORIGIN,
        credentials: process.env.CREDENTIALS === 'true',
        secure: process.env.SECURE === 'true',
        methods: process.env.METHODS,
        preflightContinue: process.env.PREFLIGHT_CONTINUE === 'true',
        maxAge: parseInt(process.env.MAX_AGE)
    },

    logs: {
        path: process.env.LOG_ERROR_PATH,
    },

    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    },

    mailer: {
        transport: {
            host: process.env.TRANSPORT_HOST,
            port: process.env.TRANSPORT_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.TRANSPORT_AUTH_USER,
                pass: process.env.TRANSPORT_AUTH_PASSWORD,
            },
        }
    }
}