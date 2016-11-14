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

describe('Result Property Requirements (Data 2.4.5)', () => {

/**  Matchup with Conformance Requirements Document
 * Data 2.4.5 Result
 * XAPI-00074 - in results.js
 * XAPI-00075 - in results.js
 * XAPI-00076 - in results.js
 * XAPI-00077 - in results.js
 * XAPI-00078 - in results.js

 * Data 2.4.5.1 Score
 * XAPI-00079 - in results.js
 * XAPI-00080 - in results.js
 * XAPI-00081 - in results.js
 * XAPI-00082 - in results.js
 * XAPI-00083 - in results.js
 */
    templatingSelection.createTemplate('results.js');

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
