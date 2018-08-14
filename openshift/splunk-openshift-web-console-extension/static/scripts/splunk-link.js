(function () {
    // Splunk Link

    'use strict';
    angular.module("splunk-extension", ['openshiftConsole'])
        .run(function (extensionRegistry) {
            extensionRegistry.add('log-links', _.spread(function (resource, options) {
                return {
                    type: 'dom',
                    node: '<span><a href="https://splunk">' + resource.metadata.name + '</a><span class="action-divider">|</span></span>'
                };
            }));
        });
    hawtioPluginLoader.addModule("splunk-extension");
}());
