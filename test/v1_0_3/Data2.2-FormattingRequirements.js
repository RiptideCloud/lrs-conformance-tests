/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

    before("Before all tests are run", function (done) {
        console.log("Setting up\nAccounting for time differential between test suite and lrs");
        helper.setTimeMargin(done);
    });

describe('Formatting Requirements (Data 2.2)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00001 - in formattting.js
 * XAPI-00002 - below
 * XAPI-00003 - in formattting.js
 * XAPI-00004 - in formattting.js
 * XAPI-00005 - in formattting.js
 * XAPI-00006 - in formattting.js
 * XAPI-00007 - in formattting.js
 * XAPI-00008 - in formattting.js
 * XAPI-00009 - in formattting.js
 * XAPI-00010 - no match found yet - An LRS rejects with error code 400 Bad Request a Statement where a key or value is not allowed by this specification.
 * XAPI-00011 - no match found yet - is this covered by multiple individual tests, if so should they be grouped together for this req? - An LRS rejects with error code 400 Bad Request a Statement containing IRL or IRI values without a scheme.
 * XAPI-00012 - no match yet - broad catchall again - is this taken care of by many other tests throughout the suite? - The LRS rejects with error code 400 Bad Request parameter values which do not validate to the same standards required for values of the same types in Statements.
 * XAPI-00013 - in formattting.js from Data 2.4.6
 * XAPI-00014 - below - best ref in spec is Data 2.1 - leave it here
 * XAPI-00015 - in Communication 1.4 - should stay in Comm 1.4 Encoding
 */

    templatingSelection.createTemplate('formatting.js');

/**  XAPI-00002, Data 2.2 Formatting Requirements
 * An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754
 */
    describe('An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754 (Data 2.2.s4.b3, XAPI-00002)', function() {
        this.timeout(0);

        it('should pass and keep precision', function(done) {

            var templates = [
                {statement: '{{statements.result}}'},
                {result: '{{results.default}}'},
            ],
                data = helper.createFromTemplate(templates).statement,
                id = helper.generateUUID(),
                query = '?statementId=' + id,
                min = 0.12123434,
                raw = 12.125,
                max = 45.45,
                stmtTime = Date.now();

            data.id = id;
            data.result.score.min = min;
            data.result.score.raw = raw;
            data.result.score.max = max;
            data.result.score.scaled = min;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200)
            .end()
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, query, id))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var score = helper.parse(res.body).result.score;
                    expect(score.min).to.eql(min);
                    expect(score.raw).to.eql(raw);
                    expect(score.max).to.eql(max);
                    expect(score.scaled).to.eql(min);
                    done();
                }
            });
        });
    });

/**  XAPI-00014, Data 2.2 Formatting Requirements
 * All Objects are well-created JSON Objects (Nature of Binding)
 */
    it('All Objects are well-created JSON Objects (Nature of binding, Data 2.1, XAPI-00014) **Implicit**', function (done) {
        var verbTemplate = 'http://adlnet.gov/expapi/test/unicode/target/';
        var verb = verbTemplate + helper.generateUUID();
        var malformedTemplates = [
            {statement: '{{statements.default}}'}
        ];
        var malformed = helper.createFromTemplate(malformedTemplates);
        malformed = malformed.statement;
        var string = "\"objectType\": \"Agent\"";
        malformed.actor.objectType = string;

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json(malformed)
        .expect(400, done)
    });
});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
