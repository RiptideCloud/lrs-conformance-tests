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

describe('Document Resource Requirements (Communication 2.2)', () => {

/**  Macthup with Conformance Requirements Document
 * XAPI-00182 - not found yet - An LRS makes no modifications to stored data for any rejected request.
 * XAPI-00183 - below
 * XAPI-00184 - below
 * XAPI-00185 - not found yet - A Document Merge re-serializes all Objects to finalize a single document
 * XAPI-00186 - not found yet - A Document Merge de-serializes all Objects represented by each document before making other changes.
 */



/**  XAPI-00230, Communication 2.3 State Resource
 * An LRS has a State API with endpoint "base IRI"+"/activities/state"
 */
    it('An LRS has a State Resource with endpoint "base IRI"+"/activities/state" (Communication 2.2.s3.table1.row1, XAPI-00230)', function () {
        //Also covers An LRS will accept a POST request to the State Resource
        var parameters = helper.buildState(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00231, Communication 2.3 State Resource
 * An LRS will accept a POST request to the State API
 */
    it('An LRS will accept a POST request to the State Resource (Communication 2.2.s3.table1.row1.a)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

/**  XAPI-00311, Communication 2.7 Activity Profile Resource
 * An LRS has an Activity Profile API with endpoint "base IRI"+"/activities/profile"
 */
    it('An LRS has an Activity Profile Resource with endpoint "base IRI"+"/activities/profile" (Communication 2.2.s3.table1.row2, XAPI-00311)', function () {
        //Also covers An LRS will accept a POST request to the Activity Profile Resource
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00312, Communication 2.7 Activity Profile Resource
 * An LRS will accept a POST request to the Activity Profile API
 */
    it('An LRS will accept a POST request to the Activity Profile Resource (Communication 2.2.s3.table1.row2.a, XAPI-00312)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00282, Communication 2.6 Agent Profile Resource
 * An LRS has an Agent Profile API with endpoint "base IRI"+"/agents/profile"
 */
    it('An LRS has an Agent Profile Resource with endpoint "base IRI"+"/agents/profile" (Communication 2.2.s3.table2.row3.a, Communication 2.2.table2.row3.c, XAPI-00282)', function () {
        //Also covers An LRS will accept a POST request to the Agent Profile Resource
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

/**  XAPI-00283, Communication 2.6 Agent Profile Resource
 * An LRS will accept a POST request to the Agent Profile API
 */
    it('An LRS will accept a POST request to the Agent Profile Resource (Communication 2.2.s3.table1.row3.a, XAPI-00283)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    describe('An LRS cannot reject a POST request to the State Resource based on the contents of the name/value pairs of the document (Communication 2.2.s4.b2, Implicit) **Implicit**', function () {
        var documents = [helper.buildDocument(), '1', 'true'];
        documents.forEach(function (document) {
            it('Should accept POST to State with document ' + document, function () {
                var parameters = helper.buildState();
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
            });
        });
    });

    describe('An LRS cannot reject a POST request to the Activity Profile Resource based on the contents of the name/value pairs of the document (Communication 2.2.s4.b2, Implicit) **Implicit**', function () {
        var documents = [helper.buildDocument(), '1', 'true'];
        documents.forEach(function (document) {
            it('Should accept POST to Activity profile with document ' + document, function () {
                var parameters = helper.buildActivityProfile();
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
            });
        });
    });

    describe('An LRS cannot reject a POST request to the Agent Profile Resource based on the contents of the name/value pairs of the document (Communication 2.2.s4.b2, Implicit) **Implicit**', function () {
        var documents = [{}, '1', 'true'];
        documents.forEach(function (document) {
            it('Should accept POST to Agent profile with document ' + document, function () {
                var parameters = helper.buildAgentProfile();
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
            });
        });
    });

/**  XAPI-00233, Communication 2.3 State Resource
 * An LRS's State API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document. Returning 204 No Content
 */
    it('An LRS\'s State Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7, XAPI-00233)', function () {
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

/**  XAPI-00310, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document. Returning 204 No Content
 */
    it('An LRS\'s Activity Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7, XAPI-00310)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00280, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document.Returning 204 No Content
 */
    it('An LRS\'s Agent Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7, XAPI-00280)', function () {
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

/**  XAPI-00184, Communication 2.2 Documents Resources
 * A Document Merge overwrites any duplicate values from the previous document with the new document.
 */
    it('A Document Merge overwrites any duplicate Objects from the previous document with the new document. (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00184)', function () {
        var parameters = helper.buildState(),
            document = {
                car: 'MKX'
            },
            anotherDocument = {
                car: 'MKZ'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'MKZ'
                                })
                            });
                    });
            });
    });

/**  XAPI-00183, Communication 2.2 Documents Resources
 * A Document Merge only performs overwrites at one level deep, although the entire object is replaced.
 */
    it('A Document Merge only performs overwrites at one level deep, although the entire object is replaced. (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00183)', function () {
        var parameters = helper.buildState(),
            document = {
                car: {
                        make: "Ford",
                        model: "Escape"
                },
                driver: "Dale",
                series: {
                    nascar: {
                        series: "sprint"
                    }
                }
            },
            anotherDocument = {
                car: {
                        make: "Dodge",
                        model: "Ram"
                },
                driver: "Jeff",
                series: {
                    nascar: {
                        series: "nextel"
                    }
                }
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: {
                                            make: "Dodge",
                                            model: "Ram"
                                    },
                                    driver: "Jeff",
                                    series: {
                                        nascar: {
                                            series: "nextel"
                                        }
                                    }
                                })
                            });
                    });
            });
    });

/**  XAPI-00234, Communication 2.3 State Resource
 * An LRS's State API performs a Document Merge if a profileId is found and both it and the document in the POST request have type "application/json". If the merge is successful, the LRS MUST respond with HTTP status code 204 No Content.
 * differing language - double check this test
 */
    it('An LRS\'s State Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00234)', function () {
        var parameters = helper.buildState(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'Honda',
                                    type: 'Civic'
                                })
                            });
                    });
            });
    });

/**  XAPI-00308, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API performs a Document Merge if a activityId is found and both it and the document in the POST request have type "application/json" If the merge is successful, the LRS MUST respond with HTTP status code 204 No Content.
 * activityId??
 */
    it('An LRS\'s Activity Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00308)', function () {
        var parameters = helper.buildActivityProfile(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'Honda',
                                    type: 'Civic'
                                })
                            });
                    });
            });
    });

/**  XAPI-00279, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API performs a Document Merge if a profileId is found and both it and the document in the POST request have type "application/json" If the merge is successful, the LRS MUST respond with HTTP status code 204 No Content.
 * not quite, but is this close enough??
 */
    it('An LRS\'s Agent Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00279)', function () {
        var parameters = helper.buildAgentProfile(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'Honda',
                                    type: 'Civic'
                                })
                            });
                    });
            });
    });

/**  XAPI-00232, Communication 2.3 State Resource
 * An LRS's State API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request
 */
    it('An LRS\'s State Resource, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (Communication 2.2.s8.b1, XAPI-00232)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument(),
            anotherDocument = 'abc';
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 400);
            });
    });

/**  XAPI-00309, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (Communication 2.2.s8.b1, XAPI-00309)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument(),
            anotherDocument = 'abc';
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 400);
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
