const {expect} = require('chai')

const dotenv = require('dotenv')
dotenv.config({path: 'config.env'})

const generateUserObject = require('./../../../fixtures/userMock')
const mongoDbMock = require('./../../../../src/loaders/mongoose')
const createUserService = require('./../../../../src/services/user/createUser')
const updateUserService = require('./../../../../src/services/user/updateUser')
const UserModel = require('./../../../../src/models/user')

let createdObjects = []

before("Load database", async function () {
    await mongoDbMock()
})

describe('Create User update service test', function () {
    describe('With password change', function () {
        it('should update user and password should be changed', async function () {
            let newUserMock = generateUserObject()
            let createdUser = await createUserService(newUserMock)
            let createdUserWithPassword = await UserModel.findById(createdUser['_id']).select('+password')

            createdObjects.push(createdUser['_id'])

            createdUser.password = "NewStrongPassword123#"
            await updateUserService(createdUser['_id'], createdUser)
            let updatedUser = await UserModel.findById(createdUser['_id']).select('+password')

            expect(updatedUser.password).to.be.not.equal(createdUserWithPassword.password)
        });
    });

    describe('Without password change', function () {
        it('should update user without password', async function () {
            let newUserMock = generateUserObject()
            let createdUser = await createUserService(newUserMock)
            let createdUserWithPassword = await UserModel.findById(createdUser['_id']).select('+password')

            createdObjects.push(createdUser['_id'])

            createdUser.name = "New username"

            await updateUserService(createdUser['_id'], createdUser)
            let updatedUser = await UserModel.findById(createdUser['_id']).select('+password')

            expect(updatedUser.password).to.be.equal(createdUserWithPassword.password)
        });
    });

    describe('Update to with invalid data', function () {
        describe('Weak password', function () {
            it('should throw error', async function () {
                let newUserMock = generateUserObject()
                let createdUser = await createUserService(newUserMock)
                createdObjects.push(createdUser['_id'])

                createdUser.password = "pswd"

                await updateUserService(createdUser['_id'], createdUser)
                    .catch(error => {
                        expect(error).to.exist
                        expect(error.name).to.equal('AppError')
                    });
            });

            describe('Duplicated email', function () {
                it('should throw error', async function () {
                    let newUserMock = generateUserObject()
                    let createdUserOne = await createUserService(newUserMock)

                    let userTwo = generateUserObject()
                    let createdUserTwo = await createUserService(userTwo)

                    createdUserTwo.email = createdUserOne.email

                    await updateUserService(createdUserTwo['_id'], createdUserTwo)
                        .catch(error => {
                            expect(error).to.exist
                            expect(error.name).to.equal('MongoError')
                        })
                });
            });

            describe('Prompted empty required field', function () {
                it('should throw error', async function () {
                    let newUserMock = generateUserObject()
                    let createdUser = await createUserService(newUserMock)

                    createdUser.email = ''

                    await updateUserService(createdUser['_id'], createdUser)
                        .catch(error => {
                            expect(error).to.exist
                            expect(error.name).to.equal('ValidationError')
                        })
                });
            });
        });
    })

    after("Clean up...", async function () {
        for (const id of createdObjects) {
            await UserModel.findByIdAndDelete(id)
        }
    })
})