/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Agent Profile Resource Requirements (Communication 2.6)', () => {

/**  Matchup with Conformance
 * XAPI-00255 - below
 * XAPI-00256 - below
 * XAPI-00257 - below
 * XAPI-00258 - below
 * XAPI-00259 - below
 * XAPI-00260 - below
 * XAPI-00261 - below
 * XAPI-00262 - below
 * XAPI-00263 - below
 * XAPI-00264 - below
 * XAPI-00265 - below
 * XAPI-00266 - below
 * XAPI-00267 - below
 * XAPI-00268 - below
 * XAPI-00269 - below
 * XAPI-00270 - below
 * XAPI-00271 - below
 * XAPI-00272 - below
 * XAPI-00273 - below
 * XAPI-00274 - below
 * XAPI-00275 - below
 * XAPI-00276 - in parameters folder
 * XAPI-00277 - in parameters folder
 * XAPI-00278 - not found yet - An LRS's Agent Profile API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request
 * XAPI-00279 - in Communication2.2-DocumentResources.js
 * XAPI-00280 - in Communication2.2-DocumentResources.js
 * XAPI-00281 - not found yet - An LRS's Agent Profile API, rejects a POST request if the document is found and either document is not a valid JSON Object
 * XAPI-00282 - in Communication2.2-DocumentResources.js
 * XAPI-00283 - in Communication2.2-DocumentResources.js
 * XAPI-00284 - not found yet - An LRS must reject, with 400 Bad Request, a POST request to the Agent Profile API which contains name/value pairs with invalid JSON and the Content-Type header is "application/json
 */

    it('An LRS\'s Agent Profile Resource accepts PUT requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS\'s Agent Profile Resource accepts POST requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS\'s Agent Profile Resource accepts DELETE requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile();
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204);
    });

/**  XAPI-00274, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API accepts valid GET requests with code 200 OK, Profile document
 */
    it('An LRS\'s Agent Profile Resource accepts GET requests (Communication 2.6.s2, XAPI-00274)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
            });
    });

/**  XAPI-00273, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful PUT request returns code 204 No Content
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.6.s3, XAPI-00273)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

/**  XAPI-00272, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful POST request returns code 204 No Content
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful POST request returns code 204 No Content (Communication 2.6.s3, XAPI-00272)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

/**  XAPI-00271, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (Communication 2.6.s3)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204)
            });
    });

/**  XAPI-00259, Communication 2.6 Agent Profile Resource
 * The Agent Profile API MUST return 200 OK - Profile Content when a GET request is received with a valid agent JSON Object.
 */
/**  XAPI-00269, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful GET request with a valid Agent Object and valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.6.s3, XAPI-00259, XAPI-00269)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00264, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1, XAPI-00264)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/**  XAPI-00257, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a PUT request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a PUT request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1, XAPI-00257)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not Agent', { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00263, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a POST request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1, XAPI-00263)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/**  XAPI-00256, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a POST request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a POST request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1, XAPI-00256)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00262, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1, XAPI-00262)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.agent;
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

/**  XAPI-00255, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a DELETE request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a DELETE request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1, XAPI-00255)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00258, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a GET request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a GET request with "agent" as a parameter if it is a valid (in structure) Agent with error code 400 Bad Request (multiplicity, Communication 2.6.s4.table1.row1, Communication 2.6.s3.table1.row1, XAPI-00258)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        parameters.agent = {
            "objectType": "Agent"
        };
        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/** XAPI-00267, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2, XAPI-00267)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/**  XAPI-00266, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2, XAPI-00266)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/**  XAPI-00265, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2, XAPI-00265)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.profileId;
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

    // Type "String" - likely to be reworded or removed
    describe('An LRS\'s Agent Profile Resource rejects a DELETE request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.6.s3.table1.row2)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "profileId" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00270, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful GET request with a valid Agent Object and without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful GET request without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK (Communication 2.6.s4, XAPI-00270)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.have.length.above(0);
                    })
            });
    });

/**  XAPI-00261, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a GET request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s4.table1.row1, XAPI-00261)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    describe('An LRS\'s Agent Profile Resource rejects a GET request with "agent" as a parameter if it is not an Actor Object with error code 400 Bad Request (format, Communication 2.6.s4.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, {"not_actor": "yup"}, 'not Actor'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00268, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API can process a GET request with "since" as a parameter. Returning 200 OK and all matching profiles after the date/time of the “since” parameter
 */
    it('An LRS\'s Agent Profile Resource can process a GET request with "since" as a parameter (Multiplicity, Communication 2.6.s4.table1.row2, XAPI-00268)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
            });
    });

/**  XAPI-00260, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.6.s4.table1.row2, XAPI-00260)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}, 'not timestamp'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "since" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00275, Communication 2.6 Agent Profile Resource
 * The Agent Profile API's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present
 */
    it('An LRS\'s returned array of ids from a successful GET request to the Agent Profile Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (Communication 2.6.s4.table1.row2, XAPI-00275)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                        expect(body).to.have.length.above(0);
                    })
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
