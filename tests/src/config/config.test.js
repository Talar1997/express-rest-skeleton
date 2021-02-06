const {expect} = require('chai')
const dotenv = require('dotenv')
dotenv.config({path: 'config.env'})
const config = require('./../../../src/config/index')

describe('Config file test', function () {
    describe('Is variables were set from .env to config.js', function () {
        describe('Environmental variables', function () {
            it('should environment exists', async function () {
                expect(config.environment).to.exist
                expect(config.port).to.exist
                expect(config.connection).to.exist
            });
        });

        describe('Database variables', function () {
            it('should database variables be set', async function () {
                expect(config.database.uri).to.exist
                expect(config.database.name).to.exist
                expect(config.database.backupCronExpression).to.exist
                expect(config.database.backupPath).to.exist
                expect(config.database.deleteLogsOlderThan).to.exist
            });
        });

        describe('JWT variables', function () {
            it('should jwt variables be set', async function () {
                expect(config.jwt.secret).to.exist
                expect(config.jwt.expiresIn).to.exist
            });
        });

        describe('ReCaptcha variables', function () {
            it('should reCaptcha variables be set', async function () {
                expect(config.recaptcha.required).to.exist
                expect(config.recaptcha.siteKey).to.exist
                expect(config.recaptcha.privateKey).to.exist
                expect(config.recaptcha.version).to.exist
            });
        });

        describe('CORS variables', function () {
            it('should cors variables be set', async function () {
                expect(config.cors.origin).to.exist
                expect(config.cors.credentials).to.exist
                expect(config.cors.secure).to.exist
                expect(config.cors.methods).to.exist
                expect(config.cors.preflightContinue).to.exist
                expect(config.cors.maxAge).to.exist
            });
        });

        describe('Logs variables', function () {
            it('should logs variables be set', async function () {
                expect(config.logs.path).to.exist
            });
        });

        describe('Agenda variables', function () {
            it('should agenda variables be set', async function () {
                expect(config.agenda.dbCollection).to.exist
                expect(config.agenda.pooltime).to.exist
                expect(config.agenda.concurrency).to.exist
            });
        });

        describe('Mailer variables', function () {
            it('should mailer variables be set', async function () {
                expect(config.mailer.transport.host).to.exist
                expect(config.mailer.transport.port).to.exist
                expect(config.mailer.transport.secure).to.exist
                expect(config.mailer.transport.auth.user).to.exist
                expect(config.mailer.transport.auth.pass).to.exist
            });
        });
    });
});