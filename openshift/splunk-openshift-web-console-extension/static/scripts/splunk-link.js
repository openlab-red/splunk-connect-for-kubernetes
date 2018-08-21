(function () {
    'use strict';

    angular.module("extension.splunk", ['openshiftConsole'])
        .run(function (extensionRegistry) {
            extensionRegistry.add('log-links', _.spread(function (resource, options) {
                return {
                    type: 'dom',
                    node: '<splunk-link />'
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
            scope: {},
            link: link
        };

        return directive;

        function link(scope, element, attributes) {
            //... it should exist a better approach to watch the container list....
            var _logViewerScope = scope.$parent.$parent.$parent;
            _logViewerScope.$watchGroup(['context.project.metadata.name', 'options.container', 'name'], function () {
                var namespace = _logViewerScope.context.projectName,
                    container = _logViewerScope.options.container;
                scope.searchString = searchString(scope, namespace, container);
            });
        }

        function searchString(scope, namespace, container) {
            var properties = window.OPENSHIFT_EXTENSION_PROPERTIES;
            return properties.splunkURL +
                properties.splunkQueryPrefix +
                ' namespace=' + namespace +
                ' container_name=' + container;
        }

    }

    hawtioPluginLoader.addModule("extension.splunk");

}());
