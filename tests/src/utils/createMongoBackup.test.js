const {expect} = require('chai')
const dotenv = require('dotenv')
dotenv.config({path: 'config.env'})
const createMongoBackup = require('./../../../src/utils/createMongoBackup')
const fs = require("fs")

describe('Mongo backup module', function () {
    const basePath = './tests/mongoBackupFiles'
    const extension = 'tar'

    before("Before creating backup", function (done){
        console.log("Creating directory for backup...")
        fs.mkdir(basePath, err => {
            console.log(err)
        })
        done()
    })

    describe('test', function () {
        it('should create database backup', async function () {
            await createMongoBackup(basePath)

            let files = fs.readdirSync(basePath);
            files = files.filter( file => file.match(new RegExp(`.*\.(${extension})`, 'ig')));

            expect(files.length).to.not.equal(0)
        });
    });


    after("Removing files", function (done){
        console.log("Removing directory for backup...")

        fs.rmdir(basePath, {
            recursive: true
        }, err => {
            console.log(err)
        })
        done()
    })

});