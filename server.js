var Hapi = require('hapi');
var path = require('path');
var config = require ('./app/config/config.js');
var mongoose = require ('./app/config/mongoose.js');
var secret = require('./app/config/configg.js');
var server = new Hapi.Server();
server.connection({ host:'localhost',port: 4000 });
server.register(require('hapi-auth-jwt'),function (err) {
    server.auth.strategy('jwt', 'jwt', {
    key: 'secret',
    verifyOptions: { algorithms: ['HS256'] }
});
    //Routes
    var routeone = require('./app/routes/jwtroute.js');
    server.route(routeone.endpoints);
    var routetwo = require('./app/routes/authenticateUser.js');
    server.route(routetwo.endauthenticationpoints);
    var routethree = require('./app/routes/getUsers.js');
    server.route(routethree.endgetUserspoints);
    server.log('Routes registered');

server.start(function (err) {
    if (err) {
        throw err
    }

    console.log('Server running at: ' + server.info.uri)
});
});
