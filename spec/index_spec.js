'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const server = require('../src/index.js').App;

describe('index.js', () => {
    it('presponds to an empty GET request with "Hello, world!"', (done) => {
        let options = {
            method: "GET",
            url: "/"
        };

        server.inject(options, function(response) {
            let result = response.result;

            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
