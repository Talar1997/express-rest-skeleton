const {expect} = require('chai')
const AppError = require('./../../../src/utils/appError')

describe('AppError class', function () {
    describe('Created error have proper error name', function () {
        it('should be AppError', async function () {
            let appError = new AppError(422, 'success', 'Test AppError')

            expect(appError.name).to.equal('AppError')
        });
    });
});