'use strict';

var assert = require('assert');
var posthtml = require('posthtml');
var posthtmlPrefixClass = require('../index.js');

var input = {
    single: '<div id="selector-3" class="selector-1 selector-2"></div>',
    leading: '<div id=" selector-3" class=" selector-1 selector-2"></div>',
    trailing: '<div id="selector-3 " class="selector-1 selector-2 "></div>',
    double: '<div id="selector-3  " class="selector-1  selector-2"></div>',
    newline: (
        '<div id="selector-3"\
        class="selector-1\
        selector-2"></div>'
    ),
};

describe('posthtml-prefix-class', function () {

    describe('posthtmlPrefixClass()', function () {
        expect('<div id="selector-3" class="selector-1 selector-2"></div>');
    });

    describe('posthtmlPrefixClass({ prefix: String })', function () {
        expect(
            '<div id="prefix-selector-3" class="prefix-selector-1 prefix-selector-2"></div>',
            { prefix: 'prefix-', includeIds: true }
        );
    });

    describe('posthtmlPrefixClass({ prefix: String, ignore: String })', function () {
        expect(
            '<div id="prefix-selector-3" class="prefix-selector-1 selector-2"></div>',
            { prefix: 'prefix-', ignore: 'selector-2', includeIds: true }
        );
    });

    describe('posthtmlPrefixClass({ prefix: String, ignore: *String })', function () {
        expect(
            '<div id="selector-3" class="prefix-selector-1 selector-2"></div>',
            { prefix: 'prefix-', ignore: '*-2', includeIds: false }
        );
    });

    describe('posthtmlPrefixClass({ prefix: String, ignore: Array })', function () {
        expect(
            '<div id="selector-3" class="selector-1 selector-2"></div>',
            { prefix: 'prefix-', ignore: ['selector-1', 'selector-2', 'selector-3'], includeIds: true }
        );
    });

    describe('posthtmlPrefixClass({ prefix: String, ignore: *Array })', function () {
        expect(
            '<div id="selector-3" class="selector-1 selector-2"></div>',
            { prefix: 'prefix-', ignore: ['*-1', '*-2', '*-3'], includeIds: true }
        );
    });
});

function test(input, expected, options) {
    return posthtml()
        .use(posthtmlPrefixClass(options))
        .process(input)
        .then(function(output) {
            assert.equal(output.html, expected);
        });
}

function expect(expected, options) {
    it(input.single, function () {
        return test(
            input.single,
            expected,
            options
        );
    });

    it(input.leading, function () {
        return test(
            input.leading,
            expected,
            options
        );
    });

    it(input.trailing, function () {
        return test(
            input.trailing,
            expected,
            options
        );
    });

    it(input.double, function () {
        return test(
            input.double,
            expected,
            options
        );
    });

    it(input.newline, function () {
        return test(
            input.newline,
            expected,
            options
        );
    });
}
