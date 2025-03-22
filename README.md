# Porchlight
Node app for controlling my porchlight

# Instructions

## Gitops
- Create an ArgoCD entry with values from values.yaml
- Fill in the hub/image/tags fields with the OneDev repo location, "porchlight/porchlight", and "main" respectively
- Onedev will create the image automatically
- ArgoCD will sync and deploy

## Manual
- Copy and update a `values.yaml` with host, lat, and lon
- Create image with `sudo podman build . -t porchlight`
- Output image as tar with `sudo podman save --output porchlight.tar localhost/porchlight`
- Transfer to cluster
- Import with `sudo k3s ctr images import porchlight.tar`
- Install with helm from the helm dir: `helm install porchlight . -f values.yaml`