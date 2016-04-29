/// <reference path="../typings/main/ambient/node/index.d.ts" />
/// <reference path="../typings/main/ambient/hapi/index.d.ts" />

import { Server } from "hapi"

var server = new Server();

server.connection({ port: process.env.PORT || 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params["name"]) + '!');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

export var App = server;
