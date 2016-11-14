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

/**  Macthup with Conformance Requirements Document
 * XAPI-00187 - below
 * XAPI-00188 - below
 * XAPI-00189 - below
 * XAPI-00190 - below
 * XAPI-00191 - below
 * XAPI-00192 - below
 * XAPI-00193 - below
 * XAPI-00194 - below
 * XAPI-00195 - below
 * XAPI-00196 - below
 * XAPI-00197 - below
 * XAPI-00198 - below
 * XAPI-00199 - below
 * XAPI-00200 - below
 * XAPI-00201 - below
 * XAPI-00202 - below
 * XAPI-00203 - below
 * XAPI-00204 - below
 * XAPI-00205 - below
 * XAPI-00206 - below
 * XAPI-00207 - below
 * XAPI-00208 - below
 * XAPI-00209 - below
 * XAPI-00210 - below
 * XAPI-00211 - below
 * XAPI-00212 - below
 * XAPI-00213 - below
 * XAPI-00214 - below
 * XAPI-00215 - below
 * XAPI-00216 - below
 * XAPI-00217 - below
 * XAPI-00218 - below
 * XAPI-00219 - below
 * XAPI-00220 - below
 * XAPI-00221 - below
 * XAPI-00222 - not yet found - The State API's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present
 * XAPI-00223 - below
 * XAPI-00224 - look in parameter folder - An LRS's State API rejects a DELETE request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request
 * XAPI-00225 - look in parameters forlder - An LRS's State API rejects a GET request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request
 * XAPI-00226 - look in parameters folder - An LRS's State API rejects a POST request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request
 * XAPI-00227 - below
 * XAPI-00228 - look in parameters folder - An LRS's State API rejects a PUT request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request
 * XAPI-00229 - not found yet - An LRS's State API, rejects a POST request if the document is found and either document is not a valid JSON Object
 * XAPI-00230 - in Communication2.2-DocumentResources.js
 * XAPI-00231 - in Communication2.2-DocumentResources.js
 * XAPI-00232 - in Communication2.2-DocumentResources.js
 * XAPI-00233 - in Communication2.2-DocumentResources.js
 * XAPI-00234 - in Communication2.2-DocumentResources.js
 * XAPI-00235 - not found yet - An LRS must reject with 400 Bad Request a POST request to the State API which contains name/value pairs with invalid JSON and the Content-Type header is "application/json
 */

