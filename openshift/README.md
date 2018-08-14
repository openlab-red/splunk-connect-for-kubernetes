# Splunk Connect for OpenShift

  
This README explains how to integrate Splunk in OpenShift using the new [Splunk Connect for Kubernetes](https://github.com/splunk/splunk-connect-for-kubernetes).

  
## Requirements

Follow the [Splunk Connect Prerequistes](https://github.com/splunk/splunk-connect-for-kubernetes#prerequisites)

## Install HELM

```
cd /tmp
wget https://storage.[googleapis.com](http://googleapis.com)/kubernetes-helm/helm-v2.9.1-linux-amd64.tar.gz
tar xvfz helm-v2.9.1-linux-amd64.tar.gz
cp linux-amd64/helm /usr/local/bin/
chmod +x /usr/local/bin/helm
```
  
#### Configure Tiller

1.  Create Service Account for tiller
    ```
        oc project kube-system
        oc create sa tiller
    ```
    
2.  Assign Cluster admin role: tiller-clusterrolebinding.yml
    
    ```yml
    kind: ClusterRoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      name: tiller-clusterrolebinding
    subjects:
    - kind: ServiceAccount
      name: tiller
      namespace: kube-system
    roleRef:
      kind: ClusterRole
      name: cluster-admin
      apiGroup: ""
    ```
    
    ```
    oc create -f tiller-clusterrolebinding.yml
    ```

3. Note about Helm Security:
    * [HELM Security](https://engineering.bitnami.com/articles/helm-security.html)
    * [Securing HELM installation](https://docs.helm.sh/using_helm/#securing-your-helm-installation)

## Splunk Connect for Kubernetes

### Preparation

1.  Download the helm packages.  
    
    ```
    cd /tmp
    wget https://github.com/splunk/splunk-connect-for-kubernetes/releases/download/v1.0.1/splunk-kubernetes-logging-1.0.1.tgz
    wget https://github.com/splunk/splunk-connect-for-kubernetes/releases/download/v1.0.1/splunk-kubernetes-metrics-1.0.1.tgz
    wget https://github.com/splunk/splunk-connect-for-kubernetes/releases/download/v1.0.1/splunk-kubernetes-objects-1.0.1.tgz
    ```
    
2.  Configure the variables for HELM.  

    > Find here [samples](./samples) value for the splunk connect. 
        

3.  Project setup
    
    ```
    helm init \
    --override 'spec.template.spec.containers[0].command'='{/tiller,--storage=secret,--listen=localhost:44134}' \
    --service-account=tiller
    
    oc new-project splunk-connect
    oc adm policy add-scc-to-user privileged  -z default
    ```

### Installation
    
1.  splunk-kubernetes-logging
    
    ```
    helm install --name splunk-kubernetes-logging -f logging-value.yml splunk-kubernetes-logging-1.0.1.tgz
    oc patch ds splunk-kubernetes-logging -p '{"spec":{"template":{"spec":{"containers":[{"name":"splunk-fluentd-k8s-logs","securityContext":{"privileged": true}}]}}}}'
    ```
    * delete the pods to apply the latest patch
    
        ```
        oc delete pod --all
        ```
    
2.  splunk-kubernetes-metrics
    
    ```
    helm install --name splunk-kubernetes-metrics -f metrics-value.yml splunk-kubernetes-metrics-1.0.1.tgz
    oc patch deployment splunk-kubernetes-metrics -p '{"spec":{"template":{ "spec":{"containers":[{"name": "splunk-heapster","command": ["/heapster","--source=kubernetes:?useServiceAccount=true&kubeletHttps=true&kubeletPort=10250","--sink=statsd:udp://127.0.0.1:9001"]}]}}}}'
    oc adm policy add-cluster-role-to-user cluster-reader -z splunk-kubernetes-metrics
    ```
    
3.  splunk-kubernetes-objects
    
    ```
    helm install --name splunk-kubernetes-objects -f objects-value.yml splunk-kubernetes-objects-1.0.1.tgz
    ```
    

### Enjoy :)
