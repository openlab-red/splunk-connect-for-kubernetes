# Splunk OpenShift Web Console Extension


## OpenShift Deployment

1. Deploy Splunk link.

    ```
    oc project splunk-connect

    oc new-app https://github.com/openlab-red/splunk-connect-for-kubernetes \
        --context-dir=/openshift/splunk-openshift-web-console-extension

    oc create route edge --service=splunk-connect-for-kubernetes
    ```

2. Update openshift web console configmap

    ```
        oc project openshift-web-console
        oc edit cm webconsole-config
    ```

    Add the following configuration:

    ```yml
    extensions:
      properties:
        splunkURL: "<splunk url>"
        splunkQueryPrefix: "/app/search/search?q=search%20index=<your-index>"
      scriptURLs:
        - https://<your splunk link url>/scripts/splunk-link.js
      stylesheetURLs:
        - https:/<your splunk link url>/styles/splunk-link.css
    ```

3. Outcome
    ![Splunk Image](./static/images/example2.png)

## Local Test

```
    npm start
```
