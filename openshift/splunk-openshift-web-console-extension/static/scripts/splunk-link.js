(function () {
    'use strict';

    var splunk = {
        url: window.OPENSHIFT_EXTENSION_PROPERTIES.splunkURL,
        prefix: window.OPENSHIFT_EXTENSION_PROPERTIES.splunkQueryPrefix
    };
    var href = splunk.url + splunk.prefix;

    angular.module("extension.splunk", ['openshiftConsole'])
        .run(function (extensionRegistry) {
            extensionRegistry.add('log-links', _.spread(function (resource, options) {
                return splunkLink(resource, options);
            }));
        });

    function splunkLink(resource, options) {

        if (!options.container) { // 1 container
            options.container = resource.spec.containers[0].name;
        }

        href += '&namespace=' + resource.metadata.namespace;
        href += '&container_name=' + options.container;
        //href += '&pod=' + resource.metadata.name;


        return {
            type: 'dom',
            node: '<span class="splunk-logo"><a href="' + href + '"><img src="https://www.splunk.com/content/dam/splunk2/images/logos/splunk-logo.svg" alt="Splunk"/></a><span class="action-divider">|</span></span>'
        };
    }


    hawtioPluginLoader.addModule("extension.splunk");

}());
