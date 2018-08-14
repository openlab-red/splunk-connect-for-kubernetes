(function () {
    // Splunk Link

    'use strict';
    angular.module("splunk-extension", ['openshiftConsole', 'LOGGING_URL'])
        .run(function (extensionRegistry, LOGGING_URL) {
            extensionRegistry.add('log-links', _.spread(function (resource, options) {
                return {
                    type: 'dom',
                    node: '<span><a href="' + LOGGING_URL + '">' + resource.metadata.name + '</a><span class="action-divider">|</span></span>'
                };
            }));
        });
    hawtioPluginLoader.addModule("splunk-extension");
}());