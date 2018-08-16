# Splunk OpenShift Web Console Extension


## OpenShift Deployment

```
oc project splunk-connect

oc new-app https://github.com/openlab-red/splunk-connect-for-kubernetes \
    --context-dir=/openshift/splunk-openshift-web-console-extension

oc create route edge --service=splunk-connect-for-kubernetes
```


## Local Test

```
    npm start
```
