const {expect} = require('chai')

const dotenv = require('dotenv')
dotenv.config({path: 'config.env'})

const generateUserObject = require('./../../../fixtures/userMock')
const mongoDbMock = require('./../../../../src/loaders/mongoose')
const createUserService = require('./../../../../src/services/user/createUser')
const {roles} = require('./../../../../src/config/constants/roles.js')
const UserModel = require('./../../../../src/models/user')

let createdObjects = []

before("Load database", async function () {
    await mongoDbMock()
})

describe('Create User create service test', function () {
    describe('Create new user', function () {
        it('should return created user', async function () {
            let userObject = generateUserObject()
            let createdUser = await createUserService(userObject)

            createdObjects.push(createdUser['_id'])

            expect(createdUser).to.exist
            expect(createdUser['email']).to.equal(userObject.email)
            expect(createdUser['role']).to.equal(roles.USER)
            expect(createdUser['active']).to.equal(true)
        });

        it('should password be undefined', async function () {
            let userObject = generateUserObject()
            let createdUser = await createUserService(userObject)

            createdObjects.push(createdUser['_id'])

            expect(createdUser).to.exist
            expect(createdUser['password']).to.be.undefined
        });
    });


    describe('Create user with no data provided', function () {
        it('should throw error', async function () {
            await createUserService({}).catch(error => {
                expect(error).to.exist
                expect(error.name).to.equal('ValidationError')
            })
        });
    });

    describe('Create user with invalid data', function () {
        describe('Create user with duplicated email', function () {
            it('should throw error', async function () {
                let firstUser = generateUserObject()

                let createdUser = await createUserService(firstUser)
                createdObjects.push(createdUser['_id'])

                expect(createdUser).to.exist

                await createUserService(firstUser).catch(error => {
                    expect(error).to.exist
                    expect(error.name).to.equal('MongoError')
                })
            });
        });

        describe('Invalid password (empty)', function () {
            it('should throw error', async function () {
                let invalidUser = generateUserObject()
                delete invalidUser.password

                await createUserService(invalidUser)
                    .catch(error => {
                        expect(error).to.exist
                        expect(error.name).to.equal('ValidationError')
                    })
            });
        });

        describe('Invalid password (too short)', function () {
            it('should throw error', async function () {
                let invalidUser = generateUserObject()
                invalidUser.password = 'pswd'

                await createUserService(invalidUser)
                    .catch(error => {
                        expect(error).to.exist
                        expect(error.name).to.equal('ValidationError')
                    })
            });
        });

        describe('User role out of enum', function () {
            it('should throw error', async function () {
                let invalidUser = generateUserObject()
                invalidUser.role = 'InvalidRoleThatDoesntExists'

                await createUserService(invalidUser)
                    .catch(error => {
                        expect(error).to.exist
                        expect(error.name).to.equal('ValidationError')
                })
            });
        });
    });
});

after("Clean up...", async function () {
    for(const id of createdObjects){
        await UserModel.findByIdAndDelete(id)
    }
})