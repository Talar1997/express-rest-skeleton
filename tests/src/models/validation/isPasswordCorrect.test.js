const {expect} = require('chai')
const isPasswordCorrect = require('./../../../../src/models/validation/isPasswordCorrect')
const moment = require('moment')

describe("Password validation test", function () {
    describe('Correct password', function () {
        it("Should be true", async function () {
            const password = "GoodPassword12#!"

            const result = await isPasswordCorrect(password)

            expect(result).to.be.true
        })
    });

    describe('Incorrect passwords.',  function (){
        describe('Too short password', function () {
            it('should be false (7 chars)', async function ()  {
                const tooShortPassword = "1234567"

                const result = await isPasswordCorrect(tooShortPassword)

                expect(result).to.be.false
            });
        });

        describe('Too long password (129 chars)', function () {
            it('should be false', async function () {
                const tooLongPassword = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2Qs"

                const result = await isPasswordCorrect(tooLongPassword)

                expect(result).to.be.false
            });
        });

        describe('Password with only small letters', function () {
            it('should be false', async function ()  {
                const password = "abcdefghijkqwertyuiop"

                const result = await isPasswordCorrect(password)

                expect(result).to.be.false
            });
        });
    })
})