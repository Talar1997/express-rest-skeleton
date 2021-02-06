const {expect} = require('chai')
const Log = require('./../../../src/models/log')

describe('Log Model', function () {
    describe('No data are provided', function () {
        it('should be invalid if required fields are empty', async function () {
            const model = new Log();

            model.validate(function(err) {
                expect(err.errors['action.method']).to.exist;
                expect(err.errors['action.url']).to.exist;
            });
        });
    });

    describe('Provided data out of enum scope', function () {
        it('should be invalid', async function () {
            const model = new Log({
                action:{
                    method: 'OUT OF ENUM',
                    url: '/some/api/url'
                },
                level: 'NOT-WARNING'
            });

            model.validate(function(err) {
                expect(err.errors['action.method']).to.exist;
                expect(err.errors['level']).to.exist;
            });
        });
    });

    describe('All data are provided', function () {
        it('should be valid', async function () {
            const model = new Log({
                action:{
                    method: 'POST',
                    url: '/some/api/url'
                }
            });

            model.validate(function(err) {
                expect(err).to.not.exist
            });
        });
    });
});