(function () {
    'use strict';

    angular.module("extension.splunk", ['openshiftConsole'])
        .run(function (extensionRegistry) {
            extensionRegistry.add('log-links', _.spread(function (resource, options) {
                return {
                    type: 'dom',
                    node: '<splunk-link pod="' + resource.metadata.name +
                    '" namespace="' + resource.metadata.namespace + '" />'
                };
            }));
        })
        .directive('splunkLink', SplunkLink);


    function SplunkLink() {

        var directive = {
            restrict: 'E',
            template: '<span>' +
            '   <span class="splunk-logo">' +
            '       <a href="{{ searchString }}" target="_blank">' +
            '           <img src="https://www.splunk.com/content/dam/splunk2/images/logos/splunk-logo.svg" alt="Splunk"/>' +
            '       </a>' +
            '   </span>' +
            '   <span class="action-divider">|</span>' +
            '</span>',
            scope: {
                pod: '@',
                namespace: '@'
            },
            link: link
        };

        return directive;

        function link(scope, element, attributes) {
            //... it should exist a better approach to watch the container list....
            var _logViewerScope = scope.$parent.$parent.$parent;
            _logViewerScope.$watchGroup(['context.project.metadata.name', 'options.container', 'name'], function () {
                var container = _logViewerScope.options.container;
                scope.searchString = searchString(attributes, container);
            });
        }

        function searchString(attr, container) {
            var properties = window.OPENSHIFT_EXTENSION_PROPERTIES;
            return properties.splunkURL +
                properties.splunkQueryPrefix +
                ' namespace=' + attr.namespace +
                ' container_name=' + container +
                ' pod=' + attr.pod;
        }

    }

    hawtioPluginLoader.addModule("extension.splunk");

}());
