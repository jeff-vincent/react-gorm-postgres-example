# react-gorm-postgres-example


## Deploy in Kubernetes

```bash
minikube start 
minikube addons enable kong
minikube tunnel
```

In a second terminal:
```bash
cd react-gorm-postgres-example/k8s/ && \
helm template . -f values.yaml | kubectl apply -f -
```