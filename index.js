'use strict';

var minimatch = require('minimatch');
var objectAssign = require('object-assign');

module.exports = function (options) {
    options = objectAssign({}, {
        ignore: [],
        prefix: '',
        includeIds: false
    }, options);

    if (typeof options.ignore == 'string') {
        options.ignore = [options.ignore];
    }

    return function posthtmlPrefixClass(tree) {
        return tree.walk(function (node) {
            var attrs = node.attrs || false;

            var id = attrs.id && attrs.id.trim();
            if (id) {
                node.attrs.id = id;
                var shouldIdBeIgnored = !options.includeIds || options.ignore.some(function (pattern) {
                    return minimatch(id, pattern);
                });

                if (!shouldIdBeIgnored) {
                    node.attrs.id = options.prefix + id
                }
            }

            var classNames = attrs.class && attrs.class.trim().split(/\s+/g);
            if (!classNames) {
                return node;
            }

            node.attrs.class = classNames.map(function (className) {
                var shouldBeIgnored = options.ignore.some(function (pattern) {
                    return minimatch(className, pattern);
                });

                if (!shouldBeIgnored) {
                    className = options.prefix + className;
                }

                return className;
            }).join(' ');

            return node;
        });
    };
};
