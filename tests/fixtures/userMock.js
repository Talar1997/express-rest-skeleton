module.exports = function (prefix = 'user') {
    let randomValue = Math.floor(Math.random() * 10000);

    return {
        name: `Auto generated mocha user`,
        email: `${prefix}-${Date.now()}-${randomValue}@email.com`,
        password: "StrongPassword123#",
        added: new Date(Date.now()),
        regenerateMail: function(){
            this.email = `${prefix}-${Date.now()}-${randomValue}@email.com`
        }
    }
}