describe('State Resource Requirements (Communication 2.3)', () => {

/**  XAPI-00190, Communication 2.3 State Resource
* An LRS's State API upon processing a successful PUT request returns code 204 No Content
*/
    it('An LRS\'s State Resource accepts PUT requests (Communication 2.3, XAPI-00190)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00189, Communication 2.3 State Resource
* An LRS's State API upon processing a successful POST request returns code 204 No Content
*/
    it('An LRS\'s State Resource accepts POST requests (Communication 2.3, XAPI-00189)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00188, Communication 2.3 State Resource
* An LRS's State API upon processing a successful GET request returns 200 Ok, State Document
*/
    it('An LRS\'s State Resource accepts GET requests (Communication 2.3, XAPI-00188)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

/**  XAPI-00187, Communication 2.3 State Resource
* An LRS's State API upon processing a successful DELETE request returns code 204 No Content
*/
    it('An LRS\'s State Resource accepts DELETE requests (Communication 2.3, XAPI-00187)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

    it('An LRS\'s State Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.3.s3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS\'s State Resource upon processing a successful POST request returns code 204 No Content (Communication 2.3.s3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00192, Communication 2.3 State Resource
 * An LRS's State API upon processing a successful GET request with a valid "stateId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK NOTE: There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional
 */
    it('An LRS\'s State Resource upon processing a successful GET request with a valid "stateId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.3.s3, XAPI-00192)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

/**  XAPI-00191, Communication 2.3 State Resource
 * An LRS's State API upon processing a successful DELETE request with a valid "stateId" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content NOTE: There is no requirement here that the LRS reacts to the "since" parameter in the case of a DELETE request with valid "stateId" - this is intentional
 */
    it('An LRS\'s State Resource upon processing a successful DELETE request with a valid "stateId" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content (Communication 2.3.s3, XAPI-00191)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

/**  XAPI-00210, Communication 2.3 State Resource
 * An LRS's State API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1, XAPI-00210)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    describe('An LRS\'s State Resource rejects a PUT request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var invalidTypes = [{ key: 'value'}, 1, true, undefined];
        invalidTypes.forEach(function (type) {
            it('Should State Resource reject a PUT request with activityId type ' + type, function () {
                var parameters = helper.buildState(),
                    document = helper.buildDocument();
                parameters.activityId = type;
                return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00209, Communication 2.3 State Resource
 * An LRS's State API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1, XAPI-00209)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    describe('An LRS\'s State Resource rejects a POST request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}, undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT State with stateId type : ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00208, Communication 2.3 State Resource
 * An LRS's State API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1, XAPI-00208)', function () {
        var parameters = helper.buildState();
        delete parameters.activityId;
        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    describe('An LRS\'s State Resource rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}, undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "activityId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00207, Communication 2.3 State Resource
 * An LRS's State API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1, XAPI-00207)', function () {
        var parameters = helper.buildState();
        delete parameters.activityId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    describe('An LRS\'s State Resource rejects a DELETE request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}, undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "activityId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00215, Communication 2.3 State Resource
 * An LRS's State API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request
 */
    //+* In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version**
    it('An LRS\'s State Resource rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2, XAPI-00215)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

/**  XAPI-00199, Communication 2.3 State Resource
 * An LRS's State API rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2, XAPI-00199)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.agent = 'not JSON';
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

/**  XAPI-00214, Communication 2.3 State Resource
 * An LRS's State API rejects a POST request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

/**  XAPI-00198, Communication 2.3 State Resource
 * An LRS's State API rejects a POST request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a POST request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2, XAPI-00198)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not JSON', undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject POST State with agent type : ' + type, function () {
                var parameters = helper.buildState();
                parameters.agent = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00213, Communication 2.3 State Resource
 * An LRS's State API rejects a GET request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2, XAPI-00213)', function () {
        var parameters = helper.buildState();
        delete parameters.agent;
        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

/**  XAPI-00197, Communication 2.3 State Resource
 * An LRS's State API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2, XAPI-00197)', function () {
        var invalidTypes = [1, true, 'not JSON', undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "agent" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.agent = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00212, Communication 2.3 State Resource
 * An LRS's State API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2, XAPI-00212)', function () {
        var parameters = helper.buildState();
        delete parameters.agent;
        return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

/**  XAPI-00196, Communication 2.3 State Resource
 * An LRS's State API rejects a DELETE request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a DELETE request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2, XAPI-00196)', function () {
        var invalidTypes = [1, true, 'not JSON', undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "agent" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00218, Communication 2.3 State Resource
 * An LRS's State API can process a PUT request with "registration" as a parameter
 */
    it('An LRS\'s State Resource can process a PUT request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3, XAPI-00218)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00203, Communication 2.3 State Resource
 * An LRS's State API rejects a PUT request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a PUT request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request(format, Communication 2.3.s3.table1.row3, XAPI-00203)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00227, Communication 2.3 State Resource
 * An LRS's State API can process a POST request with "registration" as a parameter
 */
    it('An LRS\'s State Resource can process a POST request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00202, Communication 2.3 State Resource
 * An LRS's State API rejects a POST request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a POST request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, Communication 2.3.s3.table1.row3, XAPI-00202)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

/**  XAPI-00220, Communication 2.3 State Resource
 * An LRS's State API can process a GET request with "registration" as a parameter
 */
    it('An LRS\'s State Resource can process a GET request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3, XAPI-00220)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

/**  XAPI-00201, Communication 2.3 State Resource
 * An LRS's State API rejects a GET request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a GET request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, Communication 2.3.s3.table1.row3, XAPI-00201)', function () {
        var invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00219, Communication 2.3 State Resource
 * An LRS's State API can process a DELETE request with "registration" as a parameter
 */
    it('An LRS\'s State Resource can process a DELETE request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3, XAPI-00219)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

/**  XAPI-00200, Communication 2.3 State Resource
 * An LRS's State API rejects a DELETE request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request
 */
    describe('An LRS\'s State Resource rejects a DELETE request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, Communication 2.3.s3.table1.row3, XAPI-00200)', function () {
        var invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00206, Communication 2.3 State Resource
 * An LRS's State API rejects a PUT request without "stateId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a PUT request without "stateId" as a parameter with error code 400 Bad Request(multiplicity, Communication 2.3.s3.table1.row4, XAPI-00206)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.stateId;
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

/**  XAPI-00211, Communication 2.3 State Resource
 * An LRS's State API rejects a POST request without "stateId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a POST request without "stateId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row4, XAPI-00211)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.stateId;
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

/**  XAPI-00217, Communication 2.3 State Resource
 * An LRS's State API can process a GET request with "stateId" as a parameter
 */
    it('An LRS\'s State Resource can process a GET request with "stateId" as a parameter (multiplicity, Communication 2.3.s3.table1.row4, XAPI-00217)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00221, Communication 2.3 State Resource
 * An LRS's State API can process a GET request with "since" as a parameter. Returning 200 OK and all matching profiles after the date/time of the “since” parameter.
 */
    it('An LRS\'s State Resource can process a GET request with "since" as a parameter (multiplicity, Communication 2.3.s4.table1.row4, XAPI-00221)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString(); // Date 1 minute ago
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

/**  XAPI-00204, Communication 2.3 State Resource
 * An LRS's State API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request
 */
    it('An LRS\'s State Resource rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.3.s4.table1.row4, XAPI-00204)', function () {
        var parameters = helper.buildState();
        parameters.since = 'not a timestamp';
        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

/**  XAPI-00216, Communication 2.3 State Resource
 * An LRS's State API can process a DELETE request with "stateId" as a parameter
 */
    it('An LRS\'s State Resource can process a DELETE request with "stateId" as a parameter (multiplicity, Communication 2.3.s3.table1.row4, XAPI-00216)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

// No 'since' property with DELETE in the State Resource
/**  XAPI-00205, Communication 2.3 State Resource
 * An LRS's State API rejects a DELETE request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request
 */
/**  XAPI-00223, Communication 2.3 State Resource
 * An LRS's State API can process a DELETE request with "since" as a parameter
 */
    // describe('An LRS\'s State Resource rejects a DELETE request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication.md#2.3.s3.table1.row4, XAPI-00205, XAPI-00223)', function () {
    //     var invalidTypes = [1, true];
    //     invalidTypes.forEach(function (type) {
    //         it('Should reject DELETE with "since" with type ' + type, function () {
    //             var parameters = helper.buildState();
    //             parameters.since = type;
    //             return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    //         });
    //     });
    // });

/**  XAPI-00193, Communication 2.3 State Resource
 * An LRS's State API upon processing a successful GET request without "stateId" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK
 */
    //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
    it('An LRS\'s State Resource upon processing a successful GET request without "stateId" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK (Communication 2.3.s4, XAPI-00193)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                delete parameters.stateId;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                    });
            });
    });

/**  XAPI-00195, Communication 2.3 State Resource
 * An LRS's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request
 */
    it('An LRS\'s returned array of ids from a successful GET request to the State Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request (Communication 2.3.s4.table1.row4, XAPI-00195)', function () {
        var document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), document, 204)
                    .then(function () {
                        var parameters = helper.buildState();
                        delete parameters.stateId;
                        parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.be.an('array');
                                expect(body).to.have.length.above(1);
                            });
                    });
            });
    });

/**  XAPI-00194, Communication 2.3 State Resource
 * An LRS's State API upon processing a successful DELETE request without "stateId" as a parameter deletes documents satisfying the requirements of the DELETE and code 204 No Content
 */
    //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
    it('An LRS\'s State Resource upon processing a successful DELETE request without "stateId" as a parameter deletes documents satisfying the requirements of the DELETE and code 204 No Content (Communication 2.3.s5, XAPI-00194)', function () {
        var parameters = helper.buildState();
        parameters.activityId = parameters.activityId + helper.generateUUID();

        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, helper.buildDocument(), 204)
            .then(function () {
                delete parameters.stateId;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), helper.buildDocument(), 204)
                .then(function () {
                    return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204)
                        .then(function () {
                            return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.be.an('array');
                                    expect(body).to.have.length(0);
                                });
                        });
                });
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
