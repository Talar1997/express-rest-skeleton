const {expect} = require('chai')
const User = require('./../../../src/models/user')
const bcrypt = require('bcryptjs')

describe('User Model', function () {
    describe('No data are provided', function () {
        it('should be invalid if required fields are empty', async function () {
            const model = new User();

            model.validate(function(err) {
                expect(err.errors.name).to.exist;
                expect(err.errors.email).to.exist;
                expect(err.errors.password).to.exist;
            });
        });
    });

    describe('Provided invalid email', function () {
        it('should be invalid', async function () {
            const model = new User({
                name: 'John Doe',
                email: 'john.doe.invalid.email',
                password: 'TestPassword1234',
            })

            model.validate(function (err){
                expect(err.errors.email).to.exist
            })
        });
    });

    describe('Password compare method', function () {
        it('should be valid', async function () {
            const originalPassword = 'TestPassword1234'
            const hashedPassword = await bcrypt.hash(originalPassword, 12)

            const model = new User({
                name: 'John Doe',
                email: 'john.doe.invalid.email',
                password: hashedPassword,
            })

            const result = await model.comparePassword(originalPassword, hashedPassword)

            expect(result).to.be.true
        });
    });

    //TODO: create test for pre('save') middleware
    describe('Save method test', function () {
        it('should be valid', async function () {
            expect(1).to.equal(1)
        });
    });

    describe('All data are provided', function () {
        it('should be valid', async function () {
            const model = new User({
                name: 'John Doe',
                email: 'john.doe@company.com',
                password: 'TestPassword1234',
            })

            model.validate(function (err){
                expect(err).to.not.exist
            })
        });
    });

});