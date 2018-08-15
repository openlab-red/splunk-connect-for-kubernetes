(function () {
    'use strict';


    angular.module("extension.splunk", ['openshiftConsole'])
        .run(function (extensionRegistry) {
            extensionRegistry.add('log-links', _.spread(function (resource, options) {
                return splunkLink(resource, options);
            }));
        });

    function splunkLink(resource, options) {
        var splunk = {
            url: window.OPENSHIFT_EXTENSION_PROPERTIES.splunkURL,
            prefix: window.OPENSHIFT_EXTENSION_PROPERTIES.splunkQueryPrefix,
            postfix: window.OPENSHIFT_EXTENSION_PROPERTIES.splunkQueryPostfix
        };

        return {
            type: 'dom',
            template: '<span><a href="' + splunk.url + '">' + resource.metadata.name + '</a><span class="action-divider">|</span></span>'
        };
    }


    hawtioPluginLoader.addModule("extension.splunk");

}());
