const https = require('https');
const http = require('http');
const fs = require('fs');
const config = require('../config')
const connection = config.connection;

const privateKey = fs.readFileSync('./config/certs/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./config/certs/cert.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

exports.initializeServer = async (app) => {
    if (connection === 'https') return https.createServer(credentials, app);
    else return http.createServer(app);
}