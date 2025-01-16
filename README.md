# Porchlight
Node app for controlling my porchlight

# Instructions

- Create image with `sudo podman build . -t porchlight`
- Output image as tar with `sudo podman save --output porchlight.tar localhost/porchlight`
- Transfer to cluster
- Import with `sudo k3s ctr images import porchlight.tar`
- Install with helm `helm install --set host=somehost porchlight .